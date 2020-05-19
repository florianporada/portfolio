import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { colors } from '../../constants';

const modes = {
  rotate: 'rotate',
  follow: 'follow',
  spin: 'spin',
  mobile: 'mobile',
};

function ThreeObject(props) {
  const mesh = useRef();
  const mode = useRef(modes.spin);
  const orientationOffset = useRef({
    x: props.rotation[0],
    y: props.rotation[1],
    z: props.rotation[2],
  });
  const obj = useLoader(OBJLoader, props.url, (loader) => {
    if (props.loadingManager) {
      loader.manager = props.loadingManager.current;
    }
  });

  const resetRotation = () => {
    mesh.current.rotation.x = orientationOffset.current.x;
    mesh.current.rotation.y = orientationOffset.current.y;
    mesh.current.rotation.z = orientationOffset.current.z;
  };

  useEffect(() => {
    if (isMobile) {
      mode.current = modes.mobile;
    }
  }, [mode]);

  useEffect(() => {
    const handleDeviceMotion = ({ absolute, alpha, beta, gamma, ...event }) => {
      if (mode.current === modes.mobile) {
        mesh.current.rotation.y =
          props.rotation[1] +
          THREE.Math.degToRad(mesh.current.rotation.y + Math.abs(alpha) * 0.25);
        mesh.current.rotation.x = THREE.Math.degToRad(
          (mesh.current.rotation.x + Math.abs(beta) - 95) * 0.25
        );
      }
    };

    obj.children[0].geometry.center();

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      // iOS 13+
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted' && typeof window !== `undefined`) {
            window.addEventListener(
              'deviceorientation',
              handleDeviceMotion,
              true
            );
          }
        })
        .catch(console.error);
    } else {
      if (typeof window !== `undefined`) {
        window.addEventListener('deviceorientation', handleDeviceMotion, true);
      }
    }

    return () => {
      if (typeof window !== `undefined`) {
        window.removeEventListener(
          'deviceorientation',
          handleDeviceMotion,
          true
        );
      }
    };
  }, [props.rotation, mesh, obj]);

  useFrame((state) => {
    if (mode.current === 'spin') {
      const spin = {
        x: props.delta.x / window.innerWidth / 10,
        y: props.delta.y / window.innerHeight / 10,
      };

      mesh.current.rotation.x += -(spin.y + 0.001);
      mesh.current.rotation.y += spin.x + 0.01;
    } else if (mode.current === 'follow') {
      const fov =
        Math.abs(Math.abs(state.mouse.y) + Math.abs(state.mouse.x) - 2) * 10 +
        7;
      state.camera.setFocalLength(fov);

      mesh.current.rotation.x = -(state.mouse.y * 0.75);
      mesh.current.rotation.y = state.mouse.x * 0.75;
    } else if (mode.current === 'rotate') {
      mesh.current.rotation.x += 0.001;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh
        {...props}
        ref={mesh}
        material={
          new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            // transparent: false,
            color: new THREE.Color(colors.TEXT),
            wireframe: true,
            flatShading: false,
            wireframeLinewidth: 1,
          })
        }
      >
        <primitive object={obj.children[0].geometry} attach="geometry" />
      </mesh>
    </group>
  );
}

export default ThreeObject;

ThreeObject.propTypes = {
  url: PropTypes.string,
  delta: PropTypes.object,
  rotation: PropTypes.any,
  loadingManager: PropTypes.object,
};

ThreeObject.defaultProps = {
  url: '/3d/Scan.obj',
};

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { colors } from '../../constants';

function ThreeObject(props) {
  const mesh = useRef();
  const obj = useLoader(OBJLoader, props.url);
  const modes = {
    rotate: 'rotate',
    follow: 'follow',
    spin: 'spin',
    mobile: 'mobile',
  };
  const mode = useRef(modes.spin);

  obj.children[0].geometry.center();

  useEffect(() => {
    if (isMobile) {
      mode.current = modes.mobile;
    }
  }, [mode, modes]);

  useEffect(() => {
    const handleDeviceMotion = ({ absolute, alpha, beta, gamma, ...event }) => {
      if (mode.current === modes.mobile) {
        mesh.current.rotation.y =
          props.rotation[1] + THREE.Math.degToRad(alpha);
        mesh.current.rotation.x = THREE.Math.degToRad(
          mesh.current.rotation.x + beta - 90
        );
      }
    };

    if (typeof window !== `undefined`) {
      window.addEventListener('deviceorientation', handleDeviceMotion, true);
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
  }, [props.rotation, mode, modes.mobile]);

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
    <mesh
      {...props}
      ref={mesh}
      material={
        new THREE.MeshPhongMaterial({
          side: THREE.DoubleSide,
          transparent: false,
          color: new THREE.Color(colors.TEXT),
          wireframe: true,
          flatShading: false,
          wireframeLinewidth: 1,
        })
      }
    >
      <primitive object={obj.children[0].geometry} attach="geometry" />
    </mesh>
  );
}

export default ThreeObject;

ThreeObject.propTypes = {
  url: PropTypes.string,
  delta: PropTypes.object,
  rotation: PropTypes.any,
};

ThreeObject.defaultProps = {
  url: '/3d/Scan.obj',
};

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { colors } from '../../constants';

function ThreeObject(props) {
  const mesh = useRef();
  const obj = useLoader(OBJLoader, props.url);
  const modes = ['rotate', 'follow', 'spin'];
  const mode = modes[2];

  obj.children[0].geometry.center();

  useFrame((state) => {
    if (mode === 'spin') {
      const spin = {
        x: props.delta.x / window.innerWidth / 10,
        y: props.delta.y / window.innerHeight / 10,
      };

      mesh.current.rotation.x += -(spin.y + 0.001);
      mesh.current.rotation.y += spin.x + 0.001;
    } else if (mode === 'follow') {
      const fov =
        Math.abs(Math.abs(state.mouse.y) + Math.abs(state.mouse.x) - 2) * 10 +
        7;
      state.camera.setFocalLength(fov);

      mesh.current.rotation.x = -(state.mouse.y * 0.75);
      mesh.current.rotation.y = state.mouse.x * 0.75;
    } else if (mode === 'rotate') {
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
          wireframeLinewidth: 10,
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
};

ThreeObject.defaultProps = {
  url: '/3d/Scan.obj',
};

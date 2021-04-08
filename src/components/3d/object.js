import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useFrame, useLoader } from '@react-three/fiber';

import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// import teapot from '../../assets/3d/teapot.obj';

// console.log(teapot);

function ThreeObject(props) {
  const mesh = useRef();
  const obj = useLoader(OBJLoader, props.url);
  obj.children[0].geometry.center();

  useFrame(() => {
    mesh.current.rotation.y += 0.01;

    return;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      material={
        new THREE.MeshBasicMaterial({
          color: new THREE.Color('white'),
          transparent: false,
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
};

ThreeObject.defaultProps = {
  url: '/3d/teapot.obj',
};

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function ThreeObject(props) {
  const mesh = useRef();
  const obj = useLoader(OBJLoader, props.url);
  // const { camera, mouse, scene } = useThree();

  obj.children[0].geometry.center();

  useFrame((state) => {
    const fov = Math.abs((state.mouse.y + state.mouse.x) * 10) + 15;
    state.camera.setFocalLength(fov);

    mesh.current.rotation.x += -(state.mouse.y * 0.01);
    mesh.current.rotation.y += state.mouse.x * 0.01;

    state.gl.render(state.scene, state.camera);
  }, 1);

  return (
    <mesh {...props} ref={mesh} material={new THREE.MeshNormalMaterial()}>
      <primitive object={obj.children[0].geometry} attach="geometry" />
    </mesh>
  );
}

export default ThreeObject;

ThreeObject.propTypes = {
  url: PropTypes.string,
};

ThreeObject.defaultProps = {
  url: '/3d/Scan.obj',
};

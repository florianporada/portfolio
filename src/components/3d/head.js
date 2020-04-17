import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function ThreeObject(props) {
  const mesh = useRef();
  const [xy, setXy] = useState([0, 0]);
  const obj = useLoader(OBJLoader, props.url);
  obj.children[0].geometry.center();

  useFrame(() => {
    const factorX = xy[0] / 10000;
    const factorY = xy[1] / 10000;

    mesh.current.rotation.y += 0.01 + factorY;
    mesh.current.rotation.x += 0.01 + factorX;

    return;
  });

  return (
    <mesh
      {...props}
      onPointerMove={(e) => {
        setXy((prev) => {
          return [e.clientX, e.clientY];
        });
      }}
      ref={mesh}
      material={new THREE.MeshNormalMaterial()}
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
  url: '/Scan.obj',
};

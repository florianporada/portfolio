import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import vertexShader from '../../assets/shader/vertexShader.glsl';
import fragmentShader from '../../assets/shader/fragmentShader.glsl';

function ImageWrapper(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const material = useRef();
  // const [active, setActive] = useState(false);
  const image = props.image.childImageSharp;
  const imageHeight = image.fixed.height;
  const imageWidth = image.fixed.width;
  const windowWidth = window ? window.innerWidth : imageWidth;
  const windowHeight = window ? window.innerHeight : imageHeight;
  const imageSize = new THREE.Vector2(imageWidth, imageHeight);
  const offset = new THREE.Vector2(0, 0);
  let active = false;

  const uniforms = {
    u_image: {
      type: 't',
      value: new THREE.TextureLoader().load(image.fixed.src),
    },
    u_imagehover: {
      type: 't',
      value: new THREE.TextureLoader().load(image.fixed.src),
    },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_time: { value: 0 },
    u_res: {
      value: new THREE.Vector2(windowWidth, windowHeight),
    },
  };

  const defines = {
    PR: window ? window.devicePixelRatio.toFixed(1) : 1,
  };
  const perspective = 800;
  const fov = (180 * (2 * Math.atan(windowHeight / 2 / perspective))) / Math.PI;

  function Image() {
    useFrame((state) => {
      material.current.uniforms.u_time.value += 0.01;

      mesh.current.rotation.x = -(state.mouse.y * 0.025);
      mesh.current.rotation.y = state.mouse.x * 0.025;
    });

    useEffect(() => {
      if (!window) return;

      const handler = (event) => {
        const mouseCoords = {
          x: (event.clientX / windowWidth) * 2 - 1,
          y: -(event.clientY / windowHeight) * 2 + 1,
        };

        if (active) {
          material.current.uniforms.u_mouse.value = new THREE.Vector2(
            mouseCoords.x,
            mouseCoords.y
          );
        }
      };

      window.addEventListener('mousemove', handler);

      // clean up
      return () => window.removeEventListener('mousemove', handler);
    }, []);

    return (
      <mesh
        {...props}
        ref={mesh}
        position={[offset.x, offset.y, 0]}
        scale={[imageSize.x, imageSize.y, 1]}
      >
        <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
        <shaderMaterial
          ref={material}
          attach="material"
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          defines={defines}
        />
      </mesh>
    );
  }

  return (
    <Canvas
      onMouseEnter={() => {
        active = true;
      }}
      onMouseLeave={() => {
        active = false;
      }}
      camera={{
        position: [0, 0, perspective],
        fov: fov,
        aspect: windowWidth / windowHeight,
        near: 1,
        far: 1000,
      }}
      style={{ height: imageHeight, width: imageWidth }}
    >
      <ambientLight intensity={1} />
      <Image />
    </Canvas>
  );
}

ImageWrapper.propTypes = {
  image: PropTypes.object,
};

ImageWrapper.defaultProps = {};

export default ImageWrapper;

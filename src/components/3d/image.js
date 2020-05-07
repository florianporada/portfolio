import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { Canvas, useFrame, stateContext } from 'react-three-fiber';
import vertexShader from '../../assets/shader/vertexShader.glsl';
import fragmentShader from '../../assets/shader/fragmentShader.glsl';

function ImageWrapper(props) {
  const mesh = useRef();
  const material = useRef();
  const image = props.image.childImageSharp;
  const imageHeight = image.fixed.height;
  const imageWidth = image.fixed.width;
  const windowWidth =
    typeof window !== `undefined` ? window.innerWidth : imageWidth;
  const windowHeight =
    typeof window !== `undefined` ? window.innerHeight : imageHeight;
  const imageSize = new THREE.Vector2(imageWidth, imageHeight);
  const offset = new THREE.Vector2(0, 0);
  let active = false;

  const uniforms = {
    u_image: {
      type: 't',
      value:
        typeof document !== `undefined`
          ? new THREE.TextureLoader().load(image.fixed.src)
          : null,
    },
    u_imagehover: {
      type: 't',
      value:
        typeof document !== `undefined`
          ? new THREE.TextureLoader().load(image.fixed.src)
          : null,
    },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_time: { value: 0 },
    u_res: {
      value: new THREE.Vector2(imageWidth, imageHeight),
    },
  };

  const defines = {
    PR: typeof window !== `undefined` ? window.devicePixelRatio.toFixed(1) : 1,
  };
  const perspective = 800;
  const fov = (180 * (2 * Math.atan(imageHeight / 2 / perspective))) / Math.PI;

  function Image() {
    useFrame((state) => {
      material.current.uniforms.u_time.value += 0.01;
      // material.current.uniforms.u_mouse.value = new THREE.Vector2(
      //   normalizedMouse.x,
      //   normalizedMouse.y
      // );

      // console.log(state.mouse.width);

      mesh.current.rotation.x = -(state.mouse.y * 0.025);
      mesh.current.rotation.y = state.mouse.x * 0.025;
    });

    useEffect(() => {
      const handler = (event) => {
        const mouseCoords = {
          x: event.clientX / imageWidth,
          y: 1 - event.clientY / imageWidth,
        };

        if (active) {
          material.current.uniforms.u_mouse.value = new THREE.Vector2(
            mouseCoords.x,
            mouseCoords.y
          );
        }
      };

      if (typeof window !== `undefined`) {
        window.addEventListener('mousemove', handler);
      }

      // clean up
      return () => {
        if (typeof window !== `undefined`) {
          window.removeEventListener('mousemove', handler);
        }
      };
    }, []);

    return (
      <mesh
        {...props}
        ref={mesh}
        position={[offset.x, offset.y, 0]}
        scale={[imageSize.x, imageSize.y, 1]}
        onPointerMove={(event) => {
          console.log(event);
          if (event.pointerType === 'touch') {
            const mouseCoords = {
              x: event.clientX / imageWidth,
              y: 1 - event.clientY / imageWidth,
            };

            if (active) {
              material.current.uniforms.u_mouse.value = new THREE.Vector2(
                -mouseCoords.x,
                -mouseCoords.y
              );
            }
          }
        }}
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
        aspect: imageWidth / imageHeight,
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

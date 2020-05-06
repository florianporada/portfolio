import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { Canvas, useFrame, useCamera, useThree } from 'react-three-fiber';
import vertexShader from '../../assets/shader/vertexShader.glsl';
import fragmentShader from '../../assets/shader/fragmentShader.glsl';

function ImageWrapper(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const material = useRef();
  const image1 = props.image[0].frontmatter.featuredimage.childImageSharp;
  const image2 = props.image[1].frontmatter.featuredimage.childImageSharp;

  const uniforms = {
    u_image: {
      type: 't',
      value: new THREE.TextureLoader().load(image1.fixed.src),
    },
    u_imagehover: {
      type: 't',
      value: new THREE.TextureLoader().load(image2.fixed.src),
    },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_time: { value: 0 },
    u_res: {
      value: new THREE.Vector2(image2.fixed.height, image2.fixed.width),
    },
  };

  const defines = {
    PR: window.devicePixelRatio.toFixed(1),
  };
  const perspective = 800;
  const fov =
    (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead

  function Image() {
    useFrame((state) => {
      material.current.uniforms.u_time.value += 0.01;
      material.current.uniforms.u_mouse.value = new THREE.Vector2(
        state.mouse.x,
        state.mouse.y
      );

      mesh.current.rotation.x = -(state.mouse.y * 0.05);
      mesh.current.rotation.y = state.mouse.x * 0.05;
    });

    return (
      <mesh
        {...props}
        ref={mesh}
        position={[0, 0, 0]}
        scale={[image1.fixed.height, image1.fixed.width, 1]}
        // onClick={(e) => setActive(!active)}
        // onPointerOver={(e) => setHover(true)}
        // onPointerOut={(e) => setHover(false)}
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
      camera={{
        position: [0, 0, perspective],
        fov: fov,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 1000,
      }}
      style={{ height: image1.fixed.height }}
    >
      <ambientLight intensity={2} />
      <Image />
    </Canvas>
  );
}

ImageWrapper.propTypes = {
  image: PropTypes.object,
};

ImageWrapper.defaultProps = {};

export default ImageWrapper;

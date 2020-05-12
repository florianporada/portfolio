import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLoader, useUpdate, useFrame } from 'react-three-fiber';
import { colors } from '../../constants';
import vertexShader from '../../assets/shader/vertexShader.glsl';
import fragmentShader from '../../assets/shader/fragmentShader.glsl';

const Text = function ({
  children,
  vAlign = 'center',
  hAlign = 'center',
  size = 1,
  ...props
}) {
  const font = useLoader(THREE.FontLoader, '/fonts/Polarity_Bold.json');
  const material = useRef();
  const config = useMemo(
    () => ({
      font,
      size: 20,
      height: 30,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font]
  );
  const mesh = useUpdate(
    (self) => {
      const size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x =
        hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x;
      self.position.y =
        vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y;
    },
    [children]
  );

  const windowWidth = 1200;
  const windowHeight = 800;
  const imageWidth = 1200;
  const imageHeight = 800;
  const offset = new THREE.Vector2(0, 0);
  let active = false;

  const uniforms = {
    u_image: {
      type: 't',
      value:
        typeof document !== `undefined`
          ? new THREE.TextureLoader().load('../../assets/img/test.jpg')
          : null,
    },
    u_imagehover: {
      type: 't',
      value:
        typeof document !== `undefined`
          ? new THREE.TextureLoader().load('../../assets/img/test.jpg')
          : null,
    },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_time: { value: 0 },
    u_res: {
      value: new THREE.Vector2(1200, 800),
    },
  };

  const defines = {
    PR: typeof window !== `undefined` ? window.devicePixelRatio.toFixed(1) : 1,
  };
  const perspective = 800;
  const fov = (180 * (2 * Math.atan(imageHeight / 2 / perspective))) / Math.PI;

  useFrame((state) => {
    material.current.uniforms.u_time.value += 0.01;
    material.current.uniforms.u_mouse.value = new THREE.Vector2(
      state.mouse.x,
      state.mouse.y
    );

    // console.log(state.mouse.width);

    // mesh.current.rotation.x = -(state.mouse.y * 0.025);
    // mesh.current.rotation.y = state.mouse.x * 0.025;
  });

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.01]}>
      <mesh
        ref={mesh}
        // material={
        //   new THREE.MeshPhongMaterial({
        //     side: THREE.FrontSide,
        //     transparent: false,
        //     color: new THREE.Color(colors.TEXT),
        //   })
        // }
      >
        <textGeometry attach="geometry" args={[children, config]} />
        <meshNormalMaterial
          ref={material}
          attach="material"
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          defines={defines}
        />
      </mesh>
    </group>
  );
};

Text.propTypes = {
  children: PropTypes.any,
  vAlign: PropTypes.string,
  hAlign: PropTypes.string,
  size: PropTypes.number,
};

Text.defaultProps = {};

export default Text;

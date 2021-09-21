import PropTypes from 'prop-types';
import React, { Suspense, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { colors } from '../constants';
// import DDDBox from './3d/Box';
// import DDDObject from './3d/Object';
// import DDDBird from './3d/Bird';
import DDDHead from './3d/Head';
import DDDLightSource from './3d/Lightsource';
import DDDLoading from './3d/Loading';

const Wrapper = styled.div`
  background-color: ${colors.BACKGROUND};
`;

const Content = styled.div`
  position: absolute;
  z-index: 1;
  padding-top: 360px;
  left: 15%;
  color: ${colors.TEXT};

  p {
    font-size: 2rem;
  }
`;

function Plane(props) {
  // This reference will give us direct access to the mesh
  const ref = useRef();

  return (
    <mesh ref={ref} {...props}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" color="#ff1717" />
    </mesh>
  );
}

const Hero = ({ title, text, hideContent }) => {
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [lastTouch, setLastTouch] = useState(undefined);
  const loadingManager = useRef();

  const handleStartInput = (e) => {
    e.persist();

    let pageX = 0;
    let pageY = 0;

    if (e.type === 'pointerdown') {
      pageX = e.pageX;
      pageY = e.pageY;
    } else if (e.type === 'touchstart' && e.touches.length > 0) {
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
    }

    setStart(() => ({
      x: pageX,
      y: pageY,
    }));
  };

  const handleEndInput = (e) => {
    e.persist();

    let pageX = 0;
    let pageY = 0;

    if (e.type === 'pointerup') {
      pageX = e.pageX;
      pageY = e.pageY;
    } else if (e.type === 'touchend' && lastTouch) {
      pageX = lastTouch.pageX;
      pageY = lastTouch.pageY;
    }

    setDelta(() => ({
      x: start.x > pageX ? -(start.x - pageX) : pageX - start.x,
      y: start.y > pageY ? start.y - pageY : -(pageY - start.y),
    }));
  };

  const handleMove = (e) => {
    setLastTouch({
      pageX: e.touches.length > 0 ? e.touches[0].pageX : start.x - 10,
      pageY: e.touches.length > 0 ? e.touches[0].pageY : start.y - 10,
    });
  };

  useEffect(() => {
    loadingManager.current = new THREE.LoadingManager();
  }, []);

  return (
    <Wrapper>
      {(title || text) && !hideContent && (
        <Content>{text && <p>{text}</p>}</Content>
      )}
      <Canvas
        onPointerUp={handleEndInput}
        onPointerDown={handleStartInput}
        onTouchEnd={handleEndInput}
        onTouchStart={handleStartInput}
        onTouchMove={handleMove}
        style={{ background: colors.BACKGROUND, height: '95vh' }}
      >
        <ambientLight />
        <DDDLightSource name="pointlight" />
        {/* <Plane receiveShadow position={[0, 0, -100]} /> */}
        <Suspense fallback={<DDDLoading />}>
          <DDDHead
            castShadow
            loadingManager={loadingManager}
            delta={delta}
            position={[0, 0, -70]}
            rotation={[
              THREE.Math.degToRad(0),
              THREE.Math.degToRad(-180),
              THREE.Math.degToRad(-180),
            ]}
          />
          {/* <DDDBox /> */}
          {/* <DDDBird
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            speed={2}
            factor={1}
            url={`/3d/Flamingo.glb`}
          /> */}
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  hideContent: PropTypes.bool,
};

Hero.defaultProps = {};

export default Hero;

import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Suspense, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame, useCamera, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { colors } from '../constants';

import DDDBox from '../components/3d/box';
import DDDObject from '../components/3d/object';
import DDDBird from '../components/3d/bird';
import DDDHead from '../components/3d/head';
import DDDLightSource from '../components/3d/lightsource';

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

const Hero = ({ title, text, hideContent }) => {
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });

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
    let pageX = 0;
    let pageY = 0;

    if (e.type === 'pointerup') {
      pageX = e.pageX;
      pageY = e.pageY;
    } else if (e.type === 'touchend' && e.touches.length > 0) {
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
    }

    setDelta(() => ({
      x: start.x > pageX ? -(start.x - pageX) : pageX - start.x,
      y: start.y > pageY ? start.y - pageY : -(pageY - start.y),
    }));
  };

  return (
    <Wrapper>
      {(title || text) && !hideContent && (
        <Content>
          {title && <h1>{title}</h1>}
          {text && <p>{text}</p>}
        </Content>
      )}
      <Canvas
        onTouchEnd={handleEndInput}
        onTouchStart={handleStartInput}
        onPointerUp={handleEndInput}
        onPointerDown={handleStartInput}
        style={{ background: colors.BACKGROUND, height: '75vh' }}
      >
        <ambientLight />
        <DDDLightSource />
        <Suspense fallback={<DDDBox />}>
          {/* <DDDBox /> */}
          {/* <DDDBird
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            speed={2}
            factor={1}
            url={`/3d/Flamingo.glb`}
          /> */}
          <DDDHead delta={delta} url="/3d/me.obj" position={[0, -20, -60]} />
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

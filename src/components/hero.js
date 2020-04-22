import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame, useCamera, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { colors } from '../constants';

import DDDBox from '../components/3d/box';
import DDDObject from '../components/3d/object';
import DDDBird from '../components/3d/bird';
import DDDHead from '../components/3d/head';

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
  return (
    <Wrapper>
      {(title || text) && !hideContent && (
        <Content>
          {title && <h1>{title}</h1>}
          {text && <p>{text}</p>}
        </Content>
      )}
      <Canvas style={{ background: colors.BACKGROUND, height: '60vh' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<DDDBox />}>
          {/* <DDDBird
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            speed={2}
            factor={1}
            url={`/3d/Flamingo.glb`}
          /> */}
          <DDDHead
            url="/3d/Scan.obj"
            position={[0, 0, -50]}
            onClick={(e) => console.log('click')}
          />
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

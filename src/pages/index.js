import React, { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useCamera, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import DDDBox from '../components/3d/box';
import DDDObject from '../components/3d/object';
import DDDBird from '../components/3d/bird';
import DDDHead from '../components/3d/head';
import { colors } from '../constants';

const Title = styled.h1`
  font-size: 140px;
  margin-left: 5px;
  transition: margin 250ms ease-out;

  &:hover {
    margin-left: 10px;
  }
`;

const IndexPage = (props) => {
  return (
    <Layout>
      <SEO title="Home" />
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
            url="/Scan.obj"
            position={[0, 0, -50]}
            onClick={(e) => console.log('click')}
          />
        </Suspense>
      </Canvas>
      <section>
        <Title>Work</Title>
      </section>
      <section>
        <Title>Bio</Title>
      </section>
      <section>
        <Title>Skill</Title>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    pages: allFile(filter: { relativePath: { regex: "/pages/" } }) {
      nodes {
        id
        name
      }
    }
  }
`;

import React, { Suspense, useRef, useState } from 'react';
import { Link } from 'gatsby';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import DDDBox from '../components/3d/box';
import DDDObject from '../components/3d/object';
import DDDBird from '../components/3d/bird';
import DDDHead from '../components/3d/head';
import { colors } from '../constants';

const IndexPage = (props) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Canvas height={400} style={{ background: colors.BACKGROUND }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        <Suspense fallback={<DDDBox />}>
          {/* <DDDBird
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            speed={2}
            factor={1}
            url={`/Flamingo.glb`}
          /> */}
          <DDDHead
            url="/Scan.obj"
            position={[0, 0, -50]}
            onClick={(e) => console.log('click')}
          />
        </Suspense>
      </Canvas>
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

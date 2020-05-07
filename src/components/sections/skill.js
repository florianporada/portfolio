import { colors } from '../../constants';
import Img from 'gatsby-image';
import React, { useRef, useEffect, Suspense } from 'react';
import PropTypes, { arrayOf, string } from 'prop-types';
import styled from 'styled-components';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';

import DDDText from '../3d/text';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 15px;
`;

const Intro = styled.h3`
  font-size: 1.75em;
  margin-top: -100px;
`;

const Content = styled.div`
  max-width: 500px;
  font-size: 1.35em;
  margin-top: 30px;
`;

function List({ items }) {
  const ref = useRef();

  useFrame((state) => {
    // const fov =
    //   Math.abs(Math.abs(state.mouse.y) + Math.abs(state.mouse.x) - 2) * 10 + 7;
    // state.camera.setFocalLength(fov);
    ref.current.rotation.x = state.mouse.y * 0.005;
    ref.current.rotation.y = -state.mouse.x * 0.005;
  });

  useEffect(() => {
    const centered = new THREE.Box3()
      .setFromObject(ref.current)
      .getCenter(ref.current.position)
      .multiplyScalar(-1);

    ref.current.position.x = centered.x;
    ref.current.position.y = centered.y;
    // ref.current.position.z = centered.z;
  }, [ref]);

  return (
    <group ref={ref} position={[0, 0, -15]}>
      {items.map((item, i) => (
        <DDDText
          key={item}
          size={1.4}
          hAlign="center"
          position={[0, i * 3, -10]}
        >
          {item}
        </DDDText>
      ))}
    </group>
  );
}

const Skill = ({ data }) => {
  return (
    <Wrapper>
      <Canvas camera={{ position: [0, 0, 35] }} style={{ height: 500 }}>
        <ambientLight intensity={1} />
        <pointLight position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <List items={data.frontmatter.hardskills} />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

List.propTypes = {
  items: arrayOf(string),
};

Skill.propTypes = {
  data: PropTypes.object,
};

Skill.defaultProps = {};

export default Skill;

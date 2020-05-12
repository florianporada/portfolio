import { colors } from '../../constants';
import Img from 'gatsby-image';
import React, { useRef, useEffect, Suspense, useState, useMemo } from 'react';
import PropTypes, { arrayOf, string } from 'prop-types';
import styled from 'styled-components';
import * as THREE from 'three';
import { Canvas, useFrame, useUpdate } from 'react-three-fiber';
import scrollTo from 'gatsby-plugin-smoothscroll';

import DDDText from '../3d/text';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 15px;
`;

const Text = styled.h3`
  font-size: 1.75em;
  padding: 5px;
  margin: 5px;
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
`;

const Content = styled.div`
  max-width: 992px;
  font-size: 1.75em;
  line-height: 1.25em;
  margin-top: 30px;

  strong {
    padding: 2px;
    background-color: ${colors.TEXT};
    color: ${colors.BACKGROUND};
  }
`;

const Tldr = styled.a`
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  font-size: 2.75em;
  padding: 15px;
  margin: 10px;

  &:visited {
    color: ${colors.BACKGROUND};
  }
`;

const TldrContent = styled.ul`
  margin-left: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 992px;
`;

const TldrItem = styled.li`
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  font-size: 2.75em;
  padding: 15px;
  margin: 10px;
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
    console.log('trggered');
  }, []);

  return (
    <group ref={ref}>
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
  const [tldrVisible, setTldrVisible] = useState(false);
  const hardskills = useMemo(() => {
    const children = data.htmlAst.children.reduce((result, current) => {
      if (current.children) {
        return [...result, ...current.children];
      } else {
        return result;
      }
    }, []);

    return children.filter((el) => {
      return el.tagName === 'strong';
    });
  }, [data.htmlAst.children]);

  return (
    <Wrapper>
      {/* <Canvas camera={{ position: [0, 0, 35] }} style={{ height: 500 }}>
        <ambientLight intensity={1} />
        <pointLight position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <List items={data.frontmatter.hardskills} />
        </Suspense>
      </Canvas> */}
      {/* {data.frontmatter.hardskills.map((item, i) => (
        <Text key={item}> {item}</Text>
      ))} */}
      {!tldrVisible && (
        <Content dangerouslySetInnerHTML={{ __html: data.html }} />
      )}
      {tldrVisible && (
        <TldrContent>
          {hardskills.map((item) => {
            const name = item.children[0].value || 'things';

            return <TldrItem key={name}>{name}</TldrItem>;
          })}
        </TldrContent>
      )}
      <Tldr
        href="#skill"
        onClick={(e) => {
          e.preventDefault();

          setTldrVisible((prev) => !prev);
          // scrollTo(`#skill`);
        }}
      >
        {tldrVisible ? 'read more' : 'tl;dr'}
      </Tldr>
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

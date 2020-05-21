import { colors } from '../../constants';
import React, { useRef, useEffect, Suspense, useState, useMemo } from 'react';
import PropTypes, { arrayOf, string } from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import * as THREE from 'three';
import { Canvas, useFrame, useUpdate } from 'react-three-fiber';
import { useSpring, animated, useSprings, useTransition } from 'react-spring';

import DDDText from '../3d/text';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 15px 15px 15px;
  line-height: 1.1;
`;

const Text = styled.h3`
  font-size: 1.75em;
  padding: 5px;
  margin: 5px;
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const Content = styled(animated.div)`
  max-width: 992px;
  font-size: 1.75em;
  line-height: 1.25em;
  margin-top: 30px;

  em {
    font-weight: bold;
  }

  strong {
    padding: 2px;
    background-color: ${colors.TEXT};
    color: ${colors.BACKGROUND};
    transition: background-color 0.25s ease, color 0.25s ease;

    &:hover {
      background-color: ${colors.PRIMARY};
      color: ${colors.TEXT};
    }
  }
`;

const List = styled.ul`
  top: 0;
  position: absolute;
  margin-left: 0;
  margin-top: 30px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 992px;
`;

const Item = styled(animated.li)`
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  font-size: 2.75em;
  padding: 15px;
  margin: 10px;
  transition: background-color 0.25s ease, color 0.25s ease;

  &:hover {
    background-color: ${colors.PRIMARY};
    color: ${colors.TEXT};
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.25s ease;
`;

const Button = styled.a`
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  font-size: 2.75em;
  padding: 30px;
  font-family: 'Suprapower';
  margin: 10px;
  transition: background-color 0.25s ease, color 0.25s ease;

  &::after {
    display: none;
  }

  &:visited {
    color: ${colors.BACKGROUND};
  }

  &:hover {
    background-color: ${colors.PRIMARY};
    color: ${colors.TEXT};
  }
`;

// function List({ items }) {
//   const ref = useRef();

//   useFrame((state) => {
//     // const fov =
//     //   Math.abs(Math.abs(state.mouse.y) + Math.abs(state.mouse.x) - 2) * 10 + 7;
//     // state.camera.setFocalLength(fov);
//     ref.current.rotation.x = state.mouse.y * 0.005;
//     ref.current.rotation.y = -state.mouse.x * 0.005;
//   });

//   useEffect(() => {
//     const centered = new THREE.Box3()
//       .setFromObject(ref.current)
//       .getCenter(ref.current.position)
//       .multiplyScalar(-1);

//     ref.current.position.x = centered.x;
//     ref.current.position.y = centered.y;
//     // ref.current.position.z = centered.z;
//     console.log('trggered');
//   }, []);

//   return (
//     <group ref={ref}>
//       {items.map((item, i) => (
//         <DDDText
//           key={item}
//           size={1.4}
//           hAlign="center"
//           position={[0, i * 3, -10]}
//         >
//           {item}
//         </DDDText>
//       ))}
//     </group>
//   );
// }

const getHardskills = (data) => {
  const children = data.htmlAst.children.reduce((result, current) => {
    if (current.children) {
      return [...result, ...current.children];
    } else {
      return result;
    }
  }, []);

  const result = children
    .filter((el) => {
      return el.tagName === 'strong';
    })
    .map((el) => {
      return el.children[0].value;
    });

  return [...result, ...data.frontmatter.hardskills].reduce(
    (result, current) => {
      return result.includes(current) ? result : [...result, current];
    },
    []
  );
};

const Skill = ({ data }) => {
  const buttonRef = useRef();
  const listRef = useRef();
  const contentRef = useRef();
  const [listVisible, setListVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const hardskills = useMemo(() => getHardskills(data), [data]);
  const [contentProps, setContentProps] = useSpring(() => ({
    config: { duration: 250 },
    from: { opacity: 1 },
  }));
  const [itemProps, setItemProps] = useSprings(hardskills.length, () => {
    const duration = Math.floor(Math.random() * 1500) + 250;

    return {
      config: { duration: duration },
      delay: 2500,
      from: { opacity: 0, marginRight: 0 },
    };
  });

  // const transitions = useTransition(
  //   hardskills,
  //   (item) => {
  //     return item.children[0].value;
  //   },
  //   {
  //     from: { opacity: 0 },
  //     enter: { opacity: 1 },
  //     leave: { opacity: 0 },
  //     config: { duration: 500 },
  //     // trail: 25,
  //   }
  // );

  useEffect(() => {
    const { height: listHeight } = listRef.current.getBoundingClientRect();
    const {
      height: contentHeight,
    } = contentRef.current.getBoundingClientRect();

    setContentHeight(
      listHeight > contentHeight ? listHeight + 30 : contentHeight
    );
  }, [buttonRef, contentRef, listRef]);

  useEffect(() => {
    setItemProps(() =>
      listVisible
        ? {
            opacity: 1,
            marginRight: Math.floor(Math.random() * 10) + 3,
            zIndex: 2,
          }
        : { opacity: 0, marginRight: 0, zIndex: 1 }
    );
    setContentProps(() =>
      listVisible
        ? { opacity: 0, marginLeft: 10, zIndex: 1 }
        : { opacity: 1, marginLeft: 0, zIndex: 2 }
    );
  }, [listVisible, setItemProps, setContentProps]);

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
      <Button
        ref={buttonRef}
        href="#skill"
        onClick={(e) => {
          e.preventDefault();
          setListVisible((prev) => !prev);
        }}
      >
        {listVisible ? 'read more' : 'tl;dr'}
      </Button>
      <ImageWrapper>
        <Img fluid={data.frontmatter.images[0].childImageSharp.fluid} />
      </ImageWrapper>
      <ContentWrapper style={{ height: contentHeight }}>
        <Content
          ref={contentRef}
          style={contentProps}
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
        <List ref={listRef}>
          {hardskills.map((item, idx) => (
            <Item style={itemProps[idx]} key={item || 'things'}>
              {item || 'things'}
            </Item>
          ))}
        </List>
      </ContentWrapper>
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

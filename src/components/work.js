import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Img from 'gatsby-image';

import { colors } from '../constants';
import { useEffect } from 'react';

const Wrapper = styled.div`
  padding: 15px;
  overflow: hidden;
`;
const ContentWrapper = styled.div`
  position: relative;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Excerpt = styled.div`
  width: 500px;
  position: relative;
  left: ${(props) => props.position.left}px;
  transition: left 0.5s ease;

  &:hover {
    cursor: pointer;

    h2 {
      &::after {
        width: 100vw;
      }
    }
  }
`;

// const Overlay = styled.div`
//   position: fixed;
//   display: ${(props) => (props.visible ? 'block' : 'none')};
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   z-index: 99999999;
//   overflow: hidden;
//   bottom: 0;
//   right: 0;
//   background: #ff8887cc;
// `;

const Content = styled.div`
  position: absolute;
  left: 100vw;
  top: 251px;
  height: 5px;
  background: ${colors.TEXT};
  padding: 0;
  z-index: 9;
  width: 100vw;
  overflow-y: scroll;
  transition: left 0.5s ease, height 0.5s ease 1s, padding 0.5s ease 1s,
    top 0.5s ease 1s;

  * {
    opacity: 0;
    transition: opacity 0.5s ease 1s;
  }

  ${(props) =>
    props.visible &&
    css`
      padding: 15px;
      left: 60px;
      height: 100vh;
      top: ${props.offsetTop}px;

      * {
        opacity: 1;
      }
    `}
`;

const Excerptcontent = styled.div`
  color: ${colors.TEXT};
  position: absolute;
  top: 200px;
  right: -80px;

  h2 {
    font-size: 3.25em;
    margin-bottom: 0;
    text-align: right;

    &::after {
      content: '';
      display: block;
      height: 5px;
      width: 0;
      background: ${colors.TEXT};
      position: absolute;
      margin-left: 120px;
      top: 51px;
      z-index: 2;
      transition: width 250ms ease-out;
    }
  }
`;

const calcPosition = (a) => {
  // const maxLeft = window.innerWidth - 595;
  // const left = Math.floor(Math.random() * Math.floor(maxLeft));

  return {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
};

const Work = ({ items }) => {
  const [visibleId, setVisibleId] = useState(undefined);
  const [offsetTop, setOffsetTop] = useState(0);
  const [positions] = useState(items.map(() => calcPosition()));
  const contentRefs = items.map(() => React.createRef());

  const animate = (id, index) => {
    const current = contentRefs[index].current;
    const bounds = current.getBoundingClientRect();

    setOffsetTop(() => {
      return -bounds.y;
    });

    setVisibleId((activeId) => {
      const isActive = activeId !== id ? id : undefined;

      return isActive;
    });
  };

  return (
    <Wrapper>
      {/* <Overlay visible={visibleId !== undefined} /> */}

      {items.map((item, i) => {
        return (
          <ContentWrapper key={item.id}>
            <Excerpt
              position={positions[i]}
              ref={(contentRef) => {
                contentRefs[i].current = contentRef;
              }}
              onClick={() => {
                animate(item.id, i);
              }}
            >
              <Img
                fixed={item.frontmatter.featuredimage.childImageSharp.fixed}
              />
              <Excerptcontent>
                <h2>{item.frontmatter.title}</h2>
                <p>{item.frontmatter.description}</p>
              </Excerptcontent>
            </Excerpt>
            <Content offsetTop={offsetTop} visible={visibleId === item.id}>
              <span
                onClick={() => {
                  setVisibleId(undefined);
                }}
              >
                close
              </span>
              <span>{item.frontmatter.date}</span>
              <div dangerouslySetInnerHTML={{ __html: item.html }} />
            </Content>
          </ContentWrapper>
        );
      })}
    </Wrapper>
  );
};

Work.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Work.defaultProps = {};

export default Work;

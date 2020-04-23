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

  &:hover {
    cursor: pointer;

    h2 {
      &::after {
        width: 100vw;
      }
    }
  }

  h2 {
    color: ${colors.TEXT};
    position: absolute;
    top: 200px;
    right: -80px;
    font-size: 3.25em;

    &::after {
      content: '';
      display: block;
      height: 5px;
      width: 0;
      background: ${colors.TEXT};
      position: absolute;
      margin-left: 120px;
      bottom: 8px;
      z-index: 2;
      transition: width 250ms ease-out;
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

const calcPosition = (a) => {
  console.log('asfd', a);
  console.log(window.innerWidth);

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
  console.log(window);

  return (
    <Wrapper>
      {/* <Overlay visible={visibleId !== undefined} /> */}

      {items.map((item, i) => {
        return (
          <ContentWrapper key={item.id}>
            <Excerpt
              position={() => calcPosition(this)}
              ref={(contentRef) => {
                contentRefs[i].current = contentRef;
              }}
              onClick={() => {
                animate(item.id, i);
              }}
            >
              <Img
                fluid={item.frontmatter.featuredimage.childImageSharp.fluid}
              />
              <h2>{item.frontmatter.title}</h2>
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

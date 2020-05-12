import PropTypes from 'prop-types';
import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import Img from 'gatsby-image';

import DDDImage from '../3d/image';
import { colors } from '../../constants';

const Wrapper = styled.div`
  padding: 15px 0;
  overflow-x: auto;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 320px) {
  }
`;

const Element = styled.div`
  position: relative;
  width: ${(props) => 100 / props.count}vw;
  height: 800px;
  border-color: ${colors.TEXT};
  border-style: solid;
  border-width: 3px;
  overflow: hidden;
  transition: border-color 0.25s ease, width 0.25s ease, height 0.25s ease;

  &:hover {
    border-color: ${colors.PRIMARY};

    h2 {
      color: ${colors.PRIMARY};
    }
  }

  ${(props) =>
    props.visible &&
    css`
      width: 80vw;

      ${StyledImg} {
        left: 0;
        width: 100% !important;
        height: 60% !important;
      }

      ${Content} {
        height: 40%;
        padding: 15px;
      }
    `}

  @media (max-width: 768px) {
    width: 100%;
    height: ${(props) => 100 / props.count}vh;

    ${(props) =>
      props.visible &&
      css`
        height: 75vh;

        ${StyledImg} {
          width: 100% !important;
          height: 60% !important;
          left: 0;

          &:hover {
            transform: scale(1.085);
          }
        }

        ${Content} {
        }
      `}
  }

  @media (max-width: 320px) {
  }
`;

const StyledImg = styled(Img)`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => -props.width / 2}px;
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.085);
  }

  @media (max-width: 768px) {
    width: 100% !important;
    height: inherit !important;
    left: 0;

    &:hover {
      transform: scale(1.085);
    }
  }
`;

const Content = styled.div`
  background-color: ${colors.BACKGROUND};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0;
  padding: 0;
  transition: height 0.25s ease, padding 0.25s ease;
  font-family: 'Wireframer';
`;

const Title = styled.h2`
  position: absolute;
  top: -5px;
  transform-origin: left;
  transform: rotate(90deg);
  left: 25px;
  width: max-content;
  transition: color 0.25s ease;

  @media (max-width: 768px) {
    top: 5px;
    left: 15px;
    transform: none;
  }
`;

const Tag = styled.span`
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  padding: 5px;
  margin: 2.5px;
  font-size: 14px;
  font-family: 'Suprapower';
  transition: all 0.25s ease;

  &:hover {
    background-color: ${colors.PRIMARY};
    color: ${colors.TEXT};
  }

  &:first-of-type {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  margin: 30px 180px;

  &:first-of-type {
    margin-left: 0;
  }
`;

const Excerpt = styled.div`
  color: ${colors.TEXT};
  width: 600px;
  position: relative;
  transition: left 0.5s ease;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;

    h2 {
      &::after {
        width: 100%;
        margin-left: 0;
      }
    }
  }

  h2 {
    width: 100%;
    font-size: 3.25em;
    margin-bottom: 0;
    text-align: center;
    position: relative;

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
      transition: width 0.25s ease, margin-left 0.25s ease;
    }
  }
`;

const Details = styled.div`
  position: absolute;
  top: calc(3.25em - 7px);
  right: 0;
  width: 100%;
  height: 0;
  background: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  z-index: 9;
  padding: 0;
  overflow: hidden;
  transition: left 0.5s ease, height 0.5s ease 0.5s, padding 0.5s ease 0.5s,
    top 0.5s ease 0.5s;

  * {
    opacity: 0;
    transition: opacity 0.5s ease 1s;
  }

  ${(props) =>
    props.visible &&
    css`
      height: calc(600px);
      // top: 0;
      padding: 15px;

      * {
        opacity: 1;
      }
    `}
`;

const calcPosition = (a) => {
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
  const [horizontalScroll, setHorizontalScroll] = useState(false);
  const wrapperRef = useRef();
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

  const handleHorizontalScroll = (e) => {
    if (
      e.deltaY > 0 &&
      wrapperRef.current.scrollLeft >=
        wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth - 5
    ) {
      setHorizontalScroll(false);
    } else if (e.deltaY < 0 && wrapperRef.current.scrollLeft === 0) {
      setHorizontalScroll(false);
    } else {
      setHorizontalScroll(true);

      if (horizontalScroll) {
        wrapperRef.current.scrollLeft += e.deltaY !== 0 ? e.deltaY : e.deltaX;
      }
    }
  };

  // fix passive eventlistener bug
  useLayoutEffect(() => {
    const ref = wrapperRef.current;
    const cancelWheel = (event) => event.preventDefault();

    if (horizontalScroll) {
      ref.addEventListener('wheel', cancelWheel, { passive: false });
    } else {
      ref.removeEventListener('wheel', cancelWheel);
    }

    return () => {
      ref.removeEventListener('wheel', cancelWheel);
    };
  }, [horizontalScroll]);

  return (
    <Wrapper ref={wrapperRef} onWheel={handleHorizontalScroll}>
      {items.map((item, i) => {
        const image = item.frontmatter.featuredimage.childImageSharp;

        return (
          <Element
            count={items.length}
            key={item.id}
            visible={visibleId === item.id}
            onClick={() => {
              setVisibleId((activeId) => {
                const isActive = activeId !== item.id ? item.id : undefined;

                return isActive;
              });
            }}
          >
            <StyledImg
              width={image.fixed.height}
              height={image.fixed.height}
              fixed={image.fixed}
            />
            <Title>{item.frontmatter.title}</Title>
            <Content>
              <div dangerouslySetInnerHTML={{ __html: item.html }} />
              {item.frontmatter.tags &&
                item.frontmatter.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </Content>
            {/* <DDDImage image={item.frontmatter.featuredimage} /> */}
          </Element>
        );
      })}
      {/* {items.map((item, i) => {
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
              <h2>{item.frontmatter.title}</h2>

              <Img
                style={{ width: 600, height: 600 }}
                fixed={item.frontmatter.featuredimage.childImageSharp.fixed}
              />
              <DDDImage
                image={item.frontmatter.featuredimage}
              />
            </Excerpt>
            <Details visible={visibleId === item.id}>
              <span
                onClick={() => {
                  setVisibleId(undefined);
                }}
              >
                close
              </span>
              <span>{item.frontmatter.date}</span>
              <p>{item.frontmatter.description}</p>
              <div dangerouslySetInnerHTML={{ __html: item.html }} />
            </Details>
          </ContentWrapper>
        );
      })} */}
    </Wrapper>
  );
};

Work.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Work.defaultProps = {};

export default Work;

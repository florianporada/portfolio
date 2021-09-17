import PropTypes from 'prop-types';
import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

// import DDDImage from '../3d/image';
import Tag from '../Tag';
import TransitionLink from '../TransitionLink';
import { breakpoints, colors } from '../../constants';

const Wrapper = styled.div`
  padding: 15px 0;
  overflow-x: auto;
  display: flex;

  ${(props) =>
    props.open &&
    css`
      ${Element} {
        width: ${(100 - 50) / (props.count - 1)}vw;
      }
    `}

  @media (max-width: ${breakpoints.MD}px) {
    flex-direction: column;

    ${(props) =>
      props.open &&
      css`
        ${Element} {
          width: 100% !important;
        }
      `}
  }

  @media (max-width: ${breakpoints.SM}) {
  }
`;

const Element = styled(TransitionLink)`
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
    cursor: pointer;

    h2 {
      color: ${colors.PRIMARY};
    }
  }

  ${(props) =>
    props.visible &&
    css`
      width: 50vw !important;

      ${StyledImg} {
        width: 100% !important;
        height: 70%;
      }

      ${Content} {
        height: 30%;
      }
    `}

  @media (max-width: ${breakpoints.MD}px) {
    width: 100%;
    height: ${(props) => 100 / props.count}vh;

    ${(props) =>
      props.visible &&
      css`
        height: 150vh;
      `}
  }

  @media (max-width: ${breakpoints.SM}) {
    ${(props) =>
      props.visible &&
      css`
        height: 225vh;
      `}
  }
`;

const StyledImg = styled(GatsbyImage)`
  height: 100%;
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: ${breakpoints.MD}px) {
    width: 100% !important;
  }
`;

const Content = styled.div`
  background-color: ${colors.BACKGROUND};
  bottom: 0;
  width: 100%;
  height: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  transition: height 0.25s ease, padding 0.25s ease;
`;

const Title = styled.h2`
  position: absolute;
  top: -5px;
  transform-origin: left;
  transform: rotate(90deg);
  left: 25px;
  width: max-content;
  transition: color 0.25s ease;

  @media (max-width: ${breakpoints.MD}px) {
    top: 5px;
    left: 15px;
    transform: none;
  }
`;

const Meta = styled.div`
  display: block;
  width: 100%;
`;

const Link = styled.a`
  color: ${colors.TEXT};
  font-size: 1.5rem;
  font-family: 'Suprapower';
  display: block;
  margin-bottom: 10px;

  &:visited {
    color: ${colors.TEXT};
  }
`;

// const ContentWrapper = styled.div`
//   position: relative;
//   margin: 30px 180px;

//   &:first-of-type {
//     margin-left: 0;
//   }
// `;

// const Excerpt = styled.div`
//   color: ${colors.TEXT};
//   width: 600px;
//   position: relative;
//   transition: left 0.5s ease;
//   justify-content: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   &:hover {
//     cursor: pointer;

//     h2 {
//       &::after {
//         width: 100%;
//         margin-left: 0;
//       }
//     }
//   }

//   h2 {
//     width: 100%;
//     font-size: 3.25em;
//     margin-bottom: 0;
//     text-align: center;
//     position: relative;

//     &::after {
//       content: '';
//       display: block;
//       height: 5px;
//       width: 0;
//       background: ${colors.TEXT};
//       position: absolute;
//       margin-left: 120px;
//       top: 51px;
//       z-index: 2;
//       transition: width 0.25s ease, margin-left 0.25s ease;
//     }
//   }
// `;

// const Details = styled.div`
//   position: absolute;
//   top: calc(3.25em - 7px);
//   right: 0;
//   width: 100%;
//   height: 0;
//   background: ${colors.TEXT};
//   color: ${colors.BACKGROUND};
//   z-index: 9;
//   padding: 0;
//   overflow: hidden;
//   transition: left 0.5s ease, height 0.5s ease 0.5s, padding 0.5s ease 0.5s,
//     top 0.5s ease 0.5s;

//   * {
//     opacity: 0;
//     transition: opacity 0.5s ease 1s;
//   }

//   ${(props) =>
//     props.visible &&
//     css`
//       height: calc(600px);
//       // top: 0;
//       padding: 15px;

//       * {
//         opacity: 1;
//       }
//     `}
// `;

const Work = ({ items }) => {
  const [visibleId, setVisibleId] = useState(undefined);
  const [horizontalScroll, setHorizontalScroll] = useState(false);
  const wrapperRef = useRef();

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
    <Wrapper
      ref={wrapperRef}
      onWheel={handleHorizontalScroll}
      open={visibleId !== undefined ? true : false}
      count={items.length}
    >
      {items.map((item, i) => {
        const image = item.frontmatter.featuredimage.childImageSharp;

        return (
          <Element
            key={item.id}
            to={`${item.frontmatter.slug}`}
            count={items.length}
            // visible={visibleId === item.id}
            onClick={(e) => {
              // e.preventDefault();
              // TODO: do something with form values
              // navigate(`${item.frontmatter.slug}`);
              // setVisibleId((activeId) => {
              //   const isActive = activeId !== item.id ? item.id : undefined;
              //   return isActive;
              // });
            }}
          >
            <StyledImg
              image={image.gatsbyImageData}
              alt={item.frontmatter.title}
            />
            <Title>{item.frontmatter.title}</Title>
            <Content>
              <div dangerouslySetInnerHTML={{ __html: item.html }} />
              <Meta>
                {/* <Link
                  href={item.frontmatter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </Link> */}
                {item.frontmatter.tags &&
                  item.frontmatter.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
              </Meta>
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

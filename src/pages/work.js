import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled, { css } from 'styled-components';

import { colors, breakpoints, sizes } from '../constants';
import PageWrapper from '../components/PageWrapper';
import Link from '../components/Link';

const Wrapper = styled(PageWrapper)`
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
    margin-top: 115px;

    ${(props) =>
      props.open &&
      css`
        ${Element} {
          width: 100% !important;
        }
      `};
  }

  @media (max-width: ${breakpoints.SM}) {
  }
`;

const Element = styled(Link)`
  position: relative;
  width: ${(props) => 100 / props.count}vw;
  height: 100vh;
  border-color: ${colors.TEXT};
  border-style: solid;
  border-width: ${sizes.BORDER};
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
  filter: grayscale(1);
  opacity: 0.2;
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.01);
    opacity: 1;
    filter: grayscale(0);
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
  top: 90px;
  transform-origin: left;
  transform: rotate(90deg);
  left: 25px;
  width: max-content;
  transition: color 0.25s ease;
  font-size: 1.25em;
  color: ${colors.TEXT};

  @media (max-width: ${breakpoints.MD}px) {
    top: 5px;
    left: 15px;
    transform: none;
  }
`;

export default function Work({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data; // data.markdownRemark holds your post data
  const nodes = useMemo(
    () =>
      allMarkdownRemark.nodes.map((markdownRemark) => {
        const [excerpt, content] =
          markdownRemark.html.split('<!-- end -->').length > 1
            ? markdownRemark.html.split('<!-- end -->')
            : [undefined, markdownRemark.html];

        return {
          ...markdownRemark,
          excerpt: excerpt,
          content: content,
        };
      }),
    [allMarkdownRemark]
  );

  return (
    <Wrapper title="Work" full>
      {nodes.length > 0 &&
        nodes.map(({ id, frontmatter }) => {
          return (
            <Element key={id} to={`${frontmatter.slug}`} count={nodes.length}>
              <StyledImg
                image={
                  frontmatter.featuredimage?.childImageSharp?.gatsbyImageData
                }
                alt={frontmatter.title}
              />
              <Title>{frontmatter.title}</Title>
            </Element>
          );
        })}
    </Wrapper>
  );
}

Work.propTypes = {
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/work/" }
        frontmatter: { featured: { eq: true } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      nodes {
        id
        frontmatter {
          slug
          title
          date
          tags
          link
          description
          featuredimage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                width: 992
                transformOptions: { grayscale: false }
                aspectRatio: 1
              )
            }
          }
        }
        html
      }
    }
  }
`;

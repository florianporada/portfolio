import React, { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import styled from 'styled-components';

import Layout from '../components/layout';
import Image from '../components/image';
import Hero from '../components/hero';
import Work from '../components/work';
import SEO from '../components/seo';

import { colors } from '../constants';

const Title = styled.h1`
  font-size: 140px;
  margin-left: 5px;
  transition: margin 250ms ease-out;
  color: ${colors.TEXT};

  &::after {
    content: '';
    display: block;
    height: 10px;
    width: 0;
    background: ${colors.TEXT};
    position: absolute;
    margin-left: 120px;
    margin-top: -30px;
    z-index: 2;
    transition: width 250ms ease-out;
  }

  &:hover {
    margin-left: 10px;

    &::after {
      width: 70%;
    }
  }

  @media (max-width: 768px) {
    font-size: 100px;
  }

  @media (max-width: 320px) {
    font-size: 80px;

    &::after {
      margin-left: 0;
      margin-top: -20px;
    }

    &:hover {
      margin-left: 10px;

      &::after {
        width: 90%;
      }
    }
  }
`;

const StyledImg = styled(Img)`
  width: 400px;
`;

const About = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const TitleSmall = styled.h3`
  position: absolute;
  top: 150px;
  left: 250px;
  max-width: 370px;
  color: ${colors.TEXT};
`;

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        title={data.about.frontmatter.name}
        text={data.about.frontmatter.short}
        hideContent
      />
      <section style={{ paddingTop: 300 }}>
        <About>
          <StyledImg
            fluid={data.about.frontmatter.featuredimage.childImageSharp.fluid}
          />
          <TitleSmall>{data.about.frontmatter.short}</TitleSmall>
        </About>
      </section>
      <section>
        <Title>Selected Work</Title>
        <Work items={data.work.nodes} />
      </section>

      <section>
        <Title>Skill</Title>
      </section>
    </Layout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.object,
};

IndexPage.defaultProps = {};

export const query = graphql`
  query {
    about: markdownRemark(fileAbsolutePath: { regex: "/content/about/" }) {
      id
      frontmatter {
        short
        name
        date
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    work: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/work/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          description
          featuredimage {
            childImageSharp {
              fixed(
                width: 400
                height: 400
                cropFocus: CENTER
                grayscale: true
              ) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        html
      }
    }
    pages: allFile(filter: { relativePath: { regex: "/pages/" } }) {
      nodes {
        id
        name
      }
    }
  }
`;

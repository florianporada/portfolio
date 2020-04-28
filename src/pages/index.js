import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import styled from 'styled-components';

import Layout from '../components/layout';
import Hero from '../components/hero';
import Work from '../components/sections/work';
import About from '../components/sections/about';
import SEO from '../components/seo';

import { colors } from '../constants';

const Section = styled.section`
  margin: 50px 0;
`;

const Title = styled.h2`
  font-size: 6em;
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

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        title={data.about.frontmatter.title}
        text={data.about.frontmatter.description}
        hideContent
      />
      <Section id="about">
        <About data={data.about} />
      </Section>
      <Section>
        <Title id="work">Selected Work</Title>
        <Work items={data.work.nodes} />
      </Section>
      <Section id="skill">
        <Title>Skill</Title>
      </Section>
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
      html
      frontmatter {
        description
        title
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
                width: 800
                height: 800
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

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import styled from 'styled-components';

import Layout from '../components/layout';
import Hero from '../components/hero';
import Image from '../components/3d/image';
import Work from '../components/sections/work';
import About from '../components/sections/about';
import Skill from '../components/sections/skill';
import SEO from '../components/seo';

import { colors } from '../constants';

const Section = styled.section`
  margin: 50px 0;

  &:last-of-type {
    margin-bottom: 0;
  }
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
    font-size: 4em;
  }

  @media (max-width: 320px) {
    font-size: 3em;

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
        <Title>{data.skill.frontmatter.title}</Title>
        <Skill data={data.skill} />
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
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    skill: markdownRemark(fileAbsolutePath: { regex: "/content/skill/" }) {
      id
      html
      htmlAst
      frontmatter {
        title
        hardskills
        images {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    work: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/work/" }
        frontmatter: { featured: { eq: true } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          tags
          link
          description
          featuredimage {
            childImageSharp {
              fixed(width: 800, height: 800, grayscale: true) {
                ...GatsbyImageSharpFixed_withWebp
              }
              fluid(maxWidth: 800, grayscale: true) {
                ...GatsbyImageSharpFluid_withWebp
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

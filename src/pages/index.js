import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import styled from 'styled-components';

import Layout from '../components/layout';
import SectionTitle from '../components/sectiontitle';
import Hero from '../components/hero';
import Work from '../components/sections/work';
import About from '../components/sections/about';
import Skill from '../components/sections/skill';
import SEO from '../components/seo';

const Section = styled.section`
  margin: 50px 0;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO
        title="Home"
        noscript={[
          {
            innerHTML:
              '<meta http-equiv="refresh" content="1;url=simpleversion" />',
          },
        ]}
      />
      <Hero
        title={data.about.frontmatter.title}
        text={data.about.frontmatter.description}
        hideContent
      />
      <Section id="about">
        <About data={data.about} />
      </Section>
      <Section id="work">
        <SectionTitle>Selected Work</SectionTitle>
        <Work items={data.work.nodes} />
      </Section>
      <Section id="skill">
        <SectionTitle>{data.skill.frontmatter.title}</SectionTitle>
        <Skill data={data.skill} />
      </Section>
    </>
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
            gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO, WEBP])
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
            gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO, WEBP])
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
          slug
          title
          date
          tags
          link
          description
          featuredimage {
            childImageSharp {
              gatsbyImageData(
                layout: FIXED
                formats: [AUTO, WEBP]
                width: 800
                height: 800
              )
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

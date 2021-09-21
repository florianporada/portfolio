import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Hero from '../components/Hero';
import SEO from '../components/Seo';
import PageWrapper from '../components/PageWrapper';

const IndexPage = ({ data }) => {
  return (
    <PageWrapper full title="Portfolio">
      <Hero
        title={data.about.frontmatter.title}
        text={data.about.frontmatter.description}
        // hideContent
      />
    </PageWrapper>
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
                formats: [AUTO, WEBP, AVIF]
                placeholder: BLURRED
                width: 800
                height: 800
                transformOptions: { grayscale: true }
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

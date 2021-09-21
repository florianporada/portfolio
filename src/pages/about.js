import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { colors, breakpoints } from '../constants';
import PageWrapper from '../components/PageWrapper';
import useContent from '../hooks/useContent';
import PageContent from '../components/PageContent';

const PageHeader = styled.div`
  text-align: center;
  width: 100%;

  h1 {
    margin-bottom: 10px;
  }
`;

export default function About({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const [excerpt, content] = useContent(html);

  return (
    <PageWrapper title="About">
      <PageHeader>
        <h1>{frontmatter.title}</h1>
      </PageHeader>
      {content && (
        <PageContent
          dangerouslySetInnerHTML={{ __html: `${excerpt}${content}` }}
        />
      )}
    </PageWrapper>
  );
}

About.propTypes = {
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/content/about/" }) {
      html
      excerpt(format: MARKDOWN)
      frontmatter {
        date(formatString: "YYYY")
        slug
        title
        tags
        description
        featuredimage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              width: 800
              transformOptions: { grayscale: false }
              aspectRatio: 1
            )
          }
        }
      }
    }
  }
`;

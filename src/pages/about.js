import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { colors, breakpoints } from '../constants';
import PageWrapper from '../components/PageWrapper';
import TransitionWrapper from '../components/TransitionWrapper';
import TransitionLink from '../components/TransitionLink';
import useContent from '../hooks/useContent';

const PageHeader = styled.div`
  text-align: center;
  width: 100%;

  h1 {
    margin-bottom: 10px;
  }
`;

const ContentWrapper = styled.div``;

const Content = styled.div`
  margin-top: 50px;

  pre,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-left: 150px;
  }

  span.full-size {
    p > img,
    span.gatsby-resp-image-wrapper {
      width: calc(100% + 150px);
      margin-left: -150px !important;
      max-width: unset !important;
    }
  }

  @media (max-width: ${breakpoints.MD}px) {
    pre,
    h3,
    h4,
    h5,
    h6,
    p {
      margin-left: 0;
    }

    span.full-size {
      p > img,
      span.gatsby-resp-image-wrapper {
        width: 100%;
        margin-left: auto !important;
        max-width: unset;
      }
    }
  }

  .gatsby-resp-image-wrapper {
  }
`;

export default function About({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const [excerpt, content] = useContent(html);

  return (
    <PageWrapper style={{ marginTop: '300px', marginBottom: '50px' }}>
      <PageHeader>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
      </PageHeader>
      {content && (
        <ContentWrapper>
          <Content
            dangerouslySetInnerHTML={{ __html: `${excerpt}${content}` }}
          ></Content>
        </ContentWrapper>
      )}
      <TransitionLink
        to="/"
        exit={{
          length: 0.5,
          trigger: ({ node, e, exit, entry }) =>
            console.log(node, e, exit, entry),
        }}
        entry={{ delay: 0.5 }}
      >
        BACK
      </TransitionLink>
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

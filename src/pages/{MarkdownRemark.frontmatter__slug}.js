import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { colors, breakpoints } from '../constants';
import PageWrapper from '../components/PageWrapper';
import Tag from '../components/Tag';
import TransitionWrapper from '../components/TransitionWrapper';
import TransitionLink from '../components/TransitionLink';

const interestingExitAnimation = (exit, node) => {
  // do some animation here
  console.log(exit, node);
};

const PageHeader = styled.div`
  text-align: center;
  width: 100%;

  h1 {
    margin-bottom: 10px;
  }
`;

const TagWrapper = styled.div`
  margin-bottom: 10px;
`;

const StyledImg = styled(GatsbyImage)`
  flex-shrink: 0;
  margin-bottom: 40px;
  max-width: 800px;
  transition: all 0.25s ease;
  width: 85%;

  &:hover {
    transform: scale(1.01);
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

const Excerpt = styled.div`
  background-color: ${colors.BACKGROUND};
  border-color: ${colors.TEXT};
  border-style: solid;
  border-width: 3px;
  bottom: 0;
  max-width: 70%;
  padding: 20px;
  position: absolute;
  right: 0;
  text-align: start;
  z-index: 1;

  p:last-of-type {
    margin-bottom: 0;
  }
`;

export default function WorkTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const [excerpt, content] = html.split('<!-- end -->');

  return (
    <PageWrapper style={{ marginTop: '300px', marginBottom: '50px' }}>
      <PageHeader>
        <h1>{frontmatter.title}</h1>
        <TagWrapper>
          {frontmatter?.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagWrapper>
        <h2>{frontmatter.date}</h2>
        <div style={{ display: 'flex', position: 'relative' }}>
          <StyledImg
            image={frontmatter.featuredimage.childImageSharp.gatsbyImageData}
            alt={`Titleimage for ${frontmatter.title}`}
          />
          <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      </PageHeader>
      {content && (
        <ContentWrapper>
          <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
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

WorkTemplate.propTypes = {
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
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

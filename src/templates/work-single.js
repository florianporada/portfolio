import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { colors, sizes, breakpoints, fonts } from '../constants';
import PageWrapper from '../components/PageWrapper';
import Tag from '../components/Tag';
import Link from '../components/Link';
import PageContent from '../components/PageContent';
import PageImage from '../components/PageImage';

const PageHeader = styled.div`
  text-align: center;
  width: 100%;

  h1 {
    margin-bottom: 10px;
  }
`;

const PageNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;

  a {
    color: ${colors.TEXT} !important;

    &:only-child {
      color: red;
    }
  }
`;

const TagWrapper = styled.div`
  margin-bottom: 10px;
`;

const Intro = styled.div`
  display: flex;
  position: relative;

  @media (max-width: ${breakpoints.MD}px) {
    display: block;
  }
`;

const Excerpt = styled.div`
  background-color: ${colors.BACKGROUND};
  border-color: ${colors.TEXT};
  border-style: solid;
  border-width: ${sizes.BORDER};
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

  @media (max-width: ${breakpoints.MD}px) {
    max-width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

const WorkLink = styled(Link)`
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  padding: 10px;
  margin: 15px 0 0 0;
  font-size: ${sizes.FONT_SM};
  font-family: ${fonts.HIGHLIGHT};
  transition: all 0.25s ease;
  float: right;

  &::after {
    content: none;
  }

  &:visited {
    color: ${colors.BACKGROUND};
  }

  &:hover {
    color: ${colors.PRIMARY};
  }

  @media (max-width: ${breakpoints.MD}px) {
  }
`;

export default function WorkTemplate({ data, path, ...props }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const [excerpt, content] = html.split('<!-- end -->');
  const { previous, next } = data;

  return (
    <PageWrapper title={frontmatter.title}>
      <PageHeader>
        <h1>{frontmatter.title}</h1>
        <TagWrapper>
          {frontmatter?.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagWrapper>
        <h2>{frontmatter.date}</h2>
        <Intro>
          <PageImage
            image={frontmatter.featuredimage.childImageSharp.gatsbyImageData}
            alt={`Titleimage for ${frontmatter.title}`}
          />
          <Excerpt>
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            {frontmatter.link && (
              <WorkLink to={frontmatter.link} target="_blank">
                {`Visit ${frontmatter.title}`}
              </WorkLink>
            )}
          </Excerpt>
        </Intro>
      </PageHeader>
      {content && <PageContent dangerouslySetInnerHTML={{ __html: content }} />}
      <PageNav>
        {previous && (
          <Link to={previous.frontmatter.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={next.frontmatter.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </PageNav>
    </PageWrapper>
  );
}

WorkTemplate.propTypes = {
  data: PropTypes.object,
  path: PropTypes.string,
};

export const pageQuery = graphql`
  query ($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }, frontmatter: { slug: { ne: null } }) {
      html
      excerpt(format: MARKDOWN)
      frontmatter {
        date(formatString: "YYYY")
        slug
        title
        link
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      frontmatter {
        slug
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      frontmatter {
        slug
        title
      }
    }
  }
`;

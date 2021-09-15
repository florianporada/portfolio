import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import TransitionLink from 'gatsby-plugin-transition-link';

const interestingExitAnimation = (exit, node) => {
  // do some animation here
  console.log(exit, node);
};

export default function WorkTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Link to={'/'}>back</Link>
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <TransitionLink to="/" exit={{ length: 0.5 }} entry={{ delay: 0.5 }}>
        Go to page 2
      </TransitionLink>
    </>
  );
}

WorkTemplate.propTypes = {
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;

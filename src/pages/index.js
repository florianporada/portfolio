import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Hero from '../components/Hero';
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
      }
    }
  }
`;

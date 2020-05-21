/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import '../assets/styles/index.scss';
import Footer from './footer';
import styled from 'styled-components';
import { colors } from '../constants';

const Main = styled.main`
  background-color: ${colors.BACKGROUND};
  min-height: 100%;

  &::after {
    z-index: -1;
    height: 500px;
    content: '';
    position: absolute;
    width: 100%;
  }

  @media (max-width: 768px) {
    &::after {
      height: 440px;
    }
  }
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <span id="home" style={{ opacity: 0, height: 0, width: 0 }} />
      <Main>{children}</Main>
      <span id="contact" style={{ opacity: 0, height: 0, width: 0 }} />
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import '../assets/styles/index.scss';
import Header from './Header';
import Footer from './Footer';
import { colors, breakpoints } from '../constants';

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

  @media (max-width: ${breakpoints.MD}px) {
    &::after {
      height: 460px;
    }
  }
`;

const Layout = ({ children }) => {
  const isSimpleversion = window.location.pathname === '/simpleversion';
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
      <Header
        siteTitle={data.site.siteMetadata.title}
        simple={isSimpleversion}
      />
      <span id="home" style={{ opacity: 0, height: 0, width: 0 }} />
      <Main>{children}</Main>
      <span id="contact" style={{ opacity: 0, height: 0, width: 0 }} />
      <Footer simple={isSimpleversion} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {};

export default Layout;

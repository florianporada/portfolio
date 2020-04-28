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
  margin-bottom: 400px;
  min-height: 100%;

  // -webkit-box-shadow: 0px 4px 25px 0px ${colors.BACKGROUND};
  // -moz-box-shadow: 0px 4px 25px 0px ${colors.BACKGROUND};
  // box-shadow: 0px 4px 25px 0px ${colors.BACKGROUND};
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
      <span id="home" style={{ opacity: 0, height: 0, width: 0 }} />
      <Header siteTitle={data.site.siteMetadata.title} />
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

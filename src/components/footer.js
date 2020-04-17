import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../constants';

const FooterWrapper = styled.footer`
  height: 300px;
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  font-size: 30px;
  font-family
`;

const NavList = styled.ul`
  display: flex;
  margin-left: 0;
`;

const NavItem = styled.li`
  list-style: none;
  padding: 15px;

  &:first-of-type {
    padding-left: 0;
  }
`;

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      pages: allFile(filter: { relativePath: { regex: "/pages/" } }) {
        nodes {
          id
          name
        }
      }
    }
  `);

  return (
    <FooterWrapper>
      © {new Date().getFullYear()}, Built by
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.github.com/florianporada"
      >
        florianporada
      </a>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  data: PropTypes.object,
};

Footer.defaultProps = {};

export default Footer;

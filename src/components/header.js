import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useScrollData } from 'scroll-data-hook';

import { colors } from '../constants';
import Nav from './nav';

const HeaderWrapper = styled.header`
  background: transparent;
  left: 0;
  padding: 30px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  &::after {
    content: '';
    display: block;
    height: 2px;
    width: ${(props) => {
      return props.minimize ? '0' : '100%';
    }};
    bottom: 0;
    left: 0;
    background: ${colors.TEXT};
    position: absolute;
    z-index: 2;
    transition: width 500ms ease-out;
  }

  a {
    color: ${colors.TEXT};
    text-decoration: none;

    &::after {
      display: none;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  text-align: ${(props) => {
    return props.minimize ? 'left' : 'center';
  }};
  font-size: ${(props) => {
    return props.minimize ? '1rem' : '2.25rem';
  }};
  transition: font-size 0.5s ease-out, text-align 0.5s ease;
`;

const Header = ({ siteTitle }) => {
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
  const { position } = useScrollData();
  const minimize = position.y > 30;

  return (
    <HeaderWrapper minimize={minimize}>
      <Title minimize={minimize}>
        <Link to="/">{siteTitle}</Link>
      </Title>
      <Nav items={data.pages.nodes} />
    </HeaderWrapper>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  data: PropTypes.object,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

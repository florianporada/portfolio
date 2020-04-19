import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../constants';

const Nav = styled.nav``;

const NavList = styled.ul`
  display: flex;
  margin-left: 0;
`;

const NavItem = styled.li`
  list-style: none;
  padding: 15px;
  text-transform: uppercase;

  &:first-of-type {
    padding-left: 0;
  }
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

  return (
    <header
      style={{
        background: colors.BACKGROUND,
        borderBottom: `1px solid ${colors.TEXT}`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0, textAlign: 'center' }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <Nav>
          <NavList>
            {data.pages.nodes
              .filter((item) => item.name !== '404')
              .map((item) => {
                return (
                  <NavItem key={item.id}>
                    <Link
                      to={item.name === 'index' ? '/' : item.name}
                      style={{
                        color: `white`,
                        textDecoration: `none`,
                      }}
                    >
                      {item.name === 'index' ? 'home' : item.name}
                    </Link>
                  </NavItem>
                );
              })}
          </NavList>
        </Nav>
      </div>
    </header>
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

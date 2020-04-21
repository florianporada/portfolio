import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../constants';

const NavWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  opacity: 0;
  align-items: center;
  justify-content: center;
  background-color: ${colors.PRIMARY}e6;
  z-index: 1;
  transition: opacity 500ms ease-in 600ms;

  &.visible {
    opacity: 1;
    display: flex;
  }
`;

const Nav = styled.nav``;

const NavList = styled.ul`
  display: flex;
  margin: 0;
  flex-direction: column;
  text-align: center;
`;

const NavItem = styled.li`
  list-style: none;
  padding: 15px;
  text-transform: uppercase;
  font-family: Suprapower;
  font-size: 2rem;

  &:first-of-type {
    padding-left: 15px;
  }
`;

function Navigation({ items }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <a
        href="#a"
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
        clock
      </a>
      <NavWrapper className={visible ? 'visible' : ''}>
        <Nav>
          <NavList>
            {items
              .filter((item) => item.name !== '404')
              .map((item) => {
                return (
                  <NavItem key={item.id}>
                    <Link
                      onClick={() => {
                        setVisible((prev) => !prev);
                      }}
                      to={item.name === 'index' ? '/' : `/${item.name}`}
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
      </NavWrapper>
    </>
  );
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

Navigation.defaultProps = {
  siteTitle: ``,
};

export default Navigation;

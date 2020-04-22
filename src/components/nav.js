import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-regular-svg-icons';

import { colors } from '../constants';
import NavButton from './navbutton';

const NavWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  top: -100vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${colors.PRIMARY}e6;
  z-index: 9;
  transition: top 0.2s ease 0.6s;

  &.visible {
    top: 0;
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

function Navigation({ items, minimize }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <NavButton
        position={'left'}
        bars={2}
        minimize={minimize}
        onClick={(e) => {
          e.preventDefault();
          setVisible((prev) => !prev);
        }}
      >
        <FontAwesomeIcon style={{ marginRight: 10 }} icon={faBars} />
      </NavButton>
      <NavButton
        bars={3}
        minimize={minimize}
        onClick={(e) => {
          e.preventDefault();
          setVisible((prev) => !prev);
        }}
      />
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
  minimize: PropTypes.bool,
};

Navigation.defaultProps = {
  siteTitle: ``,
};

export default Navigation;

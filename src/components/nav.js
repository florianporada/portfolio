import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-regular-svg-icons';

import { colors } from '../constants';
import NavButton from './navbutton';
import { useFrame } from 'react-three-fiber';

const NavWrapper = styled.div`
  width: 100%;
  height: 4px;
  position: fixed;
  left: -100vw;
  display: flex;
  top: 101px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${colors.PRIMARY}e6;
  z-index: 9999;
  transition: left 0.5s ease, top 0.5s ease 0.75s, height 0.5s ease 0.75s;

  ${(props) =>
    props.visible &&
    css`
      left: 0;
      height: 100vh;
      top 0;
      // transition: top 0.5s ease, height 0.5s ease, left 0.2s ease 0.7s;
    `}
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
      <NavWrapper visible={visible}>
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

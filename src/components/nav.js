import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { navigate } from '@reach/router';
import styled, { css } from 'styled-components';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-regular-svg-icons';

import { colors } from '../constants';
import NavButton from './navbutton';

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

      nav {
        opacity: 1;
      }
    `}
`;

const Nav = styled.nav`
  opacity: 0;
  transition: opacity 0.25s ease 0.75s;
`;

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
            {items.map((item) => {
              return (
                <NavItem key={item.id}>
                  <a
                    style={{
                      color: colors.TEXT,
                      textDecoration: `none`,
                    }}
                    href="#click"
                    onClick={(e) => {
                      e.preventDefault();

                      setVisible((prev) => !prev);
                      scrollTo(`#${item.name}`);
                    }}
                  >
                    {item.name}
                  </a>
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

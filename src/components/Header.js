import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { useScrollData } from 'scroll-data-hook';

import { colors } from '../constants';
import Nav from './Nav';
import TransitionLink from './TransitionLink';

const HeaderWrapper = styled.header`
  background: transparent;
  left: 0;
  padding: 30px;
  position: fixed;
  top: 0;
  width: ${(props) => {
    return props.minimize ? '100px' : '100%';
  }};
  z-index: 10;
  display: flex;
  flex-direction: column;
  transition: width 0.5s ease-out 0.25s;

  /* &::after {
    content: '';
    display: block;
    height: 3px;
    width: ${(props) => {
    return props.minimize ? '72px' : '100%';
  }};
    bottom: 0;
    left: 0;
    background: ${colors.TEXT};
    position: absolute;
    z-index: 2;
    transition: width 0.5s ease-out 0.25s;
  } */

  a {
    color: ${colors.TEXT};
    text-decoration: none;

    &::after {
      display: none;
    }
  }
`;

const SimpleHeaderWrapper = styled.header`
  padding: 30px;
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};

  h1 {
    transform: unset;
    text-align: center;
  }

  ul {
    display: flex;
    list-style: none;
    justify-content: space-evenly;
    max-width: 992px;
    margin: 30px auto 0 auto;
  }
`;

const Title = styled.h1`
  margin: 0;
  display: block;
  transform: translateX(50%);
  font-size: 2.25rem;
  margin-left: 0;
  transition: font-size 0.1s ease, transform 0.5s ease 0.25s,
    margin-left 0.25s ease 0.25s;

  a {
    display: inline-block;
    position: relative;
    width: 305px;
    height: 40px;
    transform: translateX(-50%);
    transition: transform 0.5s ease 0.25s, width 0.5s ease,
      height 0.5s ease 0.5s;
  }

  span {
    position: absolute;
    transition: all 0.5s ease;
    color: ${colors.TEXT};

    &:first-of-type {
      left: 0;
    }

    &:last-of-type {
      left: 160px;
      top: 0;
    }
  }

  ${(props) =>
    props.minimize &&
    css`
      transform: translateX(0);
      font-size: 1rem;
      transition-delay: 0;
      margin-left: -30px;

      a {
        transform: translateX(0);
        width: 75px;
        height: 40px;
      }

      span {
        &:first-of-type {
          top: 0;
        }

        &:last-of-type {
          top: 22px;
          left: 0;
        }
      }
    `}
`;

const NavWrapper = styled.ul`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const NavItem = styled.li`
  list-style: none;
  margin-bottom: 0;
`;

function getNavLink(link) {
  if (link.toLowerCase() === 'home') {
    return '/';
  }

  if (link.toLowerCase() === 'contact') {
    return '#contact';
  }

  return `/${link.toLowerCase()}`;
}

const Header = ({ siteTitle, simple }) => {
  const { position } = useScrollData();
  const minimize = position.y > 30;
  const { allMarkdownRemark } = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { order: { ne: null } } }
        sort: { fields: frontmatter___order }
      ) {
        nodes {
          id
          frontmatter {
            title
            order
          }
        }
      }
    }
  `);

  if (simple) {
    return (
      <SimpleHeaderWrapper>
        <Title>{siteTitle}</Title>
        <ul>
          {allMarkdownRemark.nodes.map((item) => (
            <li key={item.id}>
              <a href={getNavLink(item.frontmatter.title)}>
                {item.frontmatter.title}
              </a>
            </li>
          ))}
        </ul>
      </SimpleHeaderWrapper>
    );
  }

  return (
    <HeaderWrapper minimize={minimize}>
      {/* <Title minimize={minimize}>
        <TransitionLink to="/">
          {siteTitle.split(' ').map((part, idx) => (
            <span key={`${part}${idx}`}>{part}</span>
          ))}
        </TransitionLink>
      </Title> */}
      {/* <Nav items={data.pages.nodes} minimize={minimize} /> */}
      <NavWrapper>
        {allMarkdownRemark.nodes.map((item) => (
          <NavItem key={item.id}>
            <TransitionLink to={getNavLink(item.frontmatter.title)}>
              {item.frontmatter.title}
            </TransitionLink>
          </NavItem>
        ))}
      </NavWrapper>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  data: PropTypes.object,
  simple: PropTypes.bool,
};

Header.defaultProps = {
  siteTitle: ``,
  simple: false,
};

export default Header;

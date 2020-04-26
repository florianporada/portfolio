import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
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
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 104px;

  &::after {
    content: '';
    display: block;
    height: 3px;
    width: ${(props) => {
      return props.minimize ? '60px' : '100%';
    }};
    bottom: 0;
    left: 0;
    background: ${colors.TEXT};
    position: absolute;
    z-index: 2;
    transition: width 0.5s ease-out 0.25s;
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
  display: block;
  transform: translateX(50%);
  font-size: 2.25rem;
  margin-left: 0;
  transition: font-size 0.1s ease, transform 0.5s ease 0.25s,
    margin-left 0.25s ease 0.25s;

  a {
    display: inline-block;
    position: relative;
    width: 325px;
    height: 40px;
    transform: translateX(-50%);
    transition: transform 0.5s ease 0.25s, width 0.5s ease,
      height 0.5s ease 0.5s;
  }

  span {
    position: absolute;
    transition: all 0.5s ease;

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

const Header = ({ siteTitle }) => {
  const { position } = useScrollData();
  const minimize = position.y > 30;
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
    <HeaderWrapper minimize={minimize}>
      <Title minimize={minimize}>
        <Link to="/">
          {siteTitle.split(' ').map((part, idx) => (
            <span key={`${part}${idx}`}>{part}</span>
          ))}
        </Link>
      </Title>
      <Nav items={data.pages.nodes} minimize={minimize} />
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

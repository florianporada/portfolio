import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useScrollData } from 'scroll-data-hook';

import { colors } from '../constants';
import Nav from './nav';

const fadeOutIn = keyframes`
  0% { opacity: 1 }
  80% { opacity: 0 }
  100% { opacity: 1 }
`;

const HeaderWrapper = styled.header`
  background: transparent;
  left: 0;
  padding: 30px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
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
    transition: width 0.5s ease-out 0.2s;
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
  transition: font-size 0.5s ease-out 0.5s, transform 0.5s ease 0.5s,
    margin-left 0.5s ease-out 0.5s;

  a {
    display: inline-block;
    transform: translateX(-50%);
    transition: transform 0.5s ease 0.5s;
  }

  ${(props) =>
    props.minimize &&
    css`
      transform: translateX(0);
      font-size: 1rem;
      transition-delay: 0;
      margin-left: -30px;
      // animation: ${fadeOutIn} 0.5s ease 1 0.5s;

      a {
        transform: translateX(0);
        flex-direction: column;
        display: ${(props) =>
          props.textLayout === 'row' ? 'inline-block' : 'flex'}
      }
    `}
`;

const Header = ({ siteTitle }) => {
  const { position } = useScrollData();
  const [textLayout, setTextLayout] = useState('row');
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

  useEffect(() => {
    let timer;

    if (minimize) {
      timer = setTimeout(() => {
        setTextLayout('column');
      }, 1000);
    } else {
      setTextLayout('row');
    }

    return () => clearTimeout(timer);
  }, [minimize]);

  return (
    <HeaderWrapper minimize={minimize}>
      <Title minimize={minimize} textLayout={textLayout}>
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

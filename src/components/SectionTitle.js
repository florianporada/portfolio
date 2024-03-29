import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, breakpoints } from '../constants';
import Link from './Link';

const TitleWrapper = styled.h2`
  font-size: 4rem;
  margin-left: 85px;
  margin-right: 15px;
  transition: margin 0.25s ease;

  &::after {
    content: '';
    display: block;
    height: 10px;
    width: 0;
    background: ${(props) => (props.invert ? colors.PRIMARY : colors.PRIMARY)};
    position: absolute;
    margin-left: 0;
    margin-top: -0.2em;
    z-index: 2;
    transition: width 0.25s ease, margin-left 0.25s ease;
  }

  &:hover {
    margin-left: 90px;

    &::after {
      margin-left: -5px;
      width: calc(100vw - 100px);
    }
  }

  a {
    color: ${(props) => (props.invert ? colors.BACKGROUND : colors.TEXT)};

    &::after {
      display: none;
    }
  }

  @media (max-width: ${breakpoints.MD}px) {
    font-size: 3rem;
    margin-left: 15px;

    &:hover {
      margin-left: 20px;

      &::after {
        width: calc(100vw - 30px);
      }
    }
  }

  @media (max-width: ${breakpoints.SM}px) {
    font-size: 2rem;

    &::after {
      margin-left: 0;
    }

    &:hover {
      margin-left: 10px;

      &::after {
        width: 90%;
      }
    }
  }
`;

function Title({ children, id, ...props }) {
  const anchor = children.split(' ').join('_') || id;

  return (
    <TitleWrapper id={anchor} {...props}>
      <Link to={`#${anchor}`}>{children}</Link>
    </TitleWrapper>
  );
}

Title.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
};

Title.defaultProps = {
  children: '',
  id: '',
};

export default Title;

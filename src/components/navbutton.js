import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../constants';

const ButtonWrapper = styled.div`
  height: 31px;
  width: 60px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) =>
    props.position === 'center' &&
    css`
      align-self: center;
      top: 101px;
      margin-top: ${(props) => {
        return props.minimize ? '0' : '16px';
      }};
      height: ${(props) => {
        return props.minimize ? '0' : '31px';
      }};
      transition: height 0.2s ease, margin-top 0.2s ease;
      transition-delay: ${(props) => {
        return props.minimize ? '0' : '0.5s';
      }};
    `}

  ${(props) =>
    props.position === 'left' &&
    css`
      bottom: 0;
      padding-bottom: 14px;
      left: ${(props) => {
        return props.minimize ? '0' : '-60px';
      }};
      transition: left 0.2s ease 0.4s;
    `}

  &:hover {
    cursor: pointer;
  }
`;

const Bar = styled.span`
  height: 3px;
  width: 100%;
  background-color: ${colors.TEXT};
  display block
`;

const NavButton = (props) => {
  const bars = [];

  for (let i = 0; i < props.bars; i++) {
    bars.push(<Bar key={i} />);
  }

  return <ButtonWrapper {...props}>{bars.map((bar) => bar)}</ButtonWrapper>;
};

NavButton.propTypes = {
  bars: PropTypes.number,
  position: PropTypes.string,
};

NavButton.defaultProps = {
  bars: 3,
  position: 'center',
};

export default NavButton;

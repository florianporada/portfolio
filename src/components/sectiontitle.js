import styled from 'styled-components';

import { colors } from '../constants';

const Title = styled.h2`
  font-size: 6rem;
  margin-left: 5px;
  transition: margin 250ms ease-out;
  color: ${(props) => (props.invert ? colors.BACKGROUND : colors.TEXT)};

  &::after {
    content: '';
    display: block;
    height: 10px;
    width: 0;
    background: ${(props) => (props.invert ? colors.BACKGROUND : colors.TEXT)};
    position: absolute;
    margin-left: 120px;
    margin-top: -30px;
    z-index: 2;
    transition: width 250ms ease-out;
  }

  &:hover {
    margin-left: 10px;

    &::after {
      width: 70%;
    }
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 320px) {
    font-size: 3rem;

    &::after {
      margin-left: 0;
      margin-top: -20px;
    }

    &:hover {
      margin-left: 10px;

      &::after {
        width: 90%;
      }
    }
  }
`;

Title.propTypes = {};

Title.defaultProps = {};

export default Title;

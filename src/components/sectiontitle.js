import styled from 'styled-components';

import { colors } from '../constants';

const Title = styled.h2`
  font-size: 6rem;
  color: ${(props) => (props.invert ? colors.BACKGROUND : colors.TEXT)};
  margin-left: 15px;
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
    margin-left: 20px;

    &::after {
      margin-left: -5px;
      width: calc(100vw - 30px);
    }
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 320px) {
    font-size: 3rem;

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

Title.propTypes = {};

Title.defaultProps = {};

export default Title;

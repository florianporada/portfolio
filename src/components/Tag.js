import styled from 'styled-components';

import { colors, fonts, sizes } from '../constants';

const Tag = styled.span`
  display: inline-block;
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  padding: 10px;
  margin: 2.5px;
  font-size: ${sizes.FONT_SM};
  font-family: ${fonts.HIGHLIGHT};
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:first-of-type {
    margin-left: 0;
  }
`;

export default Tag;

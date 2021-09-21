import styled from 'styled-components';

import { colors, sizes } from '../constants';

const Tag = styled.span`
  display: inline-block;
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  padding: 10px;
  margin: 2.5px;
  font-size: ${sizes.FONT_SM};
  font-family: 'Suprapower';
  transition: all 0.25s ease;

  &:hover {
    background-color: ${colors.PRIMARY};
    color: ${colors.TEXT};
  }

  &:first-of-type {
    margin-left: 0;
  }
`;

export default Tag;

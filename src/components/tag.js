import styled from 'styled-components';
import { colors } from '../constants';

const Tag = styled.span`
  display: inline-block;
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  padding: 5px;
  margin: 2.5px;
  font-size: 0.8rem;
  line-height: 1.75rem;
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

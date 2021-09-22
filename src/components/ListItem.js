import styled from 'styled-components';

import { colors } from '../constants';

const ListItem = styled.a`
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  font-size: 2.75rem;
  padding: 15px;
  transition: background-color 0.25s ease, color 0.25s ease;

  &:hover {
    background-color: ${colors.PRIMARY};
    color: ${colors.TEXT};
  }

  &::after {
    display: none;
  }
`;

export default ListItem;

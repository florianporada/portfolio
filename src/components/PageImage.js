import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

import { breakpoints } from '../constants';

const PageImage = styled(GatsbyImage)`
  flex-shrink: 0;
  margin-bottom: 40px;
  max-width: 800px;
  transition: all 0.25s ease;
  width: 85%;

  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: ${breakpoints.MD}px) {
  }
`;

export default PageImage;

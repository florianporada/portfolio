import styled from 'styled-components';
import { breakpoints } from '../constants';

const PageContent = styled.div`
  margin-top: 50px;

  pre,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-left: 150px;
  }

  span.full-size {
    p > img,
    span.gatsby-resp-image-wrapper {
      width: calc(100% + 150px);
      margin-left: -150px !important;
      max-width: unset !important;
    }
  }

  @media (max-width: ${breakpoints.MD}px) {
    pre,
    h3,
    h4,
    h5,
    h6,
    p {
      margin-left: 0;
    }

    span.full-size {
      p > img,
      span.gatsby-resp-image-wrapper {
        width: 100%;
        margin-left: auto !important;
        max-width: unset;
      }
    }
  }

  .gatsby-resp-image-wrapper {
  }
`;

export default PageContent;

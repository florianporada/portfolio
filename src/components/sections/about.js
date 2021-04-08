import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
// import { colors } from '../../constants';
// import Img from 'gatsby-image';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 15px;
`;

const Intro = styled.h3`
  font-size: 1.75rem;
  margin-top: -100px;
`;

const Content = styled.div`
  max-width: 992px;
  font-size: 1.75rem;
  margin-top: 30px;
`;

const About = ({ data }) => {
  return (
    <Wrapper>
      <Intro>{data.frontmatter.description}</Intro>
      {/* <Img fluid={data.frontmatter.featuredimage.childImageSharp.fluid} /> */}
      <Content dangerouslySetInnerHTML={{ __html: data.html }} />
    </Wrapper>
  );
};

About.propTypes = {
  data: PropTypes.object,
};

About.defaultProps = {};

export default About;

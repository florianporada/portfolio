import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants';
import Img from 'gatsby-image';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const Intro = styled.h3`
  font-size: 1.75em;
  margin-top: -100px;
`;

const About = ({ data }) => {
  return (
    <Wrapper>
      <Intro>{data.frontmatter.short}</Intro>
      {/* <Img fluid={data.frontmatter.featuredimage.childImageSharp.fluid} /> */}
    </Wrapper>
  );
};

About.propTypes = {
  data: PropTypes.object,
};

About.defaultProps = {};

export default About;

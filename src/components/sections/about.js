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

const About = ({ data }) => {
  return (
    <Wrapper>
      <Img fluid={data.frontmatter.featuredimage.childImageSharp.fluid} />
      <h3>{data.frontmatter.short}</h3>
    </Wrapper>
  );
};

About.propTypes = {
  data: PropTypes.object,
};

About.defaultProps = {};

export default About;

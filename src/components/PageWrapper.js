import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Spring, animated } from 'react-spring';
import { TransitionState } from 'gatsby-plugin-transition-link';

import SEO from './Seo';

const PageWrapper = styled(animated.div)`
  ${(props) =>
    !props.full &&
    css`
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      max-width: 992px;
      min-height: 100vh;
      padding: 150px 15px 15px 15px;
      position: relative;
    `}
`;

const Wrapper = ({ children, full, className, style, title }) => {
  return (
    <TransitionState>
      {({ mount, transitionStatus }) => {
        return (
          <>
            <SEO
              title={title}
              noscript={[
                {
                  innerHTML:
                    '<meta http-equiv="refresh" content="1;url=simpleversion" />',
                },
              ]}
            />
            <Spring
              opacity={
                ['entering', 'entered'].includes(transitionStatus) ? 1 : 0
              }
            >
              {(styles) => (
                <PageWrapper
                  full={full ? 1 : 0}
                  className={className}
                  style={{ ...style, ...styles }}
                >
                  {children}
                </PageWrapper>
              )}
            </Spring>
          </>
        );
      }}
    </TransitionState>
  );
};

Wrapper.propTypes = {
  data: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  full: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
};

export default Wrapper;

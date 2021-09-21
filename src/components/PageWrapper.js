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
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 15px 15px 15px;
      line-height: 1.1;
      max-width: 992px;
      margin: 0 auto;
    `}
`;

const Wrapper = ({ children, full, className }) => {
  return (
    <TransitionState>
      {({ mount, transitionStatus, ...props }) => {
        return (
          <>
            <SEO
              title={'s'}
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
                  style={styles}
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
};

export default Wrapper;

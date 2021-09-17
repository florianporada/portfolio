import React from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import { TransitionState } from 'gatsby-plugin-transition-link';

// In a component that wraps your page contents
export default function TransitionWrapper({ children }) {
  // We're using the TransitionState component here to provide the current transition status to our pose
  return (
    <TransitionState>
      {({ mount, transitionStatus, ...props }) => {
        console.log(transitionStatus, props);
        return (
          <Spring
            opacity={['entering', 'entered'].includes(transitionStatus) ? 1 : 0}
          >
            {(styles) => <animated.div style={styles}>{children}</animated.div>}
          </Spring>
        );
      }}
    </TransitionState>
  );
}

TransitionWrapper.propTypes = {
  children: PropTypes.object,
};

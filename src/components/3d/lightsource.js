import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

import { useFrame } from 'react-three-fiber';

function Light(props) {
  const light = useRef();
  const mode = useRef(props.mode);

  useEffect(() => {
    if (isMobile) {
      mode.current = 'moving';
    }
  }, [mode]);

  useFrame(({ mouse, ...state }) => {
    if (mode.current === 'moving') {
      light.current.position.x += Math.sin(state.clock.getElapsedTime()) * 0.5;
      light.current.intensity = 3;
    } else if (mode.current === 'mouse') {
      light.current.position.x = mouse.x * 10;
      light.current.position.y = mouse.y * 10;
      light.current.position.z = -50;
      light.current.intensity = 4 - Math.abs(mouse.x);
    } else {
      light.current.intensity = 3;
    }
  });

  return <pointLight ref={light} {...props} />;
}

Light.propTypes = {
  mode: PropTypes.string,
};

Light.defaultProps = {
  mode: 'mouse',
};

export default Light;

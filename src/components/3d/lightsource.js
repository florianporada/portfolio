import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

import { useFrame } from 'react-three-fiber';

function Light(props) {
  const light = useRef();
  const mode = useRef(props.mode);
  let step = 0.6;

  useEffect(() => {
    if (isMobile) {
      mode.current = 'moving';
    }
  }, [mode]);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ mouse, ...state }) => {
    if (mode.current === 'moving') {
      light.current.position.x += step;
      light.current.intensity = 2;

      if (light.current.position.x >= 100) {
        step = step * -1;
      }

      if (light.current.position.x <= -100) {
        step = Math.abs(step);
      }
    } else if (mode.current === 'mouse') {
      light.current.position.x = mouse.x * 10;
      light.current.position.y = mouse.y * 10;
      light.current.position.z = 10;
      light.current.intensity = 2 - Math.abs(mouse.x);
    } else {
      light.current.intensity = 2;
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

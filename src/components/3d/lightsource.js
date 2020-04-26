import React, { useRef } from 'react';

import { useFrame } from 'react-three-fiber';

function Box(props) {
  const light = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ mouse }) => {
    light.current.position.x = mouse.x * 10;
    light.current.position.y = mouse.y * 10;
    light.current.position.z = 10;
    light.current.intensity = 2 - Math.abs(mouse.x);
  });

  return <pointLight ref={light} />;
}

export default Box;

import React, { useRef } from 'react';

import { useFrame, Dom } from 'react-three-fiber';
import { colors } from '../../constants';

function Loading(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.y += 0.1));

  return (
    <group>
      <Dom center className="loading">
        {'Loading...'}
      </Dom>
      <mesh {...props} ref={mesh}>
        <boxBufferGeometry attach="geometry" args={[0.5, 2, 0.75]} />
        <meshStandardMaterial
          attach="material"
          color={colors.TEXT}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

export default Loading;

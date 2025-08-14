// components/ReactLogo.jsx

import React, { useRef } from 'react'
import { Float, useGLTF } from '@react-three/drei'

export function ReactLogo(props) {
  // Destructure isInteractive from props, and collect other props with restProps
  const { isInteractive, ...restProps } = props;

  const { nodes, materials } = useGLTF('/models/react.glb')

  // Define the core content of the React logo (the mesh and its group)
  // This content will be rendered whether Float is active or not.
  const logoContent = (
    // The position prop from the parent (e.g., sizes.reactLogoPosition)
    // will be applied to this outermost group.
    <group {...restProps} dispose={null} scale={0.4}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['React-Logo_Material002_0'].geometry}
        material={materials['Material.002']}
        position={[0, 0.079, 0.181]} // These are positions relative to the parent group
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.392, 0.392, 0.527]}
      />
    </group>
  );

  // Conditionally render the Float wrapper based on isInteractive
  return isInteractive ? (
    <Float floatIntensity={1} speed={1.5}> {/* You can adjust speed/intensity here */}
      {logoContent}
    </Float>
  ) : (
    // If not interactive, just render the static content
    logoContent
  );
}

useGLTF.preload('/models/react.glb')

export default ReactLogo;
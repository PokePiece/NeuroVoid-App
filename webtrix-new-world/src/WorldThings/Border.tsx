// src/components/WorldThings/Border.tsx

import React from 'react'
import { RigidBody } from '@react-three/rapier'

type Props = {
  size?: number
  height?: number
  thickness?: number
  groundY?: number
}

const Border: React.FC<Props> = ({
  size = 100,
  height = 3,
  thickness = 1,
  groundY = -2,
}) => {
  const half = size / 2
  const centerY = groundY + height / 2

  return (
    <>
      {/* Front wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, centerY, -half]}>
        <mesh>
          <boxGeometry args={[size, height, thickness]} />
          <meshStandardMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </RigidBody>

      {/* Back wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, centerY, half]}>
        <mesh>
          <boxGeometry args={[size, height, thickness]} />
          <meshStandardMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </RigidBody>

      {/* Left wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[-half, centerY, 0]}>
        <mesh>
          <boxGeometry args={[thickness, height, size]} />
          <meshStandardMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </RigidBody>

      {/* Right wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[half, centerY, 0]}>
        <mesh>
          <boxGeometry args={[thickness, height, size]} />
          <meshStandardMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Border

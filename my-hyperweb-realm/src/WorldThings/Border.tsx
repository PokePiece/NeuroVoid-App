// src/components/WorldThings/Border.tsx

import React from 'react'
import { RigidBody } from '@react-three/rapier'

type Props = {
  size?: number
  height?: number
  thickness?: number
  groundY?: number
  debug?: boolean
}

const Border: React.FC<Props> = ({
  size = 100,
  height = 10,
  thickness = 1,
  groundY = -2,
  debug = false,
}) => {
  const half = size / 2
  const centerY = groundY + height / 2

  return (
    <>
      <RigidBody type="fixed" colliders="cuboid" position={[0, centerY, -half]} restitution={0.5}>
        <mesh visible={debug}>
          <boxGeometry args={[size, height, thickness]} />
          <meshStandardMaterial color="hotpink" transparent opacity={0.25} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid" position={[0, centerY, half]}>
        <mesh visible={debug}>
          <boxGeometry args={[size, height, thickness]} />
          <meshStandardMaterial color="hotpink" transparent opacity={0.25} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid" position={[-half, centerY, 0]}>
        <mesh visible={debug}>
          <boxGeometry args={[thickness, height, size]} />
          <meshStandardMaterial color="hotpink" transparent opacity={0.25} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid" position={[half, centerY, 0]}>
        <mesh visible={debug}>
          <boxGeometry args={[thickness, height, size]} />
          <meshStandardMaterial color="hotpink" transparent opacity={0.25} />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Border
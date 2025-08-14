import { RigidBody } from '@react-three/rapier'
import React from 'react'

const Lightsaber = ({ color }: { color: string }) => {
  return (
    <RigidBody gravityScale={0}>
      <group>
        <mesh>
          <capsuleGeometry args={[0.1, 2.5, 4]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </RigidBody>
  )
}

export default Lightsaber

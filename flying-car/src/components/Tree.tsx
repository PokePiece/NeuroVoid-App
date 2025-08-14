import { RigidBody } from '@react-three/rapier'
import React from 'react'

export default function Tree() {
    return (
        <RigidBody>
            <group position={[1, 0, -5]}>
                <mesh>
                    <coneGeometry args={[1, 3, 10]} />
                    <meshBasicMaterial color="green" />
                </mesh>
            </group>
        </RigidBody>
    )
}

import { RigidBody } from '@react-three/rapier'
import React from 'react'

const Environment = () => {
    return (
        <RigidBody>
            <group>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[75, 75]} />
                    <meshBasicMaterial color='black' />
                </mesh>
            </group>
        </RigidBody>
    )
}

export default Environment
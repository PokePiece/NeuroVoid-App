import { RigidBody } from '@react-three/rapier'
import React from 'react'

const Ground = () => {
    return (
        <RigidBody type="fixed" colliders="trimesh">
            <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <mesh receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#3b5323" />
                </mesh>
            </group>
        </RigidBody>
    )
}

export default Ground

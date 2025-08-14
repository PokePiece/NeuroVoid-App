import { RigidBody } from '@react-three/rapier'
import React from 'react'

const Shop = () => {
    return (
        <RigidBody type="fixed">
            <group position={[10, -1.5, 5]}>
                {/* Main building */}
                <mesh>
                    <boxGeometry args={[4, 3, 4]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
                {/* Roof */}
                <mesh position={[0, 2, 0]}>
                    <coneGeometry args={[3, 1, 4]} />
                    <meshStandardMaterial color="#654321" />
                </mesh>
                {/* Sign */}
                <mesh position={[0, 1.5, 2.1]}>
                    <planeGeometry args={[2, 1]} />
                    <meshStandardMaterial color="#FFD700" />
                </mesh>
            </group>
        </RigidBody>
    )
}

export default Shop

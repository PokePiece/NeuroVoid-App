import { RigidBody } from '@react-three/rapier'
import React from 'react'

const Ground = () => {
    return (
        <RigidBody type="fixed" colliders="trimesh">
            <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                {/* Large wooden plank floor */}
                <mesh receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial
                        color="#b08968"
                        roughness={0.8}
                        metalness={0.1}
                    />
                </mesh>
            </group>
        </RigidBody>
    )
}

export default Ground

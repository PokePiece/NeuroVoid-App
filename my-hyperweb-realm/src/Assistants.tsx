import { RigidBody } from '@react-three/rapier'
import React from 'react'

const Assistants = () => {
    return (
        <RigidBody enabledRotations={[false, false, false]}>
            <group position={[0, 0, 5]}>
                <mesh>
                    <capsuleGeometry args={[1, 2, 1]} />
                    <meshBasicMaterial color='yellow' />
                </mesh>
            </group>
        </RigidBody>
    )
}

export default Assistants
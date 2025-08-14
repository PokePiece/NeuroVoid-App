import { RigidBody } from '@react-three/rapier'
import React from 'react'

const FallingSpheres = () => {
    return (
        <group position={[5, 5, 0]}>
            <RigidBody>
                <mesh position={[10,50,16]}>
                    <sphereGeometry args={[10, 10, 10,]} />
                    <meshBasicMaterial color='blue' />
                </mesh>
            </RigidBody>
            <RigidBody>
                <mesh position={[2,4,0]}>
                    <sphereGeometry args={[1, 1, 1,]} />
                    <meshBasicMaterial color='blue' />
                </mesh>
            </RigidBody>
            <RigidBody>
                <mesh position={[2,4,3]}>
                    <sphereGeometry args={[1, 1, 1,]} />
                    <meshBasicMaterial color='purple' />
                </mesh>
            </RigidBody>
            <RigidBody>
                <mesh position={[5,1,0]}>
                    <sphereGeometry args={[1, 1, 1,]} />
                    <meshBasicMaterial color='green' />
                </mesh>
            </RigidBody>
        </group>
    )
}

export default FallingSpheres
import React from 'react'

const Desk = () => {



    return (
        <group position={[0, 1, 12]}>
            <mesh>
                <boxGeometry args={[4, 0.5, 7]} />
                <meshBasicMaterial color='#bb5432' />
            </mesh>
            <mesh position={[1.8, -0.6, 3.1]}>
                <boxGeometry args={[0.3, 1.2, 0.3]} />
                <meshBasicMaterial color='#75321c' />
            </mesh>
            <mesh position={[-1.6, -0.6, 3.1]}>
                <boxGeometry args={[0.3, 1.2, 0.3]} />
                <meshBasicMaterial color='#75321c' />
            </mesh>
            <mesh position={[-1.6, -0.6, -3.2]}>
                <boxGeometry args={[0.3, 1.2, 0.3]} />
                <meshBasicMaterial color='#75321c' />
            </mesh>
            <mesh position={[1.8, -0.6, -3.2]}>
                <boxGeometry args={[0.3, 1.2, 0.3]} />
                <meshBasicMaterial color='#75321c' />
            </mesh>
        </group>
    )
}

export default Desk
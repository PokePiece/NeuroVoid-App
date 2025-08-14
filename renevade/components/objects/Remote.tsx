import React from 'react'

const Remote = ({setScreen}:{setScreen:React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <group position={[1, 1.3, 10]} rotation={[0, 1.6, 0]} onClick={() => setScreen(prev => !prev)}>
            <mesh>
                <boxGeometry args={[0.5, 0.1, 1]} />
                <meshBasicMaterial color='black' />
            </mesh>
            <mesh position={[0,0.05,0]} onClick={() => setScreen(prev => !prev)}>
                <boxGeometry args={[0.1, 0.05, 0.1]} />
                <meshBasicMaterial color='red' />
            </mesh>
        </group>
    )
}

export default Remote
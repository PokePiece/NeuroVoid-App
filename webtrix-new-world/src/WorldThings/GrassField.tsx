import React from 'react'

const GrassField = () => {
    const blades = []
    for (let i = 0; i < 200; i++) {
        blades.push(
            <mesh
                key={i}
                position={[
                    (Math.random() - 0.5) * 80,
                    -1.9,
                    (Math.random() - 0.5) * 80
                ]}
                rotation={[0, Math.random() * Math.PI, 0]}
            >
                <boxGeometry args={[0.05, 0.5, 0.05]} />
                <meshStandardMaterial color="#4CAF50" />
            </mesh>
        )
    }
    return <>{blades}</>
}

export default GrassField

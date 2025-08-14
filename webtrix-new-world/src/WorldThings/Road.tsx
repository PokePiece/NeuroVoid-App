import React from 'react'

const Road = () => {
    return (
        <mesh position={[0, -1.99, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[80, 4]} />
            <meshStandardMaterial color="#4d4d4d" />
        </mesh>
    )
}

export default Road

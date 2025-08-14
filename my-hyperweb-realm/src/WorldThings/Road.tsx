import React from 'react'

const Road = () => {
    return (
        <mesh position={[0, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 6]} />
            <meshStandardMaterial
                color="crimson"
                roughness={0.8}
                metalness={0.05}
            />
        </mesh>
    )
}

export default Road

import React from 'react'

const GrassField = () => {
    const tiles = []
    const tileSize = 2
    const halfWorld = 50 // half of your 100x100 house

    for (let x = -halfWorld; x < halfWorld; x += tileSize) {
        for (let z = -halfWorld; z < halfWorld; z += tileSize) {
            tiles.push(
                <mesh
                    key={`${x},${z}`}
                    position={[x + tileSize / 2, -1.99, z + tileSize / 2]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <planeGeometry args={[tileSize, tileSize]} />
                    <meshStandardMaterial
                        color={(x + z) % 4 === 0 ? '#b08d57' : '#a67b5b'}
                        roughness={0.9}
                        metalness={0.05}
                    />
                </mesh>
            )
        }
    }

    return <>{tiles}</>
}

export default GrassField

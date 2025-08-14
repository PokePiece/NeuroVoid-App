import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Waterfall = () => {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            // Make it shimmer by changing blue value over time
            const t = state.clock.getElapsedTime()
            const mat = meshRef.current.material as THREE.MeshStandardMaterial
            mat.color.setHSL(0.55, 0.8, 0.5 + Math.sin(t * 3) * 0.05)
        }
    })

    return (
        <group position={[-20, -1.5, -30]}>
            <mesh ref={meshRef}>
                <boxGeometry args={[10, 15, 1]} />
                <meshStandardMaterial color="#00BFFF" transparent opacity={0.7} />
            </mesh>
        </group>
    )
}

export default Waterfall

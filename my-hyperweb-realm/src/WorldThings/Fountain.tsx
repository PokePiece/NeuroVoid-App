import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Fountain = () => {
    const waterRef = useRef<THREE.Mesh>(null)
    const jetsRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Shimmer water color
        if (waterRef.current) {
            const mat = waterRef.current.material as THREE.MeshStandardMaterial
            mat.color.setHSL(0.55, 0.8, 0.5 + Math.sin(t * 3) * 0.05)
        }

        // Animate water jets up/down slightly
        if (jetsRef.current) {
            jetsRef.current.children.forEach((jet, i) => {
                const phase = i * 0.5
                jet.position.y = 1.5 + Math.sin(t * 4 + phase) * 0.5
            })
        }
    })

    return (
        <group position={[-20, -1.5, -25]}>
            {/* Base of the fountain */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[5, 5, 1, 32]} />
                <meshStandardMaterial color="#8B8680" roughness={0.9} />
            </mesh>

            {/* Water surface */}
            <mesh ref={waterRef} position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[4.8, 32]} />
                <meshStandardMaterial color="#00BFFF" transparent opacity={0.7} />
            </mesh>

            {/* Water jets */}
            <group ref={jetsRef}>
                {[...Array(5)].map((_, i) => (
                    <mesh key={i} position={[Math.cos((i / 5) * Math.PI * 2) * 2, 1.5, Math.sin((i / 5) * Math.PI * 2) * 2]}>
                        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
                        <meshStandardMaterial color="#00BFFF" transparent opacity={0.8} />
                    </mesh>
                ))}
            </group>
        </group>
    )
}

export default Fountain

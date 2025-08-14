import { Text } from '@react-three/drei'
import { Suspense } from 'react'

export default function InfoText() {
    return (
        <Suspense fallback={null}>
            <group position={[0, 3.5, 0]}>
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[12, 3.5]} />
                    <meshBasicMaterial color="#000000cc" /> {/* semi-transparent black */}
                </mesh>
                <Text
                    position={[0, 1, 0]}
                    fontSize={1}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Renevade
                </Text>

                <Text
                    position={[0, 0, 0]}
                    fontSize={0.8}
                    color="#236E79"
                    anchorX="center"
                    anchorY="middle"
                >
                    Real Renegade Renovation
                </Text>

                <Text
                    position={[0, -0.8, 0]}
                    fontSize={0.5}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Bridge the gap between systems.
                </Text>
            </group>
        </Suspense >
    )
}






// onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
// onPointerOut={(e) => (document.body.style.cursor = 'default')}
// onClick={() => window.open('https://localhost)} 
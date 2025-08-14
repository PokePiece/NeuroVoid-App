import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface VoidTerminalProps {
    showVoidOverlay: boolean
    setShowVoidOverlay: React.Dispatch<React.SetStateAction<boolean>>
    setShowVoidInfo: React.Dispatch<React.SetStateAction<boolean>>
    setIsChatting: React.Dispatch<React.SetStateAction<boolean>>
}

export default function VoidTerminal({ setIsChatting, showVoidOverlay, setShowVoidOverlay, setShowVoidInfo }: VoidTerminalProps) {
    const compRef = useRef<THREE.Group>(null)
    //const screenTexture = useTexture('/google.png') 


    const handleClick = () => {
        setShowVoidOverlay(prev => !prev)
        setIsChatting(prev => !prev)
        console.log('setting void overlay')
    }
//a half-truth is the worst of lies
//he who serves himself is worse than satan or god
//this therefore proposes a unity between god and satan to defeat their biggest enemy 
//as humanity began with betrayal,
//it will end with one.
    return (
        <group
            ref={compRef}
            position={[10, 0, 8]}
            rotation={[0, 5, 0]}
            onClick={handleClick}
            onContextMenu={(e) => {
                e.stopPropagation();
                setShowVoidInfo(prev => !prev)
            }}
        >
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[2, 1.5, 0.2]} />
                <meshStandardMaterial color="black" />
            </mesh>

            <mesh position={[0, 2, 0.11]} onClick={handleClick}>
                <planeGeometry args={[1.6, 1.2]} />
                <Text fontSize={0.2} position={[0, 0, 0.01]}>
                    Void Terminal
                </Text>
                <meshStandardMaterial color="lightblue" />
            </mesh>

            <mesh position={[0, 1.1, 0]}>
                <boxGeometry args={[0.2, 0.3, 0.2]} />
                <meshStandardMaterial color="gray" />
            </mesh>

            <mesh position={[0, 0.9, 0]}>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshStandardMaterial color="gray" />
            </mesh>

            <mesh position={[0, 0.5, 1]}>
                <boxGeometry args={[2, 0.1, 1]} />
                <meshStandardMaterial color="#222" />
            </mesh>
        </group>
    )
}



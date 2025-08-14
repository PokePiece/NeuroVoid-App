import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LaptopProps {
    setShowLaptopOverlay: React.Dispatch<React.SetStateAction<boolean>>
    setIsChatting: React.Dispatch<React.SetStateAction<boolean>>
    showLaptopOverlay: boolean
    setShowLaptopInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const Laptop = ({ setShowLaptopInfo, showLaptopOverlay, setIsChatting, setShowLaptopOverlay }: LaptopProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Group>(null);
    const screenMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

    const [isOpening, setIsOpening] = useState(false);
    const [isPoweredOn, setIsPoweredOn] = useState(false);

    useFrame((state) => {
        if (screenRef.current) {
            const targetRotation = isOpening ? 0 : Math.PI / 2;
            screenRef.current.rotation.x = THREE.MathUtils.lerp(screenRef.current.rotation.x, targetRotation, 0.05);
        }

        if (screenMaterialRef.current) {
            if (isPoweredOn) {
                const pulse = Math.sin(state.clock.elapsedTime * 5) * 0.2 + 0.8;
                screenMaterialRef.current.emissiveIntensity = pulse;
            } else {
                screenMaterialRef.current.emissiveIntensity = 0;
            }
        }
    });

    const handleClick = () => {
        setIsOpening(!isOpening);
        setIsPoweredOn(!isPoweredOn);
        setIsChatting(false)
        if (!isPoweredOn) {
            setShowLaptopOverlay(true);
            
        }
    };

    const handleOpenClick = () => {
        setShowLaptopOverlay(true)
    }

    const handleContextMenu = () => {
        setShowLaptopInfo(prev => !prev)
        setIsPoweredOn(!isPoweredOn)
        setIsOpening(!isOpening);
    }

    return (
        <group ref={groupRef} position={[1, 1.85, 12]} rotation={[0, 1.6, 0]} onContextMenu={handleContextMenu} >
            <group position={[0, -0.5, 0]} onContextMenu={handleContextMenu}>
                <mesh onClick={handleOpenClick} onContextMenu={handleContextMenu} >
                    <boxGeometry args={[2, 0.2, 1.5]} />
                    <meshStandardMaterial color="#444444" roughness={0.6} metalness={0.1} />
                </mesh>
                <mesh position={[0, 0.1, -0.1]} onClick={handleOpenClick} onContextMenu={handleContextMenu} >
                    <boxGeometry args={[1.9, 0.05, 1.3]} />
                    <meshStandardMaterial color="#222222" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.11, 0.5]} onClick={handleOpenClick} onContextMenu={handleContextMenu} >
                    <boxGeometry args={[0.5, 0.05, 0.3]} />
                    <meshStandardMaterial color="#c5bbb8" roughness={0.7} />
                </mesh>
            </group>
            <group position={[0, -0.4, -0.75]} ref={screenRef} rotation={[Math.PI / 2, 0, 0]} onContextMenu={handleContextMenu}>
                <mesh position={[0, 0.8, -0.05]} onClick={handleClick} onContextMenu={handleContextMenu}>
                    <boxGeometry args={[2.05, 1.55, 0.1]} />
                    <meshStandardMaterial color="#333333" roughness={0.5} />
                </mesh>
                <mesh position={[0, 0.8, -0.01]} onContextMenu={handleContextMenu} >
                    <boxGeometry args={[1.9, 1.4, 0.1]} />
                    <meshStandardMaterial
                        ref={screenMaterialRef}
                        color="#000000"
                        emissive="#00ffff"
                        emissiveIntensity={0}
                    />
                </mesh>
            </group>
        </group>
    );
};


export default Laptop;

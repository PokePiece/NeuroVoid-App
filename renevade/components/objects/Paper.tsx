import { Text } from '@react-three/drei'
import React from 'react'

const Paper = ({setShowTailwindPaperOverlay, setIsChatting}: {setIsChatting: React.Dispatch<React.SetStateAction<boolean>>, setShowTailwindPaperOverlay: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const handleClick = () => {
        setShowTailwindPaperOverlay(prev => !prev)
        setIsChatting(true)
    }

    return (
        <>
            <group position={[1, 1.246, 14]} onClick={handleClick}>
                <mesh>
                    <boxGeometry args={[1.3, 0.01, 1]} />
                    <meshBasicMaterial />
                </mesh>

            </group>
            <group rotation={[0, 1.55, 0]} position={[1, 1.246, 14]}>
                <Text position={[0, 0.009, -.2]} rotation={[-1.6,0,0]} fontSize={0.2} color='black'>
                    Tailwind
                </Text>
                <Text position={[0, 0.009, .1]} rotation={[-1.6,0,0]} fontSize={0.2} color='black'>
                    Items
                </Text>
            </group>
        </>
    )
}

export default Paper
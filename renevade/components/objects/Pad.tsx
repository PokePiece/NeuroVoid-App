import { Text } from '@react-three/drei'
import React from 'react'

const Pad = ({ setShowPadInfo, setIsChatting, setShowPadOverlay }: { setShowPadInfo: React.Dispatch<React.SetStateAction<boolean>>, setIsChatting: React.Dispatch<React.SetStateAction<boolean>>, setShowPadOverlay: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const handleClick = () => {
        setIsChatting(prev => !prev)
        setShowPadOverlay(prev => !prev)
    }

    const handleContextMenu = () => {
        setShowPadInfo(prev => !prev)
    }

    return (
        <>
            <group position={[10, 2, 10.5]} rotation={[0, 0.3, -0.5]} onClick={handleClick} onContextMenu={handleContextMenu}>
                <mesh>
                    <boxGeometry args={[0.1, 1.5, 1.3]} />
                    <meshBasicMaterial color='#b3978f' />
                    <Text rotation={[0, 4.7, 0]} fontSize={0.2} position={[-0.06, 0.2, 0]} onClick={handleClick} onContextMenu={handleContextMenu}>
                        Working on
                    </Text>
                    <Text rotation={[0, 4.7, 0]} fontSize={0.2} position={[-0.06, -.1, 0]} onClick={handleClick} onContextMenu={handleContextMenu}>
                        Void
                    </Text>
                    <Text rotation={[0, 4.7, 0]} fontSize={0.2} position={[-0.06, -.4, 0]} onClick={handleClick} onContextMenu={handleContextMenu}>
                        Longevity
                    </Text>
                </mesh>

            </group>
        </>
    )
}

export default Pad
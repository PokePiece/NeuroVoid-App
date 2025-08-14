import { Text } from '@react-three/drei'
import React from 'react'

const Book = ({ setShowBookInfo, setShowBookOverlay, setIsChatting }: { setShowBookOverlay: React.Dispatch<React.SetStateAction<boolean>>, setIsChatting: React.Dispatch<React.SetStateAction<boolean>>, setShowBookInfo: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const handleClick = () => {
        setShowBookOverlay(prev => !prev)
        setIsChatting(true)
    }

    return (
        <>
            <group position={[9, 0.7, 5]} rotation={[0, 0.3, 0]} onClick={handleClick} onContextMenu={() => setShowBookInfo(prev => !prev)}>

                <mesh >
                    <boxGeometry args={[1.8, 0.4, 1.3]} />
                    <meshBasicMaterial color='#544435' />


                </mesh>
                <mesh position={[0.35, 0.1, 0]} onClick={handleClick} onContextMenu={() => setShowBookInfo(prev => !prev)}>
                    <boxGeometry args={[0.2, 0.21, 1.299]} />
                    <meshBasicMaterial color='gold' />
                </mesh>
                <mesh position={[-0.35, 0.10, 0]} onClick={handleClick} onContextMenu={() => setShowBookInfo(prev => !prev)}>
                    <boxGeometry args={[0.2, 0.21, 1.29]} />
                    <meshBasicMaterial color='gold' />
                </mesh>
            </group>
            <group position={[9, 0.91, 5]} rotation={[-.3,.3,-1.5]}>
                <Text rotation={[0, 5, 0]} fontSize={0.45}>
                    Book
                </Text>
            </group>
        </>
    )
}

export default Book
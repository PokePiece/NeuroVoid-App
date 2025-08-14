import { Canvas } from '@react-three/fiber'
import Player from './Player'
import Environment from './Environment'
import { Physics } from '@react-three/rapier'
import { useEffect, useRef } from 'react'

interface MainSceneProps {
    currentAbility: string | null
}

const MainScene = ({currentAbility}:MainSceneProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const handleClick = () => {
            canvasRef.current?.requestPointerLock()
        }
        const canvasElement = canvasRef.current
        canvasElement?.addEventListener('click', handleClick)
        return () => {
            canvasElement?.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <Canvas ref={canvasRef}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.0} castShadow />
            <Physics>
                <Player currentAbility={currentAbility} />
                <Environment />
                {/* Enemy */}
            </Physics>
        </Canvas>
    )
}

export default MainScene

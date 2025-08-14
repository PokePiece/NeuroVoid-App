import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import * as THREE from 'three'
import User from './User'
import World from './World'
import Assistants from './Assistants'

const WebScene = () => {
    return (
        <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
            {/* Camera Controls */}
            <OrbitControls />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[10, 15, 10]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <pointLight position={[0, 10, 0]} intensity={0.5} color="white" />
            <hemisphereLight args={['skyblue', 'brown', 0.3]} />


            {/* Physics World */}
            <Physics>
                <User />
                <World />
                <Assistants />
                
            </Physics>
        </Canvas>
    )
}

export default WebScene

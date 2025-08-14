import { Canvas } from '@react-three/fiber'
import React from 'react'
import Player from './Player'
import Environment from './Environment'
import Enemy from './Enemy'
import { Physics } from '@react-three/rapier'

const LightScene = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
      <Physics>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} />
        <Player />
        <Environment />
        <Enemy />
      </Physics>
    </Canvas>
  )
}

export default LightScene

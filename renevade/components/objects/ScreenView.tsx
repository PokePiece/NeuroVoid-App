import { Html } from '@react-three/drei'
import React from 'react'

const ScreenView = () => {
  return (
    <Html transform position={[5,0,30]} rotation={[0,3,0]} scale={[3,3,3]}>
        <iframe
            src='http://localhost:3002/ships/harrell'
            className='w-full h-full'
        />
    </Html>
  )
}

export default ScreenView
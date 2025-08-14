import React from 'react'
import * as THREE  from 'three'

const CapitalBuilding = () => {
  return (
    <group position={[10,15,90]}>
        <mesh>
            <boxGeometry args={[80,35,80]} />
            <meshBasicMaterial color='red' />
        </mesh>
        <mesh position={[0,35, 0]}>
            <coneGeometry args={[60,35, 60]} />
            <meshBasicMaterial color='blue' />
        </mesh>
    </group>
  )
}

export default CapitalBuilding
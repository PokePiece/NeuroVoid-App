import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { Html } from '@react-three/drei'

// --- Step 1: Simple Building Store ---
const Roofs = {
  'flat-industrial': ({ color }) => (
    <mesh>
      <boxGeometry args={[2, 0.2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  ),
  'billboard-roof': ({ color }) => (
    <mesh>
      <boxGeometry args={[2, 0.2, 2]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      <Html position={[0, 0.5, 0]}>
        <div style={{ background: color, padding: '2px 4px', color: '#fff' }}>Ad</div>
      </Html>
    </mesh>
  )
}

const Walls = {
  'glass-panels': ({ color }) => (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} transparent opacity={0.5} />
    </mesh>
  ),
  'red-brick': ({ color }) => (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// --- Step 2: Simulated AI Output ---
const mockAIResponse = {
  scale: 'large',
  roof: { style: 'billboard-roof', color: '#ff0000' },
  walls: { style: 'glass-panels', color: '#ffffff' },
  extras: [] // not implemented yet
}

// --- Step 3: Building Component ---
const WebsiteBuilding = ({ site, position }) => {
  const { roof, walls } = mockAIResponse
  const RoofComp = Roofs[roof.style]
  const WallsComp = Walls[walls.style]

  return (
    <RigidBody type="fixed" position={position}>
      <group>
        <WallsComp color={walls.color} />
        <group position={[0, 1.1, 0]}>
          <RoofComp color={roof.color} />
        </group>
        <Html position={[0, 2, 0]}>
          <div style={{ color: 'white', fontSize: '12px' }}>{site.name}</div>
        </Html>
      </group>
    </RigidBody>
  )
}

// --- Step 4: Scene Wrapper ---
const SimpleInternetCity = () => {
  const sites = [
    { name: 'YouTube', url: 'https://youtube.com', rank: 2 },
    { name: 'CNN', url: 'https://cnn.com', rank: 15 }
  ]

  return (
    <>
      {sites.map((site, i) => (
        <WebsiteBuilding key={site.name} site={site} position={[i * 4, 0, 0]} />
      ))}
    </>
  )
}

export default SimpleInternetCity

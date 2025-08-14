import { Html } from '@react-three/drei'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const hologramTexts = [
  '🌐 Wikipedia',
  '🤖 OpenAI',
  '📺 YouTube',
  '🎮 Twitch',
  '💾 Archive.org',
  '🔐 Encrypted Node',
  '📡 Data Stream'
]

const randomPosition = (min = 8, max = 18): [number, number, number] => {
  const x = Math.random() * (max * 2) - max
  const y = Math.random() * 5 + 2
  const z = Math.random() * (max * 2) - max
  return [x, y, z]
}

const Holograms: React.FC = () => {
  const panels = useRef<any[]>([])

  useFrame((state) => {
    panels.current.forEach((panel, i) => {
      if (panel) {
        panel.rotation.y += 0.002
        panel.position.y += Math.sin(state.clock.elapsedTime + i) * 0.002
      }
    })
  })

  return (
    <>
      {hologramTexts.map((text, i) => (
        <group
          key={i}
          ref={(el) => (panels.current[i] = el)}
          position={randomPosition()}
        >
          <Html>
            <div className="bg-cyan-500/20 border border-cyan-300/50 backdrop-blur-sm rounded-lg px-4 py-2 text-cyan-200 font-mono shadow-lg animate-pulse">
              {text}
            </div>
          </Html>
        </group>
      ))}
    </>
  )
}

export default Holograms

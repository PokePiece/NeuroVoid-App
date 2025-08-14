import { Html } from "@react-three/drei"
import React, { useState, useEffect } from "react"

const messages = [
  "Scanning environment...",
  "Portal detected ahead.",
  "Caution: energy spike nearby.",
  "Analyzing signal...",
  "Connection to mainframe established.",
  "New objective: explore!"
]

const HoloChat: React.FC = () => {
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setLog(prev => {
        const newMsg = messages[Math.floor(Math.random() * messages.length)]
        return [...prev.slice(-4), newMsg] // keep last 5 messages
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <group position={[2, 2, 0]}>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="cyan" transparent opacity={0.2} />
      </mesh>
      <Html position={[0, 0, 0.05]} transform occlude>
        <div className="w-[180px] h-[120px] bg-cyan-500/20 text-cyan-200 text-xs font-mono p-2 rounded-lg border border-cyan-300">
          {log.map((m, i) => (
            <div key={i}>{m}</div>
          ))}
        </div>
      </Html>
    </group>
  )
}

export default HoloChat

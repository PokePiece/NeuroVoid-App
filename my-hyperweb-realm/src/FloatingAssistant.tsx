// FloatingAssistant.tsx
import { RigidBody } from "@react-three/rapier"
import { Html } from "@react-three/drei"
import React, { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"

const FloatingAssistant: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false)
  const [input, setInput] = useState("")
  const [conversation, setConversation] = useState<string[]>([])
  const meshRef = useRef<any>(null)
  const [bob, setBob] = useState(0)

  // Bobbing + rotation animation (local)
  useFrame((state) => {
    const y = Math.sin(state.clock.elapsedTime) * 0.5
    setBob(y)
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  const sendMessage = async () => {
    if (!input.trim()) return
    setConversation(prev => [...prev, `You: ${input}`])
    try {
      const res = await fetch("http://localhost:8010/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          tone: "realistic",
          style: "technical"
        })
      })
      const data = await res.json()
      setConversation(prev => [...prev, `AI: ${data.response}`])
    } catch (err) {
      console.error("Chat error:", err)
      setConversation(prev => [...prev, "AI: (Error connecting to server)"])
    }
    setInput("")
  }

  return (
    <RigidBody type="kinematicPosition" position={[5, 2, 5]} colliders="ball">
      <mesh
        ref={meshRef}
        position={[0, bob, 0]} // local bobbing offset
        onClick={() => setChatOpen(!chatOpen)}
        castShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="cyan" emissive="blue" emissiveIntensity={0.6} />
        <Html position={[0, 1.5, 0]}>
          <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
            AI Assistant
          </div>
        </Html>
      </mesh>

      {chatOpen && (
        <Html position={[0, 3, 0]}>
          <div className="bg-black/80 p-4 w-64 rounded text-white text-sm flex flex-col">
            <div className="h-32 overflow-y-auto border border-gray-700 p-2 mb-2 rounded">
              {conversation.map((msg, i) => (
                <div key={i} className="mb-1">{msg}</div>
              ))}
            </div>
            <input
              className="w-full p-1 bg-gray-700 text-white rounded"
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 flex-1 px-2 py-1 rounded"
                onClick={sendMessage}
              >
                Send
              </button>
              <button
                className="bg-red-500 flex-1 px-2 py-1 rounded"
                onClick={() => setChatOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Html>
      )}
    </RigidBody>
  )
}


export default FloatingAssistant

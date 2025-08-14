import { RigidBody } from "@react-three/rapier"
import { Html } from "@react-three/drei"
import React, { useState, useMemo, useRef, useEffect } from "react"

interface Site {
  name: string
  url: string
}

const sites: Site[] = [
  { name: "Wikipedia", url: "https://wikipedia.org" },
  { name: "OpenAI", url: "https://openai.com" },
  { name: "YouTube", url: "https://youtube.com" },
  { name: "Twitch", url: "https://twitch.tv" },
  { name: "Terminal", url: '/terminal.html' },
  { name: "Music Mood", url: "/musicmood.html" },
  { name: "Pixel Rows", url: "/pixel.html" },
]

// Position generator
const randomPosition = (
  minDistance = 10,
  maxDistance = 25
): [number, number, number] => {
  let x = 0
  let z = 0
  while (Math.sqrt(x * x + z * z) < minDistance) {
    x = Math.random() * (maxDistance * 2) - maxDistance
    z = Math.random() * (maxDistance * 2) - maxDistance
  }
  const y = Math.random() * 5 + 3 // lift them higher
  return [x, y, z]
}

const Portals: React.FC = () => {
  const [activeSite, setActiveSite] = useState<string | null>(null)
  const [ready, setReady] = useState(false) // prevent instant trigger

  // Generate positions once per site
  const sitePositions = useMemo(() => sites.map(() => randomPosition()), [])

  // Enable collision after short delay
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {sites.map((site, i) => (
        <RigidBody
          colliders="ball"
          position={sitePositions[i]}
          restitution={0.5}
          lockTranslations={false} // allow falling in Y
          lockRotations // stops it from rolling
          onCollisionEnter={({ other }) => {
            if (!ready || activeSite) return
            if (other.rigidBodyObject?.userData?.type !== 'player') return
            setActiveSite(site.url)
          }}
          gravityScale={1} // falls normally
          linearDamping={5} // kills small nudges
        >

          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="hotpink" emissive="purple" />
            <Html position={[0, 1.5, 0]}>
              <div className="text-xs text-white">{site.name}</div>
            </Html>
          </mesh>
        </RigidBody>
      ))}

      {activeSite && (
        <Html fullscreen>
          <div className="absolute inset-0 bg-black/90 flex flex-col">
            <button
              className="bg-red-500 text-white px-4 py-2 text-lg self-end"
              onClick={() => setActiveSite(null)}
            >
              Close
            </button>
            <iframe src={activeSite} className="flex-1 border-none" />
          </div>
        </Html>
      )}
    </>
  )
}

export default Portals

import { useState, useRef, useEffect, type RefObject } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { RapierRigidBody } from "@react-three/rapier"

const PROJECTILE_SPEED = 25
const PROJECTILE_LIFETIME = 2000 // ms

interface ShootingProps {
  playerRef: RefObject<RapierRigidBody | null>
}

export default function Shooting({ playerRef }: ShootingProps) {
  const { camera } = useThree()
  const [projectiles, setProjectiles] = useState<any[]>([])
  const rifleRef = useRef<THREE.Group>(null)

  useEffect(() => {
  const handleClick = () => {
    if (!playerRef?.current) return

    // Get forward direction from camera
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward).normalize()

    // Spawn at camera position
    const origin = new THREE.Vector3()
    camera.getWorldPosition(origin)
    origin.add(forward.clone().multiplyScalar(0.5)) // move slightly in front of camera

    // Add projectile
    setProjectiles(prev => [
      ...prev,
      {
        position: origin.clone(),
        velocity: forward.clone().multiplyScalar(PROJECTILE_SPEED),
        createdAt: Date.now()
      }
    ])
  }

  window.addEventListener("mousedown", handleClick)
  return () => window.removeEventListener("mousedown", handleClick)
}, [camera, playerRef])


  useFrame((_, delta) => {
    setProjectiles((prev) =>
      prev
        .map((proj) => ({
          ...proj,
          position: proj.position.clone().add(proj.velocity.clone().multiplyScalar(delta))
        }))
        .filter((proj) => Date.now() - proj.createdAt < PROJECTILE_LIFETIME)
    )
  })

  return (
    <>
      {/* Rifle model (stays attached to player) */}
      <group ref={rifleRef} position={[0.3, 1.5, -0.5]}>
        <mesh>
          <boxGeometry args={[0.1, 0.1, 0.5]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </group>

      {/* Projectiles */}
      {projectiles.map((proj, i) => (
        <mesh key={i} position={proj.position}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={1} />
        </mesh>
      ))}
    </>
  )
}

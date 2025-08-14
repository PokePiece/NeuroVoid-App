import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import Lightsaber from './Lightsaber'

const Enemy = () => {
  const enemyRef = useRef<THREE.Group>(null)
  const saberPivotRef = useRef<THREE.Group>(null)

  // Swing params
  const swingSpeed = 3 // radians per second

  // State
  const [phase, setPhase] = useState<'waiting' | 'attacking' | 'returning'>('waiting')
  const timer = useRef(Math.random() * 2 + 1) // delay until next attack
  const targetRotation = useRef(new THREE.Euler(0, 0, 0))
  const progress = useRef(0)

  const neutralRotation = new THREE.Euler(0, 0, 0)

  useFrame((_, delta) => {
    if (!saberPivotRef.current) return

    if (phase === 'waiting') {
      timer.current -= delta
      if (timer.current <= 0) {
        // Pick random target rotation (small Y/Z swings, bigger X for forward/back)
        targetRotation.current.set(
          THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3), // X axis
          THREE.MathUtils.randFloat(-Math.PI / 4, Math.PI / 4), // Y axis
          THREE.MathUtils.randFloat(-Math.PI / 6, Math.PI / 6)  // Z axis
        )
        progress.current = 0
        setPhase('attacking')
      }
    }

    else if (phase === 'attacking') {
      progress.current += delta * swingSpeed
      const t = Math.min(progress.current, 1)
      saberPivotRef.current.rotation.set(
        THREE.MathUtils.lerp(neutralRotation.x, targetRotation.current.x, t),
        THREE.MathUtils.lerp(neutralRotation.y, targetRotation.current.y, t),
        THREE.MathUtils.lerp(neutralRotation.z, targetRotation.current.z, t)
      )

      if (t >= 1) {
        progress.current = 0
        setPhase('returning')
      }
    }

    else if (phase === 'returning') {
      progress.current += delta * swingSpeed
      const t = Math.min(progress.current, 1)
      saberPivotRef.current.rotation.set(
        THREE.MathUtils.lerp(targetRotation.current.x, neutralRotation.x, t),
        THREE.MathUtils.lerp(targetRotation.current.y, neutralRotation.y, t),
        THREE.MathUtils.lerp(targetRotation.current.z, neutralRotation.z, t)
      )

      if (t >= 1) {
        timer.current = Math.random() * 2 + 1 // wait 1–3 sec
        setPhase('waiting')
      }
    }
  })

  return (
    <group ref={enemyRef} position={[0, 1, 5]} rotation={[0, -1, 0]}>
      {/* Enemy body */}
      <mesh>
        <capsuleGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Saber pivot */}
      <group position={[-0.5, 1, 0]} ref={saberPivotRef}>
        <group position={[0, 0, -1.25]}>
          <Lightsaber color="green" />
        </group>
      </group>
    </group>
  )
}

export default Enemy

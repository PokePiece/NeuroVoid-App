import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Lightsaber from './Lightsaber'

interface KeyState {
  [key: string]: boolean
}

const Player = () => {
  const playerRef = useRef<THREE.Group>(null)
  const wristRef = useRef<THREE.Group>(null)
  const { camera, gl } = useThree()

  const [keys, setKeys] = useState<KeyState>({})
  const [pointerLocked, setPointerLocked] = useState(false)

  // Velocity for momentum
  const rotationVelocity = useRef(new THREE.Vector2(0, 0))
  const rotationFriction = 0.85 // decay factor per frame

  // Pointer lock setup
  useEffect(() => {
    const canvas = gl.domElement
    const handleClick = () => canvas.requestPointerLock()
    const onPointerLockChange = () => {
      setPointerLocked(document.pointerLockElement === canvas)
    }
    canvas.addEventListener('click', handleClick)
    document.addEventListener('pointerlockchange', onPointerLockChange)
    return () => {
      canvas.removeEventListener('click', handleClick)
      document.removeEventListener('pointerlockchange', onPointerLockChange)
    }
  }, [gl])

  // Key tracking
  useEffect(() => {
    const down = (e: KeyboardEvent) => setKeys((s) => ({ ...s, [e.code]: true }))
    const up = (e: KeyboardEvent) => setKeys((s) => ({ ...s, [e.code]: false }))
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // Mouse movement → velocity instead of direct rotation
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!pointerLocked) return
      rotationVelocity.current.x += e.movementY * 0.001 // up/down
      rotationVelocity.current.y += e.movementX * 0.001 // left/right
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [pointerLocked])

  // Movement & camera
  useFrame((state) => {
  if (!playerRef.current) return

  const speed = 0.1
  const forward = new THREE.Vector3()
  const right = new THREE.Vector3()

  playerRef.current.getWorldDirection(forward)
  forward.y = 0
  forward.normalize()
  right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize()

  if (keys['KeyW']) playerRef.current.position.add(forward.clone().multiplyScalar(speed))
  if (keys['KeyS']) playerRef.current.position.add(forward.clone().multiplyScalar(-speed))
  if (keys['KeyA']) playerRef.current.position.add(right.clone().multiplyScalar(-speed))
  if (keys['KeyD']) playerRef.current.position.add(right.clone().multiplyScalar(speed))

  // Camera follow
  camera.position.copy(playerRef.current.position).add(new THREE.Vector3(2, 1.5, -2))
  const lookTarget = playerRef.current.position.clone().add(forward.clone().setY(1))
  camera.lookAt(lookTarget)

  // Apply saber momentum
  if (wristRef.current) {
    wristRef.current.rotation.x -= rotationVelocity.current.x
    wristRef.current.rotation.y -= rotationVelocity.current.y

    // Apply friction
    rotationVelocity.current.multiplyScalar(rotationFriction)

    // --- Idle sway ---
    const time = state.clock.elapsedTime
    const swayAmount = 0.02
    const swaySpeed = 5
    const isMoving = keys['KeyW'] || keys['KeyA'] || keys['KeyS'] || keys['KeyD']

    if (isMoving) {
      wristRef.current.rotation.z = Math.sin(time * swaySpeed) * swayAmount
    } else {
      wristRef.current.rotation.z *= 0.9 // ease back to neutral
    }
  }
})


  return (
    <group ref={playerRef} position={[0, 1, 0]}>
      {/* Invisible body */}
      <mesh visible={false}>
        <capsuleGeometry args={[0.5, 1, 4]} />
        <meshBasicMaterial color="purple" />
      </mesh>

      {/* Wrist pivot */}
      <group ref={wristRef} position={[0.5, 1, -0.5]}>
        <group position={[0, 0, -1.25]}>
          <Lightsaber color='red' />
        </group>
      </group>
    </group>
  )
}

export default Player

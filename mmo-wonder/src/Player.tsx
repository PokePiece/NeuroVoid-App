import { RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Shooting from './Shooting'

const SPEED = 5
const MOUSE_SENSITIVITY = 0.002

// Tweak these two to taste:
// acceleration: higher = snappier starts/stops; lower = floatier
const ACCEL = 28
// rotationSpeed: higher = faster turn; values ~6-12 feel good
const ROTATION_SPEED = 10

interface PlayerProps {
    currentAbility: string | null
}

const Player = ({currentAbility}:PlayerProps) => {
    const playerRef = useRef<RapierRigidBody | null>(null)
    const keys = useRef<Record<string, boolean>>({})
    const { camera } = useThree()

    // Camera control state
    const yaw = useRef(0)
    const pitch = useRef(0)
    const cameraOffset = new THREE.Vector3(0, 3, 6)
    const cameraLookAt = new THREE.Vector3()

    // Keyboard handlers
    useEffect(() => {
        const kd = (e: KeyboardEvent) => (keys.current[e.code] = true)
        const ku = (e: KeyboardEvent) => (keys.current[e.code] = false)
        window.addEventListener('keydown', kd)
        window.addEventListener('keyup', ku)
        return () => {
            window.removeEventListener('keydown', kd)
            window.removeEventListener('keyup', ku)
        }
    }, [])

    // Mouse look (pointer lock expected)
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (document.pointerLockElement) {
                yaw.current -= e.movementX * MOUSE_SENSITIVITY
                // keep pitch clamped so camera never flips
                pitch.current = Math.max(
                    -Math.PI / 3,
                    Math.min(Math.PI / 3, pitch.current + e.movementY * MOUSE_SENSITIVITY)
                )
            }
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    useFrame((_, delta) => {
        const rb = playerRef.current
        if (!rb) return

        // 1) Get forward/right from actual camera orientation
        const camForward = new THREE.Vector3()
        camera.getWorldDirection(camForward)
        camForward.y = 0
        camForward.normalize()

        const camRight = new THREE.Vector3()
        camRight.crossVectors(camForward, new THREE.Vector3(0, 1, 0)).normalize()

        // 2) Read input and build desired direction
        const inputF = (keys.current['KeyW'] ? 1 : 0) - (keys.current['KeyS'] ? 1 : 0)
        const inputR = (keys.current['KeyD'] ? 1 : 0) - (keys.current['KeyA'] ? 1 : 0)

        let moving = false
        const desiredDir = new THREE.Vector3()
        if (inputF !== 0 || inputR !== 0) {
            desiredDir.addScaledVector(camForward, inputF)
            desiredDir.addScaledVector(camRight, inputR)
            if (desiredDir.lengthSq() > 0.0001) {
                desiredDir.normalize()
                moving = true
            }
        }

        // 3) Smooth velocity towards target
        const currentLin = rb.linvel()
        const currentVel = new THREE.Vector3(currentLin.x, currentLin.y, currentLin.z)
        const targetVel = new THREE.Vector3(
            moving ? desiredDir.x * SPEED : 0,
            currentLin.y,
            moving ? desiredDir.z * SPEED : 0
        )

        const alpha = 1 - Math.exp(-ACCEL * delta)
        const newVel = currentVel.clone().lerp(targetVel, alpha)
        rb.setLinvel({ x: newVel.x, y: newVel.y, z: newVel.z }, true)

        // 4) Rotate player to face movement dir
        if (moving) {
            const targetYaw = Math.atan2(desiredDir.x, desiredDir.z)
            const currentRot = rb.rotation()
            const currentQuat = new THREE.Quaternion(currentRot.x, currentRot.y, currentRot.z, currentRot.w)
            const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetYaw, 0))

            const ralpha = 1 - Math.exp(-ROTATION_SPEED * delta)
            currentQuat.slerp(targetQuat, ralpha)

            rb.setRotation(
                { x: currentQuat.x, y: currentQuat.y, z: currentQuat.z, w: currentQuat.w },
                true
            )
        }

        // 5) Camera follow as before...
        const playerPos = rb.translation()
        const camOffsetRotated = cameraOffset.clone()
            .applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw.current)
            .applyAxisAngle(new THREE.Vector3(1, 0, 0), pitch.current)

        const targetCamPos = new THREE.Vector3(
            playerPos.x + camOffsetRotated.x,
            playerPos.y + camOffsetRotated.y,
            playerPos.z + camOffsetRotated.z
        )
        camera.position.lerp(targetCamPos, 0.12)
        cameraLookAt.set(playerPos.x, playerPos.y + 1.4, playerPos.z)
        camera.lookAt(cameraLookAt)
    })


    return (
        <RigidBody
            ref={playerRef}
            mass={1}
            position={[0, 2, 0]}
            enabledRotations={[false, false, false]}
        >
            <group>
                {/* Body */}
                <mesh position={[0, 1, 0]}>
                    <capsuleGeometry args={[0.5, 1.5, 4, 8]} />
                    <meshStandardMaterial color="blue" />
                </mesh>

                {/* Head */}
                <mesh position={[0, 2.4, 0]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color="green" />
                </mesh>

                {/* Left Arm */}
                <mesh position={[-0.75, 1.4, 0]}>
                    <capsuleGeometry args={[0.15, 0.9, 4, 8]} />
                    <meshStandardMaterial color="blue" />
                </mesh>

                {/* Right Arm */}
                <mesh position={[0.75, 1.4, 0]}>
                    <capsuleGeometry args={[0.15, 0.9, 4, 8]} />
                    <meshStandardMaterial color="blue" />
                </mesh>

                {/* Left Leg */}
                <mesh position={[-0.3, 0, 0]}>
                    <capsuleGeometry args={[0.2, 1.0, 4, 8]} />
                    <meshStandardMaterial color="blue" />
                </mesh>

                {/* Right Leg */}
                <mesh position={[0.3, 0, 0]}>
                    <capsuleGeometry args={[0.2, 1.0, 4, 8]} />
                    <meshStandardMaterial color="blue" />
                </mesh>
            </group>
            {currentAbility === 'shooting' && <Shooting playerRef={playerRef} />}
        </RigidBody>
    )
}

export default Player

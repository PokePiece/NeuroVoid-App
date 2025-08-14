import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three';
import Tree from '../components/Tree';


interface KeyState {
    [key: string]: boolean
}

interface CarControlsProps {
    body: React.RefObject<RapierRigidBody | null>
}

const CarControls: React.FC<CarControlsProps> = ({ body }) => {
    const [keys, setKeys] = useState<KeyState>({})

    useEffect(() => {
        const down = (e: KeyboardEvent) => setKeys((state) => ({ ...state, [e.code]: true }))
        const up = (e: KeyboardEvent) => setKeys((state) => ({ ...state, [e.code]: false }))

        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)

        return () => {
            window.removeEventListener('keydown', down)
            window.removeEventListener('keyup', up)
        }
    }, [])

    useFrame(() => {
        if (!body.current) return

        const impulse = new THREE.Vector3()
        const torque = new THREE.Vector3()

        // --- Forward/back/strafe (in local space) ---
        if (keys['KeyW']) impulse.z -= 1
        if (keys['KeyS']) impulse.z += 1
        if (keys['KeyA']) impulse.x -= 1
        if (keys['KeyD']) impulse.x += 1

        // --- Up/down ---
        if (keys['Space']) impulse.y += 1
        if (keys['ShiftLeft'] || keys['ShiftRight']) impulse.y -= 1

        // --- Rotation (yaw with Q/E, pitch/roll optional) ---
        if (keys['KeyQ']) torque.y += 0.5 // yaw left
        if (keys['KeyE']) torque.y -= 0.5 // yaw right
        if (keys['ArrowUp']) torque.x += 0.5 // pitch up
        if (keys['ArrowDown']) torque.x -= 0.5 // pitch down
        if (keys['ArrowLeft']) torque.z += 0.5 // roll left
        if (keys['ArrowRight']) torque.z -= 0.5 // roll right

        // Transform local impulse into world space
        const rotation = body.current.rotation()
        const quat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w)
        impulse.applyQuaternion(quat)

        // Apply movement
        body.current.applyImpulse(impulse.multiplyScalar(0.5), true)

        // Apply rotation
        body.current.applyTorqueImpulse(torque, true)
    })

    return null
}



const FlyingCar = () => {

    const carRef = useRef<RapierRigidBody>(null)

    return (
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <Physics>
                <OrbitControls />

                <Tree />

                <RigidBody ref={carRef} linearDamping={0.9} angularDamping={0.9} gravityScale={0}>
                    <group>
                        {/* Body */}
                        <mesh>
                            <boxGeometry args={[1.8, 1, 3]} />
                            <meshBasicMaterial color='navy' />
                        </mesh>
                        {/* Wheels */}
                        <mesh position={[1.1, 0, -1]}>
                            <sphereGeometry args={[.5, .5, .5]} />
                            <meshBasicMaterial color='black' />
                        </mesh>
                        <mesh position={[-1, 0, -1]}>
                            <sphereGeometry args={[.5, .5, .5]} />
                            <meshBasicMaterial color='black' />
                        </mesh>
                        <mesh position={[1.1, 0, 1]}>
                            <sphereGeometry args={[.5, .5, .5]} />
                            <meshBasicMaterial color='black' />
                        </mesh>
                        <mesh position={[-1, 0, 1]}>
                            <sphereGeometry args={[.5, .5, .5]} />
                            <meshBasicMaterial color='black' />
                        </mesh>
                        {/* Exhaust */}
                        <mesh position={[-.5, 0, 1.3]}>
                            <boxGeometry args={[0.5, .3, .85]} />
                            <meshBasicMaterial color='darkgray' />
                        </mesh>
                    </group>
                </RigidBody>
                <RigidBody type='fixed'>
                    {/* Ground plane */}
                    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[25, 25]} />
                        <meshBasicMaterial />
                    </mesh>
                </RigidBody>
                <CarControls body={carRef} />
            </Physics>
        </Canvas>
    )
}

export default FlyingCar
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import GrapplingHook from './GrapplingHook'

const SPEED = 10
const JUMP_FORCE = 1000

const User = () => {
    const body = useRef<RapierRigidBody>(null)

    // Track pressed keys
    const keys = useRef<Record<string, boolean>>({})
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => (keys.current[e.code] = true)
        const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.code] = false)
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    // Movement loop
    useFrame(() => {
        if (!body.current) return
        const impulse = { x: 0, y: 0, z: 0 }

        if (keys.current['KeyW']) impulse.z -= SPEED
        if (keys.current['KeyS']) impulse.z += SPEED
        if (keys.current['KeyA']) impulse.x -= SPEED
        if (keys.current['KeyD']) impulse.x += SPEED

        // Apply movement
        const vel = body.current.linvel()
        body.current.setLinvel(
            {
                x: impulse.x,
                y: vel.y,
                z: impulse.z,
            },
            true
        )

        // Jump
        if (keys.current['Space'] && Math.abs(vel.y) < 0.05) {
            body.current.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true)
        }
    })

    return (
        <>
            <RigidBody ref={body} mass={10} linearDamping={100} gravityScale={10}>
                <group scale={[0.5,.5,.5]}>
                    <mesh>
                        <capsuleGeometry args={[2, 4, 2]} />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </group>
                <GrapplingHook playerRef={body} />
            </RigidBody>
        </>

    )
}

export default User

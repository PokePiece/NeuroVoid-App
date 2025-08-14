// GrapplingHook.tsx
import { useThree, useFrame } from "@react-three/fiber"
import { useState, useRef, useEffect } from "react"
import * as THREE from "three"
import { RapierRigidBody } from "@react-three/rapier"

interface Props {
  playerRef: any
  setIsGrappling: (val: boolean) => void
}

const GrapplingHook = ({ playerRef, setIsGrappling }: Props) => {
  const { camera, scene } = useThree()
  const [grapplePoint, setGrapplePoint] = useState<THREE.Vector3 | null>(null)
  const lineRef = useRef<THREE.Line>(null!)

  useFrame(() => {
    if (grapplePoint && playerRef.current) {
      const playerPos = playerRef.current.translation()
      const dir = new THREE.Vector3(
        grapplePoint.x - playerPos.x,
        grapplePoint.y - playerPos.y,
        grapplePoint.z - playerPos.z
      )

      const dist = dir.length()
      if (dist < 0.5) return // stop pulling when close enough

      dir.normalize().multiplyScalar(dist * 50) // FIX: strong pull

      playerRef.current.applyImpulse(
        { x: dir.x, y: dir.y, z: dir.z },
        true
      )

      const positions = (lineRef.current.geometry.attributes.position.array as Float32Array)
      positions[0] = playerPos.x
      positions[1] = playerPos.y
      positions[2] = playerPos.z
      positions[3] = grapplePoint.x
      positions[4] = grapplePoint.y
      positions[5] = grapplePoint.z
      lineRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "e") {
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)

        const intersects = raycaster
          .intersectObjects(scene.children, true)
          .filter(hit => hit.object.userData?.type !== "player")

        if (intersects.length > 0) {
          setGrapplePoint(intersects[0].point.clone())
          setIsGrappling(true)

          // Auto-release after 2 seconds
          setTimeout(() => {
            setGrapplePoint(null)
            setIsGrappling(false)
          }, 1000)
        }
      }
      if (e.key === "q") {
        setGrapplePoint(null)
        setIsGrappling(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [camera, scene, setIsGrappling])


  return grapplePoint ? (
    <line ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array([0, 0, 0, 0, 0, 0]), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="white" />
    </line>
  ) : null
}

export default GrapplingHook

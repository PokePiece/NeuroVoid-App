import { RigidBody } from '@react-three/rapier'
import React, { useMemo } from 'react'
import * as THREE from 'three'

const FallingSpheres = () => {
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color('#FFFFF0') },
        color2: { value: new THREE.Color('#CFCFC4') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 color1;
        uniform vec3 color2;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float t = smoothstep(0.0, 0.7, dist);
          vec3 color = mix(color1, color2, t);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    })
  }, [])

  return (
    <group position={[5, 5, 0]}>
      <RigidBody gravityScale={0} mass={0.0001}>
        <mesh position={[10, 60, 16]} material={gradientMaterial}>
          <sphereGeometry args={[10, 64, 64]} />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[2, 4, 0]}>
          <sphereGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="blue" />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[2, 4, 3]}>
          <sphereGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="purple" />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[5, 1, 0]}>
          <sphereGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="green" />
        </mesh>
      </RigidBody>
    </group>
  )
}

export default FallingSpheres

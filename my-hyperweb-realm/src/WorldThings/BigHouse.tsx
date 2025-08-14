// src/components/WorldThings/BigHouse.tsx
import React from "react";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const BigHouse = ({ size = 100, height = 50, roofHeight = 80 }) => {
  const half = size / 2;

  return (
    <group position={[0, -10, 0]}>
      {/* Front wall (no collider gap for now) */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, height / 2, -half]}>
        <mesh>
          <boxGeometry args={[size, height, 1]} />
          <meshStandardMaterial color="#c2b280" />
        </mesh>
      </RigidBody>

      {/* Simple wooden door */}
      <group position={[0, 5, -half + 0.51]}>
        {/* Door panel */}
        <mesh>
          <boxGeometry args={[6, 10, 0.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Horizontal planks */}
        <mesh position={[0, 3, 0.26]}>
          <boxGeometry args={[6, 0.3, 0.3]} />
          <meshStandardMaterial color="#5A2D0C" />
        </mesh>
        <mesh position={[0, -3, 0.26]}>
          <boxGeometry args={[6, 0.3, 0.3]} />
          <meshStandardMaterial color="#5A2D0C" />
        </mesh>
        {/* Door knob */}
        <mesh position={[2.5, 0, 0.4]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="gold" />
        </mesh>
      </group>

      {/* Back wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, height / 2, half]}>
        <mesh>
          <boxGeometry args={[size, height, 1]} />
          <meshStandardMaterial color="#c2b280" />
        </mesh>
      </RigidBody>

      {/* Left wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[-half, height / 2, 0]}>
        <mesh>
          <boxGeometry args={[1, height, size]} />
          <meshStandardMaterial color="#c2b280" />
        </mesh>
      </RigidBody>

      {/* Right wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[half, height / 2, 0]}>
        <mesh>
          <boxGeometry args={[1, height, size]} />
          <meshStandardMaterial color="#c2b280" />
        </mesh>
      </RigidBody>

      {/* Roof */}
      <mesh position={[0, height + roofHeight / 2, 0]} rotation={[0, Math.PI, 0]}>
        <coneGeometry args={[size * 0.75, roofHeight, 32]} />
        <meshStandardMaterial color="#a0522d" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default BigHouse;

interface ChairProps {
  position: [number, number, number]
  rotation: [number, number, number]
  click: React.Dispatch<React.SetStateAction<[number, number, number]>>
}

export default function Chair({ position, rotation, click }: ChairProps) {

  const newPos = position.map((value, index) => value + [3,4,5][index])

  return (
    <group position={position} rotation={rotation} onClick={() => click(position)}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1, -0.45]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      <mesh position={[-0.45, 0.25, -0.45]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.45, 0.25, -0.45]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[-0.45, 0.25, 0.45]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.45, 0.25, 0.45]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  )
}

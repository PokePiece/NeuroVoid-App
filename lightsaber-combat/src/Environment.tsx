import React from 'react'

const Environment = () => {
  return (
    <>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  )
}

export default Environment

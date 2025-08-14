import React from 'react'

const Tree = () => {

    

    return (
        <group position={[5,0,22]}>
            <mesh>
                <cylinderGeometry args={[1,3,10]} />
                <meshBasicMaterial color='#542619' />
            </mesh>
            <mesh position={[0,6,0]}>
                <coneGeometry args={[5,5,5]} />
                <meshBasicMaterial color='green' />
            </mesh>
        </group>
    )
}

export default Tree
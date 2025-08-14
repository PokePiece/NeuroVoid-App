import React from "react";
import Chair from "./Chair";

interface ChairsProps {
    userSit: React.Dispatch<React.SetStateAction<[number, number, number]>>
    surrealSit: React.Dispatch<React.SetStateAction<[number, number, number]>>
}

export default function Chairs({userSit, surrealSit}:ChairsProps) {

    return (
        <>
            <Chair position={[3, 0, 6.3]} rotation={[0, 3.15, 0]} click={surrealSit} />
            <Chair position={[6.85, 0, 8.9]} rotation={[0, 1.85, 0]} click={userSit} />
            <Chair position={[3,0,13.5]} rotation={[0,-1.6,0]} click={userSit} />
            <Chair position={[4,0,12]} rotation={[0,-1.6,0]} click={userSit} />
            <Chair position={[3,0,10.5]} rotation={[0,-1.6,0]} click={userSit} />
            <Chair position={[-3,0,11]} rotation={[0,1.6,0]} click={userSit} />
            <Chair position={[-3,0,13]} rotation={[0,1.6,0]} click={userSit} />
            <Chair position={[0,0,16.5]} rotation={[0,-3.15,0]} click={userSit} />
            <Chair position={[0,0,7.7]} rotation={[0,0,0]} click={userSit} />
        </>
    )
}
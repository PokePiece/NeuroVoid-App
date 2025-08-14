import React from 'react'
import Ground from './Ground'
import FallingSpheres from './FallingSpheres'
import Portals from './Portals'
import Holograms from './Holograms'
import HoloChat from './HoloChat'
import FloatingAssistant from './FloatingAssistant'
import GrassField from './WorldThings/GrassField'
import Road from './WorldThings/Road'
import Shop from './WorldThings/Shop'
import Border from './WorldThings/Border'
import BigHouse from './WorldThings/BigHouse'
import Fountain from './WorldThings/Fountain'

const World = () => {
    return (
        <>
            <Ground />
            <GrassField />
            <Road />
            <Shop />
            <Fountain />
            <FallingSpheres />
            <Portals />
            <Holograms />
            <HoloChat />
            <FloatingAssistant />
            <Border />
            <BigHouse size={100} height={50} roofHeight={80} />
        </>
    )
}

export default World

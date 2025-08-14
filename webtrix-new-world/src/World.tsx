import React from 'react'
import Ground from './Ground'
import FallingSpheres from './FallingSpheres'
import Portals from './Portals'
import Holograms from './Holograms'
import HoloChat from './HoloChat'
import FloatingAssistant from './FloatingAssistant'
import Waterfall from './WorldThings/Waterfall'
import GrassField from './WorldThings/GrassField'
import Road from './WorldThings/Road'
import Shop from './WorldThings/Shop'
import Border from './WorldThings/Border'

const World = () => {
    return (
        <>
            <Ground />
            <GrassField />
            <Road />
            <Shop />
            <Waterfall />
            <FallingSpheres />
            <Portals />
            <Holograms />
            <HoloChat />
            <FloatingAssistant />
            <Border />
        </>
    )
}

export default World

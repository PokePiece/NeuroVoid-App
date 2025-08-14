

import React, { useEffect } from 'react'
import Chat from './Chat'
import Discussion from './Discussion'
import BookDisplay from './interfaces/BookDisplay'
import PadDisplay from './interfaces/PadDisplay'
import VoidInteract from './interfaces/VoidInteract'
import TailwindPaper from './interfaces/TailwindPaper'

interface CoreOverlaysProps {
    showVoidOverlay: boolean
    setShowVoidOverlay: React.Dispatch<React.SetStateAction<boolean>>
    showHumanAGIOverlay: boolean
    setShowHumanAGIOverlay: React.Dispatch<React.SetStateAction<boolean>>
    setIsChatting: React.Dispatch<React.SetStateAction<boolean>>
    showBookOverlay: boolean
    setShowBookOverlay: React.Dispatch<React.SetStateAction<boolean>>
    setShowPadOverlay: React.Dispatch<React.SetStateAction<boolean>>
    showPadOverlay: boolean
    showTailwindPaperoverlay: boolean
    setShowTailwindPaperOverlay: React.Dispatch<React.SetStateAction<boolean>>
    showLaptopOverlay: boolean
    setShowLaptopOverlay: React.Dispatch<React.SetStateAction<boolean>>
    isChatting: boolean
}

const CoreOverlays = ({ showLaptopOverlay, setShowLaptopOverlay, showTailwindPaperoverlay, setShowTailwindPaperOverlay, showPadOverlay, setShowPadOverlay, showBookOverlay, setShowBookOverlay, setIsChatting, showVoidOverlay, setShowVoidOverlay, showHumanAGIOverlay, setShowHumanAGIOverlay }: CoreOverlaysProps) => {

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'escape') {
                setShowVoidOverlay(false)
                setShowHumanAGIOverlay(false)
                setIsChatting(false)
                setShowBookOverlay(false)
                setShowPadOverlay(false)
                setShowTailwindPaperOverlay(false)
                setShowLaptopOverlay(false)
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    })

    useEffect(() => {
        if(showLaptopOverlay) {
            setIsChatting(true)
        } 
    })


    return (
        <>
            {showVoidOverlay && (
                <div className="overflow-y-auto fixed left-[25px] top-5 w-[calc(100%-50px)] bottom-[25px] bg-white/98 text-white font-light text-md box-border flex flex-col">
                    <div className='w-full h-full'>
                        <h1 className='text-3xl font-bold flex flex-center text-center justify-center bg-gray-200 pt-10 text-black'>Void Manager</h1>
                        <div className='text-lg text-gray-700 flex justify-center '>

                        </div>
                        <VoidInteract />
                    </div>
                </div>

            )}
            {showHumanAGIOverlay && (
                <div className="fixed left-[25px] top-5 w-[calc(100%-50px)] bottom-[25px] bg-white/98 text-white font-light text-md box-border flex flex-col">
                    <iframe
                        className='w-full h-full'
                        src='https://human.dilloncarey.com'
                    />
                </div>
            )}
            {showBookOverlay && (
                <div className="overflow-y-auto fixed left-[25px] top-5 w-[calc(100%-50px)] bottom-[25px] bg-white/98 text-white font-light text-md box-border flex flex-col">
                    <div className='w-full h-full'>
                        <h1 className='text-3xl font-bold flex flex-center text-center justify-center mt-10 text-black'>Void Persistent State Day 1</h1>
                        <div className='text-lg text-gray-700 flex justify-center mx-7 '>
                            <BookDisplay />
                        </div>
                    </div>
                </div>
            )}
            {showPadOverlay && (
                <div className="overflow-y-auto fixed left-[25px] top-5 w-[calc(100%-50px)] bottom-[25px] bg-white/98 text-white font-light text-md box-border flex flex-col">
                    <div className='w-full h-full flex flex-col'>
                        <h1 className='text-3xl font-bold text-center mt-10 text-black'>Pad</h1>
                        <div className='text-lg text-gray-700 flex-grow mx-7'>
                            <PadDisplay />
                        </div>
                    </div>
                </div>
            )}
            {showTailwindPaperoverlay && (
                <div className="overflow-y-auto fixed left-[25px] top-5 w-[calc(100%-50px)] bottom-[25px] bg-white/98 text-white font-light text-md box-border flex flex-col">
                    <div className='w-full h-full flex flex-col'>
                        <h1 className='text-3xl font-bold text-center mt-10 text-black'>Tailwind Items</h1>
                        <div className='text-lg text-gray-700 flex-grow mx-7'>
                            <TailwindPaper />
                        </div>
                    </div>
                </div>
            )}
            {showLaptopOverlay && (
                <div className="fixed left-[25px] top-5 w-[calc(100%-50px)] bottom-[25px] bg-gray-100 text-white font-light text-md box-border flex flex-col">
                    <iframe
                        className='w-full h-full'
                        src='http://localhost:3001'
                    />
                </div>
            )}

        </>
    )
}

export default CoreOverlays

/*
<div className="fixed left-[25px] top-5 w-[calc(100%-50px)] bottom-[25px] bg-white/98 text-white font-light text-md box-border flex flex-col">
                <iframe
                    className='w-full h-full'
                    src='https://intelligence.dilloncarey.com'
                />
            </div>
*/
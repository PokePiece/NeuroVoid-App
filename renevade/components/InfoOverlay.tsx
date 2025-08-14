import React from 'react'

type InfoOverlayProps = {
    showVoidInfo: boolean
    setShowVoidInfo: React.Dispatch<React.SetStateAction<boolean>>
    showHumanAGIInfo: boolean
    setShowHumanAGIInfo: React.Dispatch<React.SetStateAction<boolean>>
    showMusicInfo: boolean
    setShowMusicInfo: React.Dispatch<React.SetStateAction<boolean>>
    showSurrealInfo: boolean
    setShowSurrealInfo: React.Dispatch<React.SetStateAction<boolean>>
    showPlayerInfo: boolean
    setShowPlayerInfo: React.Dispatch<React.SetStateAction<boolean>>
    setShowBookInfo: React.Dispatch<React.SetStateAction<boolean>>
    showBookInfo: boolean
    showPadInfo: boolean
    setShowPadInfo: React.Dispatch<React.SetStateAction<boolean>>
    showLaptopInfo: boolean
    setShowLaptopInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const InfoOverlays = ({ showLaptopInfo, setShowLaptopInfo, showPadInfo, setShowPadInfo, showBookInfo, setShowBookInfo, showPlayerInfo, setShowPlayerInfo, showSurrealInfo, setShowSurrealInfo, showMusicInfo, setShowMusicInfo, showVoidInfo, setShowVoidInfo, showHumanAGIInfo, setShowHumanAGIInfo }: InfoOverlayProps) => {
    return (
        <>
            {showVoidInfo && (

                <div>
                    <div className="absolute top-4 left-4 bg-white text-black p-4 rounded shadow z-50">
                        <p><strong>Name:</strong> Void Cloud Intelligence</p>
                        <p><strong>Description:</strong> Repository of Intelligence in the Cloud</p>
                        <p><strong>Website:</strong>https://intelligence.dilloncarey.com</p>
                        {/*<p><strong>Webspace:</strong></p> */}


                        <button
                            className="mt-2 bg-gray-200 px-2 py-1 rounded"
                            onClick={() => setShowVoidInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showHumanAGIInfo && (

                <div>
                    <div className="absolute top-4 left-4 bg-white text-black p-4 rounded shadow z-50">
                        <p><strong>Name:</strong> Human AGI</p>
                        <p><strong>Description:</strong> Platform for the creation of humanity in silicon.</p>
                        <p><strong>Website:</strong>https://human.dilloncarey.com</p>
                        {/*<p><strong>Webspace:</strong></p> */}


                        <button
                            className="mt-2 bg-gray-200 px-2 py-1 rounded"
                            onClick={() => setShowHumanAGIInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showMusicInfo && (

                <div>
                    <div className="absolute top-4 left-4 bg-white text-black p-4 rounded shadow z-50">
                        <p><strong>Name:</strong> Music</p>
                        <p><strong>Description:</strong> Listen to music.</p>
                        {/*<p><strong>Webspace:</strong></p> */}


                        <button
                            className="mt-2 bg-gray-200 px-2 py-1 rounded"
                            onClick={() => setShowMusicInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showSurrealInfo && (

                <div>
                    <div className="absolute top-4 left-4 bg-white text-black p-4 rounded shadow z-50">
                        <p><strong>Name:</strong> Surreal</p>
                        <p><strong>Description:</strong> The person who guides the Webtrix.</p>
                        {/*<p><strong>Webspace:</strong></p> */}


                        <button
                            className="mt-2 bg-gray-200 px-2 py-1 rounded"
                            onClick={() => setShowSurrealInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showPlayerInfo && (

                <div>
                    <div className="absolute top-4 left-4 bg-white text-black p-4 rounded shadow z-50">
                        <p><strong>Name:</strong> You</p>
                        <p><strong>Description:</strong> Your presence in the Webtrix. Alive in its web, you peer keenly around.</p>
                        {/*<p><strong>Webspace:</strong></p> */}


                        <button
                            className="mt-2 bg-gray-200 px-2 py-1 rounded"
                            onClick={() => setShowPlayerInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showBookInfo && (
                <div>
                    <div className="absolute top-4 left-4 bg-white text-black p-4 rounded shadow z-50">
                        <p><strong>Name:</strong> Deep Void Book</p>
                        <p><strong>Description:</strong> The Deep Void Log for Day 1 of its function.</p>
                        {/*<p><strong>Webspace:</strong></p> */}


                        <button
                            className="mt-2 bg-gray-200 px-2 py-1 rounded"
                            onClick={() => setShowBookInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div >
            )}
            {showPadInfo && (
                <div>
                    <div className="absolute top-4 left-4 bg-white text-black p-4 rounded shadow z-50">
                        <p><strong>Name:</strong> Void Pad</p>
                        <p><strong>Description:</strong> The Pad for taking notes on the Void's progress.</p>
                        {/*<p><strong>Webspace:</strong></p> */}


                        <button
                            className="mt-2 bg-gray-200 px-2 py-1 rounded"
                            onClick={() => setShowLaptopInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div >
            )}
            {showLaptopInfo && (
                <div>
                    <div className="absolute top-4 left-4 bg-white text-black p-4 rounded shadow z-50">
                        <p><strong>Name:</strong> Laptop</p>
                        <p><strong>Description:</strong> Manage and perform with the laptop.</p>
                        {/*<p><strong>Webspace:</strong></p> */}


                        <button
                            className="mt-2 bg-gray-200 px-2 py-1 rounded"
                            onClick={() => setShowLaptopInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div >
            )}
        </>
    )
}

export default InfoOverlays

{/*<p><strong>Wikipedia:</strong> {selectedBuilding.website ?? "—"}</p>*/ }
import React, { useState, useEffect } from 'react'

const PadDisplay = () => {
    const [note, setNote] = useState(
        localStorage.getItem('userNote') || ''
    );

    useEffect(() => {
        localStorage.setItem('userNote', note);
    }, [note]);

    return (
        <div className="w-full h-full">
            <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Write notes..."
                className="w-full h-[83vh] p-4 rounded-md resize-none focus:outline-none"
            />
        </div>
    )

    //focus:ring-blue-500 focus:ring-2
}

export default PadDisplay;
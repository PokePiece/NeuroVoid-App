'use client'

import React from 'react'

const page = () => {
    return (
        <div className='flex flex-row justify-center mt-10 text-lg'>
            <button
                onClick={() => console.log("Hello world clicked!")}
                id='hello-button'
            >
                Hello World!
            </button>
            

        </div>
    )
}

export default page
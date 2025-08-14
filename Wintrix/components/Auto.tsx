'use client'
import Link from 'next/link';
import React from 'react'

const Auto = () => {

    const handleNoisesClick = () => {
        console.log('Generating noise...');

        fetch('http://localhost:8000/noisesauto')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // or .json() if returning JSON
            })
            .then(data => {
                console.log('Noise generation response:', data);
            })
            .catch(error => {
                console.error('Error generating noise:', error);
            });
    };

    const handleHarrellClick = () => {
        console.log('Launching top 5 Harrell...');

        fetch('http://localhost:8000/harrell-auto')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // or .json() if returning JSON
            })
            .then(data => {
                console.log('Noise generation response:', data);
            })
            .catch(error => {
                console.error('Error generating noise:', error);
            });
    };

    const handleHelloClick = () => {
        console.log('Launching top 5 Harrell...');

        fetch('http://localhost:8000/hello-auto')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // or .json() if returning JSON
            })
            .then(data => {
                console.log('Noise generation response:', data);
            })
            .catch(error => {
                console.error('Error generating noise:', error);
            });
    };


    return (
        <div className='flex flex-row justify-center gap-3'>


            <button
                className='text-blue-200 text-lg bg-gray-900 p-3 px-4 rounded-md'
                onClick={handleNoisesClick}
            >
                Noises
            </button>
            <Link href='/ships#music' legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                    <button className='text-blue-200 text-lg bg-gray-900 p-3 px-4 rounded-md'>
                        Music
                    </button>
                </a>
            </Link>
            <button
                className='text-blue-200 text-lg bg-gray-900 p-3 px-4 rounded-md'
                onClick={handleHelloClick}
            >
                Hello World
            </button>
            <button
                className='text-blue-200 text-lg bg-gray-900 p-3 px-4 rounded-md'
                onClick={handleHarrellClick}
            >
                Harrell
            </button>
        </div>
    )
}

export default Auto
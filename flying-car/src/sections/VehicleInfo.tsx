import React from 'react'

const VehicleInfo = () => {
    return (
        <div className='flex flex-row justify-center'>
            <div className='py-3 gap-5 pb-[10vh] flex-col font-light justify-center text-center flex-center flex align-center bg-blue-300 w-full h-full'>
                <p className='text-xl font-bold font-bold'>This is a car that flies</p>
                <div>
                    <p className='pb-3'>Advanced energy: Sustains itself with compact, dense power</p>
                    <p className='pb-3'>Equipped with robust helo-thrusters to propel and hover</p>
                    <p className='pb-3'>Capable of operating in aerial and ground terrain</p>
                </div>
            </div>
            <div className='flex-col gap-5 h-full pb-[10vh] align-center text-center flex w-full h-full bg-green-300 py-3 flex-center justify-center'>
                <p className='font-bold text-xl'>Fly the car</p>
                <div className='gap-5'>
                    <p className='pb-3'>Use controls to pilot it</p>
                    <p className='pb-3'>Pitch, yaw, and adjust the vehicle to maintain direction</p>
                    <p className='pb-3'>Traverse the world in epic proportion</p>
                </div>
            </div>
        </div>
    )
}

export default VehicleInfo
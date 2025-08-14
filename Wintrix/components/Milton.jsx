import Link from 'next/link'
import React from 'react'

const Milton = () => {
  return (
    <div className='text-white flex flex-center border-t border-1 border-white py-10 text-lg'>
        <Link href='/ships/milton' className='text-cyan-300'>Milton</Link>
    </div>
  )
}

export default Milton
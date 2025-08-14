import React, { useState } from 'react'
import { clientReviews } from './constants'
import Chat from '../components/Chat'

const Skills = () => {

    const [showChat, setShowChat] = useState(false)

    const toggleChat = () => {
        setShowChat(!showChat)
    }

    return (
        <section className="c-space my-20" id='skills'>
            <h3 className='head-text'><span className='text-slateGray'>Skills</span></h3>

            <div className='client-container' onClick={toggleChat}>

                {clientReviews.map(({ id, name, review, img, position, stars }) => (
                    <div key={id} className="client-review">
                        <div>
                            <p className="text-white font-light">{review}</p>

                            <div className="client-content">
                                <div className='flex gap-3'>
                                    <img src={img} alt={name} className="w-12 h-12 rounded-full" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-white-800">{name}</p>
                                        <p className='text-white-500 md:test-base text-sm'>{position}</p>
                                    </div>
                                </div>

                                <div className='flex self-end items-center gap-2'>
                                    {Array.from({ length: stars }).map((_, index) => (
                                        <img key={index} src="assets/star.png" alt="star" className="w-5 h-5" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
                showChat &&
                <Chat
                    title={`Chat About the Skills`}
                    bodyPlaceholder='Its output will appear here.'
                    inputPlaceholder='Send a request...'
                    aiTag='portfolio_skills'
                />
            }
        </section>
    )
}

export default Skills;
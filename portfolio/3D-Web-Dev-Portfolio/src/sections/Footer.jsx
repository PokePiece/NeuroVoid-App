import React from 'react'

const Footer = () => {
    return (
        <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className='text-white-500 flex gap-2'>
                <a href='https://terms.dilloncarey.com/' target='_blank'><p>Terms & Conditions</p></a>
                <p>|</p>
                <a href='https://privacy.dilloncarey.com/' target='_blank'><p>Privacy Policy</p></a>
            </div>
            <div className="flex gap-3">
                <div className="social-icon">
                    <a href='https://github.com/pokepiece/' target='_blank' onClick={() => {}}><img src="/assets/githubactual.svg" alt='github' className='w-7 h-7' /></a>
                </div>
                <div className="social-icon">
                    <a href='https://www.linkedin.com/in/dilloncarey/' target='_blank' onClick={() => {}}><img src="/assets/linkedinactual.svg" alt='linkedin' className='w-7 h-7' /></a>
                </div>
            </div>
            <p className='text-white-500'>© 2025 Dillon Carey. All rights reserved.</p>
        </section>
    )
}

export default Footer
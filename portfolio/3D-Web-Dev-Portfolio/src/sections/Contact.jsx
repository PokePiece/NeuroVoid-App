import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Chat from '../components/Chat';

//test

const Contact = () => {

    const formRef = useRef();

    const [loading, setLoading] = useState(false)

    const [showChat, setShowChat] = useState(false)

    const toggleChat = () => {
        setShowChat(!showChat)
    }

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        setForm({
            name: '',
            email: '',
            message: '',
        })



        try {
            await emailjs.send(
                'service_zr3mbnq',
                'template_o00zv8f',
                {
                    from_name: form.name,
                    to_name: 'Dillon',
                    from_email: form.email,
                    to_email: 'dillon@dilloncarey.com',
                    message: form.message,
                },
                'jWRbZ-v2GPRf50rdj'
            )

            setLoading(false);

            alert('Your message has been sent!')
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert('Something went wrong, please try again later!')
        }


    }


    return (
        <section className='c-space my-20' id="reach">
            <div className='relative min-h-screen flex items-center justify-center flex-col'>
                <div className='contact-container'>
                    <h3 className='head-text'><span className="text-slateGray">Reach</span></h3>
                    <p className='text-lg text-white-600 mt-3' onClick={toggleChat}>
                        For your intelligence development needs, AI system engineering, or crafting bespoke autonomous solutions, I'm here to transform your vision into a robust and optimized reality.


                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col space-y-7' >
                        <label className='space-y-3'>
                            <span className='field-label'>Name</span>
                            <input type='text' name='name' value={form.name} onChange={handleChange} required className='field-input' placeholder='Alex Rivera' />
                        </label>
                        <label className='space-y-3'>
                            <span className='field-label'>Email</span>
                            <input type='email' name='email' value={form.email} onChange={handleChange} required className='field-input' placeholder='alex.rivera@example.com' />
                        </label>
                        <label className='space-y-3'>
                            <span className='field-label'>Your message</span>
                            <textarea type='text' name='message' value={form.message} onChange={handleChange} required rows={5} className='field-input' placeholder="Share details about your intelligence development needs, proposed project, or collaboration ideas here." />
                        </label>

                        <button type='submit' className='field-btn' disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                            <img src='/assets/arrow-up.png' alt='arrow-up' className='field-btn_arrow' />
                        </button>

                    </form>
                </div>
            </div>
            {
                showChat &&
                <Chat
                    title={`Chat About Reaching Out`}
                    bodyPlaceholder='Its output will appear here.'
                    inputPlaceholder='Send a request...'
                    aiTag='portfolio_reach'
                />
            }

        </section>
    )
}

export default Contact
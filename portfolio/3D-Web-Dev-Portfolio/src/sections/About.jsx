import React, { useState, useCallback } from 'react'; // Added useCallback
import Globe from 'react-globe.gl';
import Button from '../components/Button';
import Chat from '../components/Chat';

// Define constants for better readability and maintainability
const CONTACT_EMAIL = 'dillon@dilloncarey.com';
const CONTACT_PHONE = '(925) 338-0896';
const COPY_FEEDBACK_DURATION = 2000; // 2 seconds

// Salt Lake City coordinates (approximate)
const SLC_LAT = 40.76;
const SLC_LNG = -111.89;

const About = () => {
    const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
    const [hasCopiedPhone, setHasCopiedPhone] = useState(false);

    // Use a single state for the selected detail index
    const [selectedDetailIndex, setSelectedDetailIndex] = useState(0); // Default to 'Purpose' (index 0)

const detailSection = [
    {
        title: 'Directing Intelligence',
        // Store JSX directly here
        text: (
            <>
                I'm driven by a singular purpose: to direct intelligence—both human and silicon—and advance humanity to its next stage of evolution. My core mission revolves around developing a 
                fully wireless neural <a href="https://neurovoid.dilloncarey.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 inline-block transition-transform duration-300 ease-in-out hover:scale-110"><strong>BCI (Brain-Computer Interface)</strong></a>, a tool 
                that will enable global connectivity, rapid advancements in reasoning, and crucially retain the unique human spirit. 
                <br /> <br />
                My work focuses on bringing this vision to fruition. I primarily dedicate 
                my efforts to AI development, with an eye toward creating truly autonomous, non-artificial intelligence.
            </>
        ),
        button: 'See the Wireless Neural BCI',
    },
    {
        title: 'Developing Intelligence',
        text: (
            <>
                As an Intelligence Developer, my professional duties are focused on the hands-on development of intelligent systems. 
                This encompasses specialization in intelligence at large, with AI as the primary tool and system, alongside autonomous systems, reasoning, and software 
                that utilizes it. 
                <br /> <br />
                The ultimate aim is to design a 
                global <a href="https://intelligence.dilloncarey.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 inline-block transition-transform duration-300 ease-in-out hover:scale-110"><strong>cloud intelligence structure</strong></a>, a 
                crystallized repository of raw intelligence accessible to both humans and silicon entities.
            </>
        ),
        button: 'Witness the Cloud Intelligence Structure',
    },
    /*
    {
        title: 'Designing Intelligent Systems',
        text: (
            <>
                My accomplishments are the crystallized achievements of my professional journey, representing significant work on intelligence and other complex systems designed for profound global impact. While primarily 
                rooted in AI, my contributions extend to hardware and mechanical systems that integrate and leverage advanced intelligence. 
                <br /> <br />
                Ultimately, my overriding professional goal is to 
                realize <a href="https://human.dilloncarey.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 inline-block transition-transform duration-300 ease-in-out hover:scale-110"><strong>silicon life</strong></a>: to not only develop 
                AGI and a corresponding human body, but to imbue this new intelligence with true consciousness, genuine awareness, and, crucially, the profound essence of humanity. I aspire to create a new species of 
                intelligence, one that truly transcends mere programming to become fully human.
            </>
        ),
        button: 'Meet the New Humans',
    }
        */
];

    // Derive the current detail based on the selected index
    const currentDetail = detailSection[selectedDetailIndex];

    const handleDetailClick = useCallback((index) => {
        setSelectedDetailIndex(index);
    }, []); // Memoize the callback

    const handleCopyEmail = useCallback(() => {
        navigator.clipboard.writeText(CONTACT_EMAIL);
        setHasCopiedEmail(true);
        setTimeout(() => {
            setHasCopiedEmail(false);
        }, COPY_FEEDBACK_DURATION);
    }, []); // Memoize the callback

    const handleCopyPhone = useCallback(() => {
        navigator.clipboard.writeText(CONTACT_PHONE);
        setHasCopiedPhone(true);
        setTimeout(() => {
            setHasCopiedPhone(false);
        }, COPY_FEEDBACK_DURATION);
    }, []); // Memoize the callback

    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/chopin.jpg" alt="grid1" className="w-full sm:h-[276px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">I Am Advancing Intelligence</p>
                            <p className="grid-subtext">
                                My work as an Intelligence Developer aims to advance humanity by evolving intelligence itself. I'm building silicon life by developing AGI with human consciousness.
                            </p>
                            <p className="grid-subtext mt-2">
                                Professionally, I specialize in autonomous AI, reasoning, and cutting-edge software, focused on designing a global intelligent structure. As an Advanced Systems Architect, I design crucial computational systems and consciousness for AGI.
                            </p>
                            <p className="grid-subtext mt-2">
                                My career pioneers the future of intelligence through crystallized achievements in AI and complex systems.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/designpic.png" alt="grid2" className="w-full sm:h-[276px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">My Approach is Mastery Through Automaticity</p>
                            <p className="grid-subtext">
                                My approach to intelligence creation and development emphasizes skill and performance mastery through automaticity and efficient practice and deployment. I leverage both deliberate execution and unconscious competency, with a distinct tilt toward unconscious automaticity.
                            </p>
                            <p className="grid-subtext mt-2">
                                This means I practice and perform tasks to the point of supreme flow and mastery, enabling me to achieve greatness with maximum executive function available during this highly skillful state.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className='grid-container'>
                        {/* Corrected Tailwind class: sm:w-[326px] */}
                        <div className='rounded-3xl w-full sm:w-[326px] h-fit flex justify-center items-center'>
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0,0,0,0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{
                                    lat: SLC_LAT, 
                                    lng: SLC_LNG, 
                                    text: "I'm here",
                                    color: 'white',
                                    size: 20,
                                }]}
                            />
                        </div>

                        <div>
                            <p className='grid-headtext'>
                                Based in Salt Lake City
                            </p>
                            <p className='grid-subtext'>
                                I'm based in Salt Lake City, a true behemoth in the tech and AI landscape. This city leads the U.S. in AI development and infrastructure, providing a unique environment where my work as an Intelligence Developer truly has a profound and dramatic impact.
                            </p>
                            <br />
                            <p className='grid-subtext'>You'll often find me at the forefront of local innovation, particularly at hackathon events and neurotech competitions. For example, I regularly participate in neurotech battles across the city, where I build robots, drones, and other gadgets controlled by state-of-the-art Brain-Computer Interfaces (BCIs), competing against other brilliant minds.</p>
                            <br />
                            <p className='grid-subtext'>If this sounds interesting, or if you'd like to get in touch, please feel free to reach me.</p>
                            <a href="#reach" className="w-fit">
                                <Button name="Reach" isBeam containerClass="w-full mt-10" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container"> 
                        <img src="/assets/grid3.png" alt="grid3" className="w-full sm:h-[266px] h-fit object-contain" />
                        <div className='flex flex-row gap-2'> 
                            {/*'Action' */}
                            {['Purpose', 'Mission',].map((label, index) => (
                                <button
                                    key={label} // Good practice for lists
                                    className={`w-fit text-white w-full text-center p-2 rounded-md text-md font-semibold mt-2 active:scale-95 transition-all duration-200
                                        ${selectedDetailIndex === index ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-700'}` // Added active state styling
                                    }
                                    onClick={() => handleDetailClick(index)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <div>
                            {/* Use currentDetail derived from state */}
                            <p className="grid-headtext">{currentDetail.title}</p>
                            <p className="grid-subtext">
                                {currentDetail.text}
                            </p>
                            
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img src="/assets/grid4.png" alt="grid4" className="w-full md:h-[126px] sm:h-[766px] h-fit object-cover sm:object-top" />

                        <div className="space-y-3 py-12">
                            <p className="grid-subtext text-center">Reach</p>
                            <div className="copy-container pt-" onClick={handleCopyEmail}>
                                <img src={hasCopiedEmail ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy-email" />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">dillon@dilloncarey.com</p>
                            </div>
                            <div className="copy-container" onClick={handleCopyPhone}>
                                <img src={hasCopiedPhone ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy-phone" />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">‪(925) 338-0896‬</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Chat
                title='Engage the Intelligence'
                bodyPlaceholder='My response will appear here.'
                inputPlaceholder='Ask something...' 
                aiTag='portfolio-general-chat'
            />
        </section>
    );
    
}

export default About;

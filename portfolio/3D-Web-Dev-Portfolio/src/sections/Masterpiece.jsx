import React, { Suspense, useState, useCallback } from 'react';
import { myProjects } from './constants';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import DemoComputer from '../components/DemoComputer';
import Chat from '../components/Chat';

const Masterpiece = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
   
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const [showChat, setShowChat] = useState(false);

    const currentProject = myProjects[selectedProjectIndex];
    const projectCount = myProjects.length;

    const handleNavigation = (direction) => {

        setSelectedProjectIndex(prevIndex => {
            setIsVideoPlaying(false); 
            return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
        });
    };

    const toggleChat = () => {
        setShowChat(prev => !prev);
        console.log('Chat toggled');
    }
    
    const handleScreenClick = useCallback(() => {
        setIsVideoPlaying(prev => !prev);
    }, []);

    const handleVideoEnded = useCallback(() => {
        setIsVideoPlaying(false); 
    }, []);

    return (
        <section className="c-space my-20" id="masterpiece">
            <p className="head-text text-lightRed"><span className="text-slateGray">Masterpiece</span></p>

            <div
                className='grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full'
                
            >

                <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200"
                    onClick={toggleChat}>
                    
                    <div className="absolute top-0 right-0">
                        <img src={myProjects[0].spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
                    </div>

                    <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={myProjects[0].logoStyle}>
                        <img src={currentProject.logo} alt="logo" className="w-10 h-10 shadow-sm" />
                    </div>
                    <div className='flex flex-col gap-5 text-white-600 my-5'>
                        <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
                        <p className="animatedText">{currentProject.desc}</p>
                        <p className="animatedText">{currentProject.subdesc}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-5">
                        <div className='flex items-center gap-3'>
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className='tech-logo'>
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}
                        </div>
                        <a className="flex items-center gap-2 cursor-pointer text-white-600" href={currentProject.href} target="_blank" rel="noreferrer">
                            <p>View Live</p>
                            <img src="/assets/arrow-up.png" className="w-3 h-3" alt="arrow" />
                        </a>
                    </div>
                </div>

                <div className="border border-black-300 bg-gray-600 rounded-lg h-96 md:h-full">
                    <Canvas>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                    <DemoComputer
                                        texture={currentProject.texture}
                                        isPlaying={isVideoPlaying}
                                        onClickScreen={handleScreenClick}
                                        onVideoEnded={handleVideoEnded}
                                    />
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                    </Canvas>
                </div>
            </div>
            {
                showChat &&
                <Chat
                    title={`Chat About the Scomaton`}
                    bodyPlaceholder='Its output will appear here.'
                    inputPlaceholder='Send a request...'
                    aiTag='portfolio_masterpiece'
                />
            }
        </section>
    );
};

export default Masterpiece;
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState, useCallback } from 'react';
import { workExperiences } from './constants';
import { OrbitControls } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import Developer from '../components/Developer';
import Chat from '../components/Chat';

const Accomplishments = () => {

    const [animationName, setAnimationName] = useState('');

    const [isChatVisible, setIsChatVisible] = useState(false);
    const [selectedAccomplishmentId, setSelectedAccomplishmentId] = useState(null);

    const handleAccomplishmentClick = (id, animation) => {
        if (selectedAccomplishmentId === id && isChatVisible) {
            setIsChatVisible(false);
            setSelectedAccomplishmentId(null);
            setAnimationName(''); 
        } else {
            setAnimationName(animation.toLowerCase()); 
            setSelectedAccomplishmentId(id); 
            setIsChatVisible(true); 
        }
    };


    const handleAnimationFinished = useCallback(() => {

        setAnimationName('');
    }, []);

    return (
        <section className='c-space my-20' id="accomplishments">
            <div className='w-full text-white-600'>
                <h3 className='head-text'><span className='text-slateGray'>Accomplishments</span></h3>
                <div className='work-container'>
                    <div className="work-canvas">
                        <Canvas>
                            <ambientLight intensity={7} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                            <directionalLight position={[10, 10, 10]} intensity={1} />
                            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
                            <Suspense fallback={<CanvasLoader />}>

                                <Developer
                                    position-y={-3}
                                    scale={3}
                                    animationName={animationName}
                                    onAnimationFinished={handleAnimationFinished}
                                />
                            </Suspense>
                        </Canvas>
                    </div>
                    <div className='work-content'>
                        <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                            {workExperiences.map(({ name, pos, id, icon, duration, title, animation, link }) => (
                                <div
                                    key={id}
                                    className='work-content_container group'

                                    onClick={() => handleAccomplishmentClick(id, animation)}
                                >
                                    <div className='flex flex-col h-full justify-start items-center py-2'>
                                        <div className="work-content_logo">
                                            <img src={icon} alt='logo' className='w-full h-full' />
                                        </div>
                                        <div className='work-content_bar' />
                                    </div>
                                    <div className="sm:p-5 px-2.5 py-5">
                                        <p className='font-bold text-white-800'><a href={link} target='_blank' rel="noopener noreferrer">{name}</a></p>
                                        <p className='text-sm mb-5'>{pos} | {duration}</p>
                                        <p className='group-hover:text-white transition ease-in-out duration-500'>{title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isChatVisible &&
                (
                    selectedAccomplishmentId === 1 ? (
                        <Chat
                            title={`Chat About the Human AGI`}
                            bodyPlaceholder='Its output will appear here.'
                            inputPlaceholder='Send a request...'
                            aiTag='portfolio_accomplishments'
                        />
                    ) : selectedAccomplishmentId === 2 ? (
                        <Chat
                            title={`Chat About the Robot`}
                            bodyPlaceholder='Its output will appear here.'
                            inputPlaceholder='Send a request...'
                            aiTag='portfolio_accomplishments'
                        />
                    ) : selectedAccomplishmentId === 3 && (
                        <Chat
                            title={`Chat About the Mechatronic Pen`}
                            bodyPlaceholder='Its output will appear here.'
                            inputPlaceholder='Send a request...'
                            aiTag='portfolio_accomplishments'
                        />
                    )

                )}




        </section >
    );
}

export default Accomplishments;
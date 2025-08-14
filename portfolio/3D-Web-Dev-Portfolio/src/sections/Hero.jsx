import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import CanvasLoader from '../components/CanvasLoader';
import { useMediaQuery } from 'react-responsive'; // Correct import
import { calculateSizes } from './constants';
import Target from '../components/Target';
import ReactLogo from '../components/ReactLogo';
import Rings from '../components/Rings';
import HeroCamera from '../components/HeroCamera'; // Your existing HeroCamera
import Button from '../components/Button';
import FutureKeyboard from '../components/FutureKeyboard';
import Apple from '../components/Apple';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap/all';
import * as THREE from 'three';

// Define your desired default camera position and target here
const DEFAULT_CAMERA_POSITION = [0, 0, 20];
const DEFAULT_LOOK_AT_TARGET = [0, 0, 0];

const SceneReadyIndicator = ({ onSceneReady }) => {
    const { gl } = useThree();
    useEffect(() => {
        // This useEffect will run once the entire R3F scene (including models) is mounted and ready
        // 'gl' (WebGLRenderer) is a good proxy for the scene being initialized.
        if (gl) {
            console.log("3D Scene is fully loaded and mounted!");
            onSceneReady(true);
        }
    }, [gl, onSceneReady]); // Depend on gl and onSceneReady callback
    return null; // This component doesn't render anything visually
};

// This component encapsulates all 3D scene logic
const SceneCameraAndControls = ({ isInteractive3D, sizes, isMobile }) => {
    const { camera } = useThree();
    const orbitControlsRef = useRef();

    // Effect for the initial setup of the camera or when interactivity changes
    useEffect(() => {
        // When interactivity is turned OFF, call OrbitControls' reset method
        if (!isInteractive3D && orbitControlsRef.current) {
            orbitControlsRef.current.reset(); // This is the key change!
            // Ensure camera is looking at the target after reset
            camera.lookAt(new THREE.Vector3(...DEFAULT_LOOK_AT_TARGET));
        }

        // Optional: If HeroCamera has specific non-interactive animations (like slight auto-rotate)
        // that need to start/stop with isInteractive3D, this is where you'd manage them,
        // ensuring they don't conflict with OrbitControls.
        // For now, HeroCamera is just a component that's rendered when !isInteractive3D
        // and is expected to manage its own camera-related animations if any.
    }, [isInteractive3D, camera]); // Depend on isInteractive3D to trigger reset

    return (
        <>
            {/* The main camera. It's always here and remains default. */}
            <PerspectiveCamera makeDefault position={DEFAULT_CAMERA_POSITION} />

            {/* OrbitControls is ALWAYS rendered, but enabled/disabled based on state */}
            <OrbitControls
                ref={orbitControlsRef} // Attach ref to access its methods
                enabled={isInteractive3D} // This prop controls interactivity!
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                autoRotate={false}
                dampingFactor={0.1} // Keep damping for smooth user interaction
                mouseButtons={{ LEFT: 0, MIDDLE: -1, RIGHT: -1 }}
                target={new THREE.Vector3(...DEFAULT_LOOK_AT_TARGET)} // Set the target for OrbitControls
            // You can also set initial position if desired, but makeDefault will use the PerspectiveCamera position
            // position={DEFAULT_CAMERA_POSITION} // Not strictly necessary if PerspectiveCamera has it
            />

            {/* HeroCamera only runs if NOT interactive.
                Crucially: Your HeroCamera component should NOT render 3D models like FutureKeyboard.
                It should only contain camera-related logic or animations, and return null.
            */}
            {!isInteractive3D && (
                <HeroCamera isMobile={isMobile} /* Pass any props your HeroCamera needs */ />
            )}

            {/* All 3D models are rendered unconditionally here */}
            <FutureKeyboard
                position={sizes.deskPosition}
                rotation={[1.57, 0, 0]}
                scale={sizes.deskScale}
            />
            {/*}
            <group>

                <Target position={sizes.targetPosition} isInteractive={isInteractive3D} />
                <ReactLogo position={sizes.reactLogoPosition} isInteractive={isInteractive3D} />
                <Apple position={sizes.cubePosition} isInteractive={isInteractive3D} />
                <Rings position={sizes.ringPosition} isInteractive={isInteractive3D} />
            </group>
             */}
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
        </>
    );
};

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const isSmall = useMediaQuery({ maxWidth: 440 });

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    const [isInteractive3D, setIsInteractive3D] = useState(false);

    const [sceneLoaded, setSceneLoaded] = useState(false); // Initially false, image is visible

    useGSAP(() => {
        gsap.set("#hero_tag", { x: -100, opacity: 0 });
        gsap.to("#hero_tag", {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        });
        gsap.fromTo("#hero_name", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    }, []);

    const handleResetView = () => {
        // Simply turn off interactivity. OrbitControls will handle its own reset.
        setIsInteractive3D(false);
    };

    const handleSceneReady = React.useCallback(() => {
        setSceneLoaded(true);
    }, []);

    return (
        <section
            className="min-h-screen w-full flex flex-col relative overflow-hidden" //bg-gray-900
            id="home"
        >
            <div className="absolute top-1/3 left-0 right-0 z-10 flex flex-col justify-center items-center text-center p-4 transform -translate-y-1/2">
                <p id="hero_name" className="sm:text-5xl text-3xl font-extrabold text-white mb-4 opacity-0 font-generalsans">
                    Dillon Carey
                </p>
                <p className="sm:text-3xl text-2xl font-medium text-gray-300">
                    <span className="inline-block" id="hero_tag">Director of Intelligence</span>
                    <span className="block text-xl mt-2 text-gray-400">Leveraging Data & AI for Strategic Solutions</span>
                </p>
            </div>


            <div className="w-full h-full absolute inset-0 z-0">
                {/* The HTML placeholder image.
                    It will be rendered first and hidden once the 3D scene is ready.
                */}
                {!sceneLoaded && (
                    <div className="canvas-placeholder-container">
                        <p className='text-white'>The Future, Rendered.</p>
                    </div>
                )}

                {/* The Canvas component that renders your 3D scene */}
                <Canvas
                    className='w-full h-full'
                    style={{ opacity: sceneLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }} // Fade in Canvas
                >
                    <Suspense fallback={null}> {/* Fallback can be null or a very minimal loader now */}
                        {/* Component to signal when the scene is ready */}
                        <SceneReadyIndicator onSceneReady={handleSceneReady} />
                        <SceneCameraAndControls
                            isInteractive3D={isInteractive3D}
                            sizes={sizes}
                            isMobile={isMobile}
                        />
                    </Suspense>
                </Canvas>
            </div>

            <div className="absolute bottom-7 left-0 right-0 w-full z-10 flex flex-col sm:flex-row justify-center items-center gap-4 c-space">
                <a href="#chat" className="w-fit">
                    <Button name="Chat" containerClass="sm:w-fit w-full sm:min-w-96" />
                </a>
                {!isInteractive3D && (
                    <button
                        onClick={() => setIsInteractive3D(true)}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                        style={{ minWidth: 'min(96px, 100%)' }}
                    >
                        Explore
                    </button> //bg-blue-500 hover:bg-blue-700 Intelligize
                )}
                {isInteractive3D && (
                    <button
                        onClick={handleResetView}
                        className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                        style={{ minWidth: 'min(96px, 100%)' }}
                    >
                        Reset
                    </button>
                )}
            </div>
        </section>
    );
};

export default Hero;
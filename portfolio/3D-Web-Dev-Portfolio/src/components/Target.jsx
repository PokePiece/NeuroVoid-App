// components/Target.jsx

import { useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react'; // Import useEffect
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Target = (props) => {
    // Destructure isInteractive from props
    const { isInteractive, ...restProps } = props;

    const targetRef = useRef();
    // Load the GLTF model here
    const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf');

    const animationTween = useRef(null); // Ref to store the GSAP tween

    // useGSAP to create and initially pause the animation tween
    useGSAP(() => {
        // Ensure the mesh ref is available before trying to animate it
        if (!targetRef.current) return;

        // Kill any existing tweens on the object's position to prevent conflicts
        gsap.killTweensOf(targetRef.current.position);

        // Create the floating animation tween
        animationTween.current = gsap.to(targetRef.current.position, {
            y: props.position[1] + 0.5, // Animate 0.5 units above its initial Y position
            duration: 1.5,
            repeat: -1, // Infinite repeat
            yoyo: true, // Go back and forth
            paused: true, // Start paused initially
            ease: "sine.inOut" // Smooth in and out for a floating effect
        });

    }, [props.position]); // Re-run this setup if the base position prop changes

    // useEffect to control the tween's playback based on the isInteractive prop
    useEffect(() => {
        if (animationTween.current) { // Ensure the tween has been created
            if (isInteractive) {
                animationTween.current.play(); // Start or resume the animation
            } else {
                animationTween.current.pause(); // Pause the animation
                // Smoothly animate the target back to its original Y position
                gsap.to(targetRef.current.position, {
                    y: props.position[1], // Original Y position from props
                    duration: 0.5, // Duration for the snap-back animation
                    ease: "power2.out" // Smooth ease for the snap-back
                });
            }
        }
    }, [isInteractive, props.position]); // Re-run this effect when isInteractive changes, or if position changes

    return (
        // Pass any other props (like position) to the mesh
        <mesh {...restProps} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
            <primitive object={scene} />
        </mesh>
    );
}

// Preload the model to ensure it's loaded by the time the component needs it
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf');

export default Target;
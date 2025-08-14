// components/Rings.jsx

import { useGSAP } from '@gsap/react';
import { Center, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useCallback, useRef, useEffect, useState } from 'react'; // Import useEffect and useState if needed

const Rings = ({ position, isInteractive }) => { // Accept isInteractive prop
  const refList = useRef([]);
  // Use a state to track if refs are ready, or ensure useGSAP runs after render
  const [refsReady, setRefsReady] = useState(false);

  const getRef = useCallback((mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
      // If all meshes are collected, set refsReady to true
      if (refList.current.length === 4) { // Assuming 4 rings as per Array.from({ length: 4 })
        setRefsReady(true);
      }
    }
  }, []);

  const texture = useTexture('textures/rings.png');
  const animationTimeline = useRef(null); // Ref to store the GSAP timeline

  // useEffect to set initial positions of rings. This should happen once on mount
  // or if the parent's 'position' prop changes.
  useEffect(() => {
    if (refsReady && position) {
      refList.current.forEach((r) => {
        // Only set position if it hasn't been set by another process (e.g., OrbitControls target)
        // Or if you explicitly want them to snap to this position on every interaction toggle.
        r.position.set(position[0], position[1], position[2]);
        // Also set initial rotation here if they should start from a specific angle
        r.rotation.set(0,0,0); // Assuming initial rotation is [0,0,0]
      });
    }
  }, [refsReady, position]); // Re-run if refs are ready or position changes

  // useGSAP to create and initially pause the animation timeline
  // This effect should ideally run only once after all refs are collected.
  useGSAP(
    () => {
      if (!refsReady) return; // Ensure all refs are collected before creating timeline

      // Kill any existing tweens on the objects to prevent conflicts if this re-runs
      // This is important if useGSAP happens to re-run
      refList.current.forEach((r) => {
        gsap.killTweensOf(r.rotation);
      });

      // Create the timeline and store it in the ref
      animationTimeline.current = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.5,
        paused: true, // Start paused initially
      });

      // Add the rotation animation to the timeline
      animationTimeline.current.to(
        refList.current.map((r) => r.rotation),
        {
          y: `+=${Math.PI * 2}`, // Full rotation
          x: `+=${Math.PI * 2}`, // Ensure consistent rotation direction for repeat
          duration: 2.5,
          stagger: {
            each: 0.15,
          },
          ease: 'none', // Linear rotation for continuous spin
        },
      );
    },
    // The dependencies array for useGSAP is critical.
    // It should ideally run only once after all refs are ready.
    // Using refsReady and refList.current.length will ensure this.
    { dependencies: [refsReady, refList.current.length] },
  );

  // useEffect to control the timeline playback based on isInteractive prop
  useEffect(() => {
    if (animationTimeline.current && refsReady) { // Ensure refs and timeline are ready
      if (isInteractive) {
        animationTimeline.current.play(); // Start or resume the animation
      } else {
        animationTimeline.current.pause(); // Pause the animation
        // Optional: Reset rotation to its initial state when paused
        // This makes sure it snaps back cleanly when interaction ends.
        refList.current.forEach((r) => {
          gsap.to(r.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5, // Smooth snap back
            ease: "power2.out"
          });
        });
      }
    }
  }, [isInteractive, refsReady]); // Re-run this effect whenever isInteractive or refsReady changes

  return (
    <Center>
      <group scale={0.5}>
        {Array.from({ length: 4 }, (_, index) => (
          <mesh key={index} ref={getRef}>
            <torusGeometry args={[(index + 1) * 0.5, 0.1]}></torusGeometry>
            <meshMatcapMaterial matcap={texture} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </Center>
  );
};

export default Rings;
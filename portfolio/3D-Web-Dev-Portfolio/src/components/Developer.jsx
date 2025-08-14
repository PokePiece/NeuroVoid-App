// components/Developer.jsx
import React, { useEffect, useRef } from 'react';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE for LoopOnce

// Make sure to receive the onAnimationFinished prop
export default function Developer({ animationName, onAnimationFinished, ...props }) {
    const { nodes, materials } = useGLTF('/models/chopinavatar.glb');
    const group = useRef();

    const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx');
    const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx');
    const { animations: clappingAnimation } = useFBX('/models/animations/clapping.fbx');
    const { animations: victoryAnimation } = useFBX('/models/animations/victory.fbx');

    idleAnimation[0].name = "idle";
    saluteAnimation[0].name = "salute";
    clappingAnimation[0].name = "clapping";
    victoryAnimation[0].name = "victory";

    const allAnimations = [
        idleAnimation[0],
        saluteAnimation[0],
        clappingAnimation[0],
        victoryAnimation[0]
    ];

    const { actions, mixer } = useAnimations(allAnimations, group); // Destructure mixer here

    useEffect(() => {
        // Stop all current animations first to ensure a clean transition
        Object.values(actions).forEach(action => {
            action.stop(); // Stop immediately, we'll reset/play the new one
        });

        // Only play if a valid animationName is provided
        if (animationName && actions[animationName]) {
            const currentAction = actions[animationName];

            // Set the animation to play only once (THREE.LoopOnce)
            currentAction.setLoop(THREE.LoopOnce); // Or simply 0, as THREE.LoopOnce is 0

            // Reset and play from the beginning
            currentAction.reset().fadeIn(0.5).play();

            // Define a listener for when this specific animation finishes
            const onFinished = (e) => {
                // Ensure the event is for the action that just completed
                if (e.action === currentAction) {
                    // Call the callback prop to notify the parent (Experience.jsx)
                    if (onAnimationFinished) {
                        onAnimationFinished();
                    }
                    // Remove the listener after it's served its purpose
                    // to prevent it from firing multiple times unnecessarily
                    mixer.removeEventListener('finished', onFinished);
                }
            };

            // Add the event listener to the mixer
            mixer.addEventListener('finished', onFinished);

            // Cleanup function: remove the event listener if the component unmounts
            // or if animationName changes before the current animation finishes
            return () => {
                mixer.removeEventListener('finished', onFinished);
                // Optional: Fade out the current action on cleanup if you want a smooth stop
                // if (currentAction && currentAction.isRunning()) {
                //     currentAction.fadeOut(0.5);
                // }
            };
        } else {
            // This block handles the state when animationName is empty or invalid.
            // Since you want it to return to a static pose, no action is needed here
            // unless you have a specific 'idle' animation you want to play.
            // If you did, you'd put something like:
            // if (actions['idle']) {
            //     actions['idle'].reset().fadeIn(0.5).play();
            // }
        }
    }, [animationName, actions, mixer, onAnimationFinished]); // Ensure all dependencies are correct

    return (
        <group {...props} dispose={null} ref={group}>
            <primitive object={nodes.Hips} />
            <skinnedMesh
                name="EyeLeft"
                geometry={nodes.EyeLeft.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeLeft.skeleton}
                morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            />
            <skinnedMesh
                name="EyeRight"
                geometry={nodes.EyeRight.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeRight.skeleton}
                morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Head"
                geometry={nodes.Wolf3D_Head.geometry}
                material={materials.Wolf3D_Skin}
                skeleton={nodes.Wolf3D_Head.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Teeth"
                geometry={nodes.Wolf3D_Teeth.geometry}
                material={materials.Wolf3D_Teeth}
                skeleton={nodes.Wolf3D_Teeth.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Facewear.geometry}
                material={materials.Wolf3D_Facewear}
                skeleton={nodes.Wolf3D_Facewear.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Headwear.geometry}
                material={materials.Wolf3D_Headwear}
                skeleton={nodes.Wolf3D_Headwear.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                material={materials.Wolf3D_Outfit_Bottom}
                skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                material={materials.Wolf3D_Outfit_Footwear}
                skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Top.geometry}
                material={materials.Wolf3D_Outfit_Top}
                skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
        </group>
    );
}

useGLTF.preload('/models/chopinavatar.glb');
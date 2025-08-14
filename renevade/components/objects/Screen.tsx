import React, { useState, useEffect, useRef } from 'react';
import { useVideoTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

const Screen = () => {
    const [isOn, setIsOn] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // This is the video element for audio control.
    const audioVideoRef = useRef<HTMLVideoElement | null>(null);

    // This hook creates its own video element for the visual texture.
    const texture = useVideoTexture('/harrell1.mp4');

    // Create the audio video element only once on mount.
    useEffect(() => {
        const el = document.createElement('video');
        el.src = '/harrell1.mp4';
        el.crossOrigin = 'Anonymous';
        el.loop = true;
        el.muted = true;
        el.playsInline = true;
        audioVideoRef.current = el;

        return () => {
            if (audioVideoRef.current) {
                audioVideoRef.current.pause();
            }
        };
    }, []);

    // This effect synchronizes the playback of the audio and visual videos.
    useEffect(() => {
        const audioVideo = audioVideoRef.current;
        const textureVideo = texture.source.data as HTMLVideoElement;

        if (!audioVideo || !textureVideo) return;

        if (isPlaying) {
            audioVideo.play();
            textureVideo.play();
        } else {
            audioVideo.pause();
            textureVideo.pause();
        }
    }, [isPlaying, texture]);

    const handleTurnOnOff = (event: any) => {
        event.stopPropagation();
        setIsOn(prev => {
            const nextIsOn = !prev;
            const audioVideo = audioVideoRef.current;
            const textureVideo = texture.source.data as HTMLVideoElement;

            if (!audioVideo || !textureVideo) return prev;

            if (nextIsOn) {
                // When turning on, reset both videos to the beginning.
                audioVideo.currentTime = 0;
                textureVideo.currentTime = 0;
                audioVideo.muted = false;
                setIsPlaying(true); // This triggers the useEffect to play both videos.
            } else {
                setIsPlaying(false); // This triggers the useEffect to pause both videos.
            }
            return nextIsOn;
        });
    };

    const handlePlayPause = (event: any) => {

        if (!isOn) return;
        setIsPlaying(prev => !prev);
    };

    const blackMaterial = new THREE.MeshStandardMaterial({ color: 'indigo' });
    const videoMaterial = new THREE.MeshStandardMaterial({ map: texture });

    return (
        <group>
            <mesh position={[-7, 3, 10]} rotation={[0, 1.6, 0]} castShadow>
                <boxGeometry args={[10, 5, 0.2]} />
                <meshStandardMaterial color='#999' />
            </mesh>

            <mesh
                position={[-6.99, 3, 10]}
                rotation={[0, 1.6, 0]}
                castShadow
                onClick={handleTurnOnOff}
                onContextMenu={handlePlayPause}
            >
                <boxGeometry args={[9.7, 4.8, 0.2]} />
                <primitive attach="material" object={isOn ? videoMaterial : blackMaterial} />
            </mesh>

          
        </group>
    );
};

export default Screen;
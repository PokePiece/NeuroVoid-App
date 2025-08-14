'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sky, Text } from '@react-three/drei';

// --- AI State Interface (must match Python's AIState model) ---
interface AIState {
    id: string;
    position: { x: number; y: number; z: number };
    orientation: { qx: number; qy: number; qz: number; qw: number };
    mood: string;
    last_thought: string;
}

// --- Component for the Embodied AI ---
function EmbodiedAI({ aiState }: { aiState: AIState | null }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<THREE.Mesh>(null);

    // Update position and thought bubble based on AI state
    useEffect(() => {
        if (aiState && meshRef.current) {
            meshRef.current.position.set(aiState.position.x, aiState.position.y, aiState.position.z);
            // You can add rotation here if you want to use aiState.orientation
            // meshRef.current.quaternion.set(aiState.orientation.qx, aiState.orientation.qy, aiState.orientation.qz, aiState.orientation.qw);
        }
    }, [aiState]);

    // Make text always face the camera
    useFrame(({ camera }) => {
        if (textRef.current) {
            textRef.current.quaternion.copy(camera.quaternion);
        }
    });

    if (!aiState) return null; // Don't render until first state is received

    return (
        <>
            {/* AI Sphere */}
            <mesh ref={meshRef} castShadow>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={aiState.mood === "curious" ? "cyan" : aiState.mood === "observant" ? "yellow" : "orange"} />
            </mesh>
            {/* Thought Bubble */}
            <Text
                ref={textRef}
                position={[aiState.position.x, aiState.position.y + 1, aiState.position.z]} // Above the sphere
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
                maxWidth={3} // Wrap text
            >
                {aiState.last_thought}
            </Text>
        </>
    );
}

// --- Main Canvas Wrapper Component ---
export default function AICanvasWrapper() {
    const [aiState, setAiState] = useState<AIState | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8002/ws/ai_state"); // Connect to your Python backend

        ws.onopen = () => {
            console.log("WebSocket connected for AI state updates.");
        };

        ws.onmessage = (event) => {
            try {
                const receivedState: AIState = JSON.parse(event.data);
                setAiState(receivedState);
                // console.log("Received AI State:", receivedState); // For debugging
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected from AI state updates.");
            // Optional: Implement reconnect logic here if needed for robustness
        };

        ws.onerror = (error) => {
            console.error("WebSocket error for AI state:", error);
        };

        // Cleanup WebSocket on component unmount
        return () => {
            ws.close();
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <Canvas camera={{ position: [0, 5, 15], fov: 75 }} style={{ width: '100vw', height: '100vh' }}>
            <Suspense fallback={null}>
                <Sky
                    distance={450000}
                    sunPosition={[0, 1, 0]}
                    inclination={0}
                    azimuth={0.25}
                    mieCoefficient={0.005}
                    mieDirectionalG={0.8}
                    rayleigh={0.5}
                    turbidity={2}
                />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 20, 5]} intensity={0.8} castShadow />

                {/* Ground Plane */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[50, 50]} />
                    <meshStandardMaterial color="green" />
                </mesh>

                {/* Render the Embodied AI, passing the state */}
                <EmbodiedAI aiState={aiState} />

            </Suspense>
        </Canvas>
    );
}
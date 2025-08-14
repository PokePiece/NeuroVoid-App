'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import ClickableNode from './ClickableNode';
import RiftInstance from './RiftInstance';
import * as THREE from "three";
import Link from 'next/link';
import { Sky } from '@react-three/drei';
import BasicMovement from '@/components/BasicMovement'
import Avatar from '@/components/Avatar'
import SurrealAvatar from './SurrealAvatar';
import ChatOverlay from './ChatOverlay';
import { Text } from '@react-three/drei'
import InfoText from './InfoText';
import CoolText from './CoolText';
import { fetchChatResponse } from '@/lib/fetchChatResponse';
import House from './House';
import Computer from './Computer';
import Report from './Report';
import CapitalBuilding from './objects/CapitalBuilding';
import VoidTerminal from './objects/VoidTerminal';
import CoreOverlays from './CoreOverlays';
import InfoOverlays from './InfoOverlay';
import Book from './objects/Book';
import Chair from './objects/Chair';
import Chairs from './objects/Chairs';
import Pad from './objects/Pad';
import RealtimeOutput from './interfaces/RealtimeOutput';
import Desk from './objects/Desk';
import Paper from './objects/Paper';
import Laptop from './objects/Laptop';
import Tree from './objects/Tree';
import Screen from './objects/Screen';
import ScreenView from './objects/ScreenView';
import Remote from './objects/Remote';


export default function CanvasWrapper() {

    const [avatarPos, setAvatarPos] = useState<[number, number, number]>([4, 0, 13]);
    const [controlMode, setControlMode] = useState<'avatar' | 'free' | 'freehidden'>('avatar');
    const [isChatting, setIsChatting] = useState(false)
    const [chatActive, setChatActive] = useState(false)

    const [avatarSpeech, setAvatarSpeech] = useState<string | null>(null);
    const [surrealSpeech, setSurrealSpeech] = useState<string | null>(null);


    const [followingSurreal, setFollowingSurreal] = useState(false);
    const lastSurrealPos = useRef<[number, number, number]>([avatarPos[0] - 1, avatarPos[1], avatarPos[2] - 1])
    const [surrealPos, setSurrealPos] = useState<[number, number, number]>([3, 0, 5.1])

    const [showRift, setShowRift] = useState<boolean>(true);

    const [showVoidOverlay, setShowVoidOverlay] = useState<boolean>(false);
    const [showHumanAGI, setShowHumanAGI] = useState<boolean>(false)

    const [showVoidInfo, setShowVoidInfo] = useState<boolean>(false);
    const [showHumanAGIInfo, setShowHumanAGIInfo] = useState<boolean>(false);

    const [playMusic, setPlayMusic] = useState<boolean>(false);
    const [showMusicInfo, setShowMusicInfo] = useState<boolean>(false)

    const [showSurrealInfo, setShowSurrealInfo] = useState<boolean>(false);
    const [showPlayerInfo, setShowPlayerInfo] = useState<boolean>(false)

    const [showBookOverlay, setShowBookOverlay] = useState<boolean>(false)
    const [showBookInfo, setShowBookInfo] = useState<boolean>(false)

    const [showPadOverlay, setShowPadOverlay] = useState<boolean>(false)
    const [showPadInfo, setShowPadInfo] = useState<boolean>(false)

    const [showTailwindPaperOverlay, setShowTailwindPaperOverlay] = useState<boolean>(false)

    const [showLaptopOverlay, setShowLaptopOverlay] = useState<boolean>(false);
    const [showLaptopInfo, setShowLaptopInfo] = useState<boolean>(false);

    const [showScreen, setShowScreen] = useState<boolean>(false);

    //e.key.toLowerCase()
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'f' && !isChatting) setControlMode('free');
            if (e.key.toLowerCase() === 'x' && !isChatting) setControlMode('avatar');
            if (e.key === 'z' && !isChatting) setControlMode('freehidden')
            if (e.key === 'c' && !isChatting) {
                setChatActive(prev => !prev)
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isChatting]);

    if (followingSurreal) {
        lastSurrealPos.current = [avatarPos[0], avatarPos[1], avatarPos[2] - 5]
    }

    useEffect(() => {
        const disableContextMenu = (e: MouseEvent) => e.preventDefault();
        window.addEventListener('contextmenu', disableContextMenu);
        return () => window.removeEventListener('contextmenu', disableContextMenu);
    }, []);

    function SurrealFollower() {
        useFrame(() => {
            if (!followingSurreal) return;

            const target: [number, number, number] = [
                avatarPos[0] + 2,
                avatarPos[1],
                avatarPos[2] - 2,
            ];
            const speed = 0.05;

            setSurrealPos(([x, y, z]) => [
                x + (target[0] - x) * speed,
                y + (target[1] - y) * speed,
                z + (target[2] - z) * speed,
            ]);
        });

        return null;
    }

    const toggleRift = () => {
        console.log("Toggled")
        setShowRift(prev => !prev)
    }


    return (
        <>
            <Canvas
                //Default pos 5, 5, 5 fov 75
                camera={{ position: [0, 3, 10], fov: 75 }}
                style={{ width: '100%', height: '100%' }}
            >

                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[500, 500]} />
                    <meshStandardMaterial color="green" />
                </mesh>

                {(controlMode === 'free' || controlMode === 'freehidden') && <BasicMovement />}
                {(controlMode === 'free' || controlMode === 'avatar') && (
                    <Avatar
                        position={avatarPos}
                        setAvatarPos={setAvatarPos}
                        active={controlMode === 'avatar' && !isChatting}
                        text={avatarSpeech}
                        onContextMenu={() => setShowPlayerInfo(prev => !prev)}
                    />
                )}

                <mesh position={[0, 2.5, -10]} castShadow>
                    <boxGeometry args={[10, 5, 1]} />
                    <meshStandardMaterial color="#999" />
                </mesh>
                <CoolText />
                <Computer showHumanAGIInfo={showHumanAGIInfo} setShowHumanAGIInfo={setShowHumanAGIInfo} showHumanAGIOverlay={showHumanAGI} setShowHumanAGIOverlay={setShowHumanAGI} />
                <House />
                <Desk />
                <Report />
                <Tree />
                {showScreen && <Screen /> }
                <Remote setScreen={setShowScreen} />
                <Laptop setShowLaptopInfo={setShowLaptopInfo} showLaptopOverlay={showLaptopOverlay} setIsChatting={setIsChatting} setShowLaptopOverlay={setShowLaptopOverlay} />
                <Paper setShowTailwindPaperOverlay={setShowTailwindPaperOverlay} setIsChatting={setIsChatting} />
                <CapitalBuilding />
                <Pad setIsChatting={setIsChatting} setShowPadOverlay={setShowPadOverlay} setShowPadInfo={setShowPadInfo} />
                <Chairs userSit={setAvatarPos} surrealSit={setSurrealPos} />
                <VoidTerminal setIsChatting={setIsChatting} setShowVoidInfo={setShowVoidInfo} showVoidOverlay={showVoidOverlay} setShowVoidOverlay={setShowVoidOverlay} />
       
                <Book setShowBookInfo={setShowBookInfo} setShowBookOverlay={setShowBookOverlay} setIsChatting={setIsChatting} />
                <Sky
                    distance={450000}
                    sunPosition={[0, 1, 0]}
                    inclination={0}       // Horizon-centered light
                    azimuth={0.25}
                    mieCoefficient={0.005}
                    mieDirectionalG={0.8}
                    rayleigh={0.5}
                    turbidity={2}
                />

                <color attach="background" args={["#144d86"]} />
                <fog attach="fog" args={["#134d86", 10, 200]} />

                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 20, 5]} intensity={0.8} castShadow />



                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 7.5]} intensity={1} />



                    <mesh position={new THREE.Vector3(0, 1, 0)}
                        onClick={() => setPlayMusic(prev => !prev)}
                        onContextMenu={() => setShowMusicInfo(prev => !prev)}
                    >
                        <boxGeometry />
                        <meshStandardMaterial color="#0077ff" />
                    </mesh>



                </Suspense>
                <ClickableNode
                    position={[3, 0.3, 0]}
                    title="What is Webtrix?"
                    onClick={() => toggleRift()}
                />
                {showRift &&
                    <>

                        <RiftInstance
                            center={new THREE.Vector3(0, 1, 0)}
                            height={3}
                            offset={new THREE.Vector3(-10, 1, 0)}
                            rotation={[0, 1, 0]}
                        />
                        <Suspense fallback={null}>
                            <Text
                                position={new THREE.Vector3(-10, 6, 0)}
                                anchorX="center"
                                anchorY="middle"
                                color="black"
                                fontSize={0.4}
                                onClick={() => window.location.href = 'http://localhost:3000'}

                            >
                                ⚫ Exit Webspace
                            </Text>
                        </Suspense>
                    </>


                }


                <SurrealAvatar
                    position={surrealPos}
                    active={followingSurreal}
                    onClick={() => setFollowingSurreal(!followingSurreal)}
                    text={surrealSpeech}
                    onContextMenu={() => setShowSurrealInfo(prev => !prev)}
                />
                <SurrealFollower />
                <InfoText />

            </Canvas>
            {playMusic && <audio src='/marling1.mp3' autoPlay />}
            
            <CoreOverlays
                showVoidOverlay={showVoidOverlay}
                setShowVoidOverlay={setShowVoidOverlay}
                showHumanAGIOverlay={showHumanAGI}
                setShowHumanAGIOverlay={setShowHumanAGI}
                setIsChatting={setIsChatting}
                showBookOverlay={showBookOverlay}
                setShowBookOverlay={setShowBookOverlay}
                showPadOverlay={showPadOverlay}
                setShowPadOverlay={setShowPadOverlay}
                setShowTailwindPaperOverlay={setShowTailwindPaperOverlay}
                showTailwindPaperoverlay={showTailwindPaperOverlay}
                showLaptopOverlay={showLaptopOverlay}
                setShowLaptopOverlay={setShowLaptopOverlay}
                isChatting={isChatting}
            />
            <InfoOverlays
                showVoidInfo={showVoidInfo}
                setShowVoidInfo={setShowVoidInfo}
                showHumanAGIInfo={showHumanAGIInfo}
                setShowHumanAGIInfo={setShowHumanAGIInfo}
                showMusicInfo={showMusicInfo}
                setShowMusicInfo={setShowMusicInfo}
                showSurrealInfo={showSurrealInfo}
                setShowSurrealInfo={setShowSurrealInfo}
                showPlayerInfo={showPlayerInfo}
                setShowPlayerInfo={setShowPlayerInfo}
                showBookInfo={showBookInfo}
                setShowBookInfo={setShowBookInfo}
                showPadInfo={showPadInfo}
                setShowPadInfo={setShowPadInfo}
                showLaptopInfo={showLaptopInfo}
                setShowLaptopInfo={setShowLaptopInfo}
            />
            {chatActive && (
                <ChatOverlay
                    isChatting={isChatting}
                    tag='webtrix_general'
                    setIsChatting={setIsChatting}
                    onUserMessage={(msg) => {
                        setAvatarSpeech(msg);
                        setTimeout(() => setAvatarSpeech(null), 3000);
                    }}
                    onAiMessage={(msg) => {
                        setSurrealSpeech(msg);
                        setTimeout(() => setSurrealSpeech(null), 3000);
                    }}
                />
            )}
        </>
    );
}

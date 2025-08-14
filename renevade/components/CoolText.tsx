import { fetchChatResponse } from '@/lib/fetchChatResponse'
import { Text } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'

export default function CoolText() {


    const prompt = 'What is the latest news in AI/Intelligence/Neurotech? Create an interesting and relevant report. Try to make it unique, and also bridge it to disparate elements in AI Development to refresh it each time it\'s generated. Style it like an entertaining yet highly informative and information-rich news deliverable. Limit it to 400 characters, and create two paragraphs. Title the report "NeuroSpark Newsflash".'
    const tag = 'webtrix_general'

    const [newsText, setNewsText] = useState("Loading...")

    useEffect(() => {
        fetchChatResponse(prompt, tag).then(setNewsText)
    }, [])

    return (
        <Suspense fallback={null}>
            <group position={[-15, 8, 15]} rotation={[0, 1.6, 0]}>
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[40, 15]} />
                    <meshBasicMaterial color="#000000cc" /> {/* semi-transparent black */}
                </mesh>
                <Text
                    position={[0, 6, 0]}
                    fontSize={1}
                    color="#236E79"
                    anchorX="center"
                    anchorY="middle"
                    //onClick={() => window.open('https://dilloncarey.com')}
                    //onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
                    //onPointerOut={(e) => (document.body.style.cursor = 'default')}
                >
                    AI/Intelligence/Neurotech News
                </Text>

                <Text
                    position={[0, 0, 0]}
                    fontSize={0.5}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={35}
                >
                    {newsText}

                </Text>


            </group>
        </Suspense >
    )
}

import { fetchChatResponse } from '@/lib/fetchChatResponse'
import { Text } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'

export default function Report() {


    const prompt = 'Generate a report about my current AI Developer progression, highlighting the progress I\'m making on technologies, skills and areas to improve, and new ideas you have for me to feature in my work. Currently, I\'m developing an embedded AGI system, a cloud intelligence structure, and a 3D BCI known as the Webtrix, on which you\'re well-versed. I use tools like ChatGPT, VSCode, Git, Jira, Agile/Scum. I\m especially looking for ways to combine my embedded intelligence AGI systems with my cloud intelligence structure and Webtrix human interface. Keep it concise, no longer than 250 characters, and one or two paragraphs.'
    const tag = 'webtrix_general'

    const [reportText, setReportText] = useState("Loading...")

    useEffect(() => {
        fetchChatResponse(prompt, tag).then(setReportText)
    }, [])

    return (
        <Suspense fallback={null}>
            <group position={[15, 6, 5]} rotation={[0, -0.7, 0]}>
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[20, 10]} />
                    <meshBasicMaterial color="#4e6f7b" /> {/* semi-transparent black */}
                </mesh>
                <Text
                    position={[0, 3.5, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    //onClick={() => window.open('https://dilloncarey.com')}
                    //onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
                    //onPointerOut={(e) => (document.body.style.cursor = 'default')}
                >
                    Report
                </Text>

                <Text
                    position={[0, -.5, 0]}
                    fontSize={0.33}
                    color="#cbd5da"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={17}
                >
                    {reportText}

                </Text>


            </group>
        </Suspense >
    )
}

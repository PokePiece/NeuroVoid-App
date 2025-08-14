import { useEffect, useState, useRef } from 'react';

interface StreamMessage {
    type: string;
    message?: string;
    goal?: string;
    result?: string;
}

export default function RealtimeOutput() {
    const [messages, setMessages] = useState<StreamMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLifeRunning, setIsLifeRunning] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {

        if (isLifeRunning) {
            const eventSource = new EventSource('http://localhost:8002/life_stream');

            eventSource.onopen = () => {
                console.log("SSE connection opened.");
            };

            eventSource.onmessage = (event) => {
                try {
                    const newData: StreamMessage = JSON.parse(event.data);
                    setMessages((prevMessages) => [...prevMessages, newData]);
                } catch (e) {
                    console.error("Failed to parse SSE data:", e);
                }
            };

            eventSource.onerror = (error) => {
                console.error('EventSource failed:', error);
                setIsLifeRunning(false); 
                eventSource.close();
            };

            return () => {
                eventSource.close();
            };
        }
    }, [isLifeRunning]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInteract = async () => {
        if (!userInput.trim()) return;

        try {
            const response = await fetch('http://localhost:8002/interact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: userInput }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages((prevMessages) => [...prevMessages, { type: "user_interaction", message: data.response }]);
            setUserInput(''); 
        } catch (error) {
            console.error("Error interacting with API:", error);
            setMessages((prevMessages) => [...prevMessages, { type: "error", message: `Interaction failed: ${error}` }]);
        }
    };

    return (
          <div className="p-5 font-mono bg-gray-900 text-gray-200 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-center">AI Core Intelligence Dashboard</h1>
            {!isLifeRunning && (
                <div className="flex justify-center mb-4">
                    <button 
                        onClick={() => setIsLifeRunning(true)} 
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Start Life Process
                    </button>
                </div>
            )}
            <hr className="border-gray-700 my-4" />
            <div className="border border-gray-700 h-[600px] overflow-y-scroll p-4 rounded-lg bg-gray-800 shadow-inner">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500">Waiting for output...</p>
                ) : (
                    messages.map((item, index) => (
                        <div key={index} className="mb-4 p-3 bg-gray-700 rounded-md">
                            <strong className="text-blue-400">[{item.type.toUpperCase()}]</strong>
                            {item.message && <p className="mt-1 text-gray-300">{item.message}</p>}
                            {item.goal && <p className="mt-1 text-gray-400 italic">Goal: {item.goal}</p>}
                            {item.result && <p className="mt-1 text-gray-300 break-words">Result: {item.result.slice(0, 500)}...</p>}
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-5 flex space-x-2">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInteract()}
                    placeholder="Enter command or prompt..."
                    className="flex-grow p-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={handleInteract} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
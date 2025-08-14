import { systemPrompts } from "@/lib/systemPrompts";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*", // Replace * with your domain if needed
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    const tag = body.tag as keyof typeof systemPrompts;
    const SYSTEM_PROMPT = systemPrompts[tag] || systemPrompts["general"];

    const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...body.messages,
    ];

    const response = await fetch("https://api.together.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "meta-llama/Llama-3-70b-chat-hf",
            messages,
            temperature: 0.7,
        }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
}





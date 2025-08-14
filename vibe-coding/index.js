import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) throw new Error("Add your OpenAI API key to .env");

async function getAgentPlan(task) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI assistant that turns user tasks into safe, step-by-step plans for automation. Only use harmless steps like fetching info or generating text." },
        { role: "user", content: task }
      ],
      temperature: 0.7
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}

async function run() {
  const task = process.argv.slice(2).join(" ");
  if (!task) {
    console.log("Usage: node index.js <your task>");
    process.exit(1);
  }

  console.log(`🤖 Planning for: "${task}"\n`);
  const plan = await getAgentPlan(task);
  console.log("Agent Plan:\n", plan);

  // TODO: Step execution logic (safe commands only)
}

run();

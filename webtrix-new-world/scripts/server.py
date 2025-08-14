import sys
import io
import time
import torch
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
from huggingface_hub import login
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
from typing import List, Dict, Any

# Load .env and configure Gemini client
load_dotenv()
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

# Hugging Face login
HF_TOKEN = os.getenv("HF_TOKEN")
login(token=HF_TOKEN)

# FastAPI app
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# stdout fix for utf-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load local Pythia model
model_name = "EleutherAI/pythia-410m"
print("Loading local Pythia model (bfloat16 for memory efficiency)...")
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="cpu",
    torch_dtype=torch.bfloat16
)
print("Pythia model loaded.")

# Track last Gemini call
last_gemini_request_time = 0
prime_directive = "You are a smart assistant. Combine local and cloud reasoning for answers.\n"

class ChatRequest(BaseModel):
    message: str
    tone: str = "realistic"
    style: str = "technical"

def generate_local(prompt, profile):
    system_prompt = f"You're a {profile['tone']} assistant. Be {profile['style']}."
    full_prompt = system_prompt + "\nUser: " + prompt + "\nAI:"
    inputs = tokenizer(full_prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(
        **inputs,
        max_new_tokens=200,
        do_sample=True,
        top_p=0.9,
        temperature=0.7,
        repetition_penalty=1.2,
    )
    generated_tokens = outputs[0][inputs['input_ids'].size(1):]
    return tokenizer.decode(generated_tokens, skip_special_tokens=True)

def think_with_gemini(idea: str, purpose='', useful_knowledge='', tokens:int=500, brevity:bool=False):
    global last_gemini_request_time
    current_time = time.time()
    time_since_last_request = current_time - last_gemini_request_time

    if time_since_last_request < 2:
        time.sleep(2 - time_since_last_request)  # small delay to respect quota

    last_gemini_request_time = time.time()

    subject = purpose or "You are an intelligent assistant combining cloud and local reasoning."
    concise_message = 'Be concise.' if brevity else ''
    prompt_text = prime_directive + subject + "\nUser: " + idea + "\n" + useful_knowledge + concise_message

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt_text
        )
        return response.text
    except Exception as e:
        return f"[Gemini Error: {str(e)}]"

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    # Get local Pythia response
    local_response = generate_local(req.message, {"tone": req.tone, "style": req.style})

    # Get Gemini response
    gemini_response = think_with_gemini(req.message)

    # Combine both responses
    combined = f"[Local Thought]: {local_response}\n\n[Cloud Thought]: {gemini_response}"
    return {"response": combined}

@app.post("/quest")
async def generate_quest(player_context: dict):
    prompt = (
        f"Generate a fantasy quest based on this context:\n"
        f"Location: {player_context.get('location')}\n"
        f"Inventory: {player_context.get('inventory')}\n"
        f"Recent Actions: {player_context.get('actions')}\n"
        "Respond in JSON with title, description, steps, and reward."
    )

    gemini_response = think_with_gemini(prompt, brevity=False)

    # (Optionally merge with Pythia's creativity)
    local_response = generate_local(prompt, {"tone": "epic", "style": "storyteller"})

    return {"quest_gemini": gemini_response, "quest_local": local_response}


# Request schema
class SiteInfo(BaseModel):
    name: str
    url: str
    rank: int
    description: str | None = None
    category: str | None = None

class WebStructRequest(BaseModel):
    sites: List[SiteInfo]
    use_local: bool = True
    use_gemini: bool = True

# Response schema
class BuildingPart(BaseModel):
    style: str
    color: str
    size: str | None = None

class BuildingPlan(BaseModel):
    roof: BuildingPart
    walls: BuildingPart
    decorations: List[Dict[str, Any]]

class WebStructResponse(BaseModel):
    site_name: str
    plan: BuildingPlan
    
# -----------------
# Mock AI planners
# -----------------
def generate_local_building_plan(site: SiteInfo):
    # Local AI placeholder logic
    return {
        "roof": {"style": "cone", "color": "gold" if site.rank <= 5 else "gray", "size": "large"},
        "walls": {"style": "box", "color": "white" if site.rank <= 5 else "lightblue"},
        "decorations": [{"type": "sign", "text": site.name}]
    }

def think_with_gemini_building(site: SiteInfo):
    # TODO: Replace with real Gemini call
    return None

@app.post("/webstruct")
async def webstruct_endpoint(req: WebStructRequest):
    results = []

    for site in req.sites:
        # This is where we'd fetch missing metadata if needed (e.g., scrape, API search)
        # Example: description/category might be fetched from your other tools

        # Send to AI (mock for now)
        if req.use_local:
            local_plan = generate_local_building_plan(site)
        else:
            local_plan = None

        if req.use_gemini:
            gemini_plan = think_with_gemini_building(site)
        else:
            gemini_plan = None

        # For now, just mock combine results
        plan = gemini_plan or local_plan or {
            "roof": {"style": "cone", "color": "red", "size": "large"},
            "walls": {"style": "box", "color": "white"},
            "decorations": [{"type": "tree", "color": "green"}]
        }

        results.append({
            "site_name": site.name,
            "plan": plan
        })

    return results





if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8010)

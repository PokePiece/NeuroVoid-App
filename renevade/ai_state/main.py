import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

# --- AI State Model ---
class AIState(BaseModel):
    id: str = "surreal_ai_001"
    position: Dict[str, float] = {"x": 0.0, "y": 0.0, "z": 0.0}
    orientation: Dict[str, float] = {"qx": 0.0, "qy": 0.0, "qz": 0.0, "qw": 1.0} # Quaternion for rotation
    mood: str = "curious"
    last_thought: str = "Observing the environment."

# --- FastAPI App Setup ---
app = FastAPI()

# CORS Middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"], # Adjust frontend port if different
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-memory AI State (for PoC) ---
current_ai_state = AIState()
connected_websockets: List[WebSocket] = [] # List to hold active WebSocket connections

# --- WebSocket Endpoint for AI State Updates ---
@app.websocket("/ws/ai_state")
async def websocket_ai_state(websocket: WebSocket):
    await websocket.accept()
    connected_websockets.append(websocket)
    print(f"WebSocket connected: {websocket.client}")
    try:
        while True:
            # Keep connection alive, actual updates are sent by the background task
            await asyncio.sleep(60) # Keep connection open, no need to send anything here
    except WebSocketDisconnect:
        connected_websockets.remove(websocket)
        print(f"WebSocket disconnected: {websocket.client}")
    except Exception as e:
        print(f"WebSocket error: {e}")

# --- Background Task to Simulate AI Changes and Broadcast ---
async def simulate_and_broadcast_ai_state():
    x_pos = 0.0
    z_pos = 0.0
    moods = ["curious", "observant", "thoughtful", "active"]
    mood_index = 0
    
    while True:
        # Simulate AI moving
        x_pos += 0.05
        z_pos = 5 * (asyncio.get_event_loop().time() % 4) / 4 # Oscillate z
        if x_pos > 5.0:
            x_pos = -5.0
        
        # Simulate AI mood/thought changes
        mood_index = (mood_index + 1) % len(moods)
        current_mood = moods[mood_index]
        
        current_ai_state.position = {"x": x_pos, "y": 0.5, "z": z_pos}
        current_ai_state.mood = current_mood
        current_ai_state.last_thought = f"Currently feeling {current_mood} at ({x_pos:.2f}, {z_pos:.2f})"
        
        # Broadcast the updated state to all connected clients
        for websocket in list(connected_websockets): # Iterate over a copy to avoid modification issues
            try:
                await websocket.send_json(current_ai_state.model_dump())
            except RuntimeError as e: # Handle disconnected sockets
                print(f"Error broadcasting to WS (likely disconnected): {e}")
                connected_websockets.remove(websocket) # Clean up
            except Exception as e:
                print(f"Unexpected error broadcasting to WS: {e}")
                connected_websockets.remove(websocket)

        await asyncio.sleep(0.1) # Update every 100 milliseconds

# --- FastAPI Startup Event: Start the background task ---
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulate_and_broadcast_ai_state())

# --- Basic HTTP Endpoint (for health check if needed) ---
@app.get("/")
async def root():
    return {"message": "AI Backend Running (PoC)"}

# To run this:
# 1. pip install fastapi uvicorn pydantic
# 2. uvicorn main:app --reload --port 8000
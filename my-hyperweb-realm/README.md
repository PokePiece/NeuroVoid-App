# Webtrix: New World -- Hyper Webspace

> An immersive, physics-enabled 3D environment that seeks to **ground the web into a physical realm**.

Webtrix: New World is a **React Three Fiber** experience where the abstract world of the internet becomes tangible. Users explore a procedurally generated floating world populated with interactive AI assistants, portals, holograms, and more — all rendered in real time in the browser.

## ✨ Features

- **Immersive 3D Scene**  
  Powered by `@react-three/fiber` and `@react-three/drei`, with realistic lighting, shadows, and physics.

- **Procedural World Generation**  
  The floating islands are assembled into chunks, each containing a combination of terrain, vegetation, buildings, and interactive elements.

- **Player Controller**  
  - WASD movement with physics via `@react-three/rapier`.  
  - Jumping and mid-air grappling hook mechanics.  
  - Smooth camera orbit controls.

- **Interactive AI Assistants**  
  Floating orbs that can be clicked to open a chat interface. Conversations combine **local model reasoning** (Pythia-410M) and **cloud reasoning** (Google Gemini 2.5 Flash).

- **Dynamic Objects & Effects**  
  - Waterfalls, grass fields, and paths.  
  - Portals to other locations.  
  - Holographic objects and chat systems.  
  - Floating NPCs and decorative props.

- **Server-Backed AI**  
  Backend built with **FastAPI**, integrating:
  - **Local model inference** via Hugging Face Transformers.
  - **Cloud model reasoning** with Google’s Generative AI API.
  - Endpoints for `/chat` and `/quest` generation.

## 🕹 Controls

- **Move**: `W` `A` `S` `D`  
- **Jump**: `Space`  
- **Grapple**: (Depends on `GrapplingHook` implementation)  
- **Click AI Assistant**: Open/close chat window  
- **Orbit camera**: Mouse drag (via OrbitControls)

## 📂 Project Structure

src/
├─ App.jsx # Entry point, loads WebScene
├─ WebScene.jsx # Sets up Canvas, lighting, physics
├─ User.jsx # Player movement and physics body
├─ World.jsx # Procedural chunk generator for world props
├─ Assistants.jsx # Extra assistant placement
├─ components/
│ ├─ FloatingAssistant.jsx
│ ├─ WorldThings/
│ │ ├─ GrassField.jsx
│ │ ├─ Waterfall.jsx
│ │ ├─ Road.jsx
│ │ ├─ Shop.jsx
│ ...
backend/
├─ main.py # FastAPI app
├─ requirements.txt

shell
Copy
Edit

## 🚀 Running Locally

### 1. Frontend
```bash
npm install
npm run dev
2. Backend
bash
Copy
Edit
pip install -r requirements.txt
python main.py
```
## 🛠 Tech Stack

## Frontend:

React

@react-three/fiber

@react-three/drei

@react-three/rapier

## Backend:

FastAPI

Hugging Face Transformers

Google Generative AI API

## Models:

EleutherAI Pythia 410M (local)

Google Gemini 2.5 Flash (cloud)

## 🌌 Vision
Webtrix: New World is more than a scene — it's an experiment in bringing the internet to life as a traversable, physical place.
Imagine if your browser tabs, AI assistants, and digital content weren’t locked behind flat screens, but manifested as objects you could walk up to, talk to, and interact with — all in a seamless 3D world.
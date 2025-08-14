# Web MMO Prototype

A work-in-progress browser-based MMO built with **React**, **Three.js**, **React Three Fiber**, **React-Three-Rapier**, and **TypeScript**.  
The goal is to keep the client smooth and performant while maintaining enough flexibility to expand into a full MMO gameplay loop.

---

## Current Features

### 1. **Scene Setup**
- Using `@react-three/fiber` for declarative 3D scene management in React.
- `@react-three/rapier` physics integration for realistic collision and movement handling.
- All major scene elements (`Player`, `Environment`) split into separate components.

### 2. **Environment**
- Flat physics-enabled ground plane (`RigidBody`) serving as the base environment.
- Configured for simple collision detection and player interaction.

### 3. **Player Character**
- Capsule collider for smooth movement and physics integration.
- WASD movement with diagonal speed normalization.
- Fixed rotation to prevent tipping over.
- Uses Rapier’s `setLinvel` for responsive movement without unnecessary jitter.

### 4. **Third-Person Camera**
- Smooth camera follow with linear interpolation.
- Camera rotation controlled via pointer lock and mouse movement.
- Camera-relative WASD movement for a more modern feel.

---

## How to Run
```bash
npm install
npm run dev
Click inside the canvas to activate pointer lock.

Use WASD to move.

Move the mouse to rotate the camera.

Press ESC to release pointer lock.
```

## Project Structure

src/
  MainScene.tsx    # Entry point for the 3D scene
  Player.tsx       # Player movement & camera follow logic
  Environment.tsx  # Static ground plane & world environment


---

## Known Issues

### Movement

- Movement smoothness differs between full reload and hot reload 
  — On a full page reload, player movement appears lurchy and drags slightly, but after a Vite hot reload (HMR) it becomes perfectly smooth. Suspected duplicate event listeners or multiple physics update loops after cold start, yet cause fully unknown.

### Camera

- Camera pitch direction flips after turning 180° 
  — When facing forward, moving the mouse up tilts the camera up and moving down tilts it down. However, after turning to face the opposite direction, vertical mouse input inverts, producing airplane-style controls.

---

## Future Expansions

### Hybrid Cursor Mode (Fake Cursor in Pointer Lock)
Implement a “cursor mode” where the player remains in pointer lock, but a fake in-game cursor appears when holding a modifier key (e.g., CTRL). Mouse movement would move this cursor sprite instead of rotating the camera, allowing the player to interact with UI or click on 3D objects without breaking immersion or triggering the browser pointer lock warning repeatedly.

### Combat & Abilities
Add a basic ability system triggered by hotkeys and/or cursor interaction. Abilities will interact with physics bodies and potentially include visual effects.

### Networking Layer
Real-time multiplayer sync for player positions, states, and interactions. Likely WebSocket-based with server reconciliation.

### Expanded Environment
Replace flat ground with terrain meshes, obstacles, and interactive elements.

### UI/HUD Integration
Add health/mana bars, mini-map, quest log, and inventory screens.

### Animations & Models
Replace placeholder capsule with animated 3D character models. Sync animations with movement and ability usage.

### Procedural limb animation for capsule player 
Implement code-driven arm and leg swinging based on player velocity, without needing external animation files. This will give the simple capsule-based player more personality and movement realism while keeping the architecture asset-light.
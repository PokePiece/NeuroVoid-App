# Lightsaber Combat Prototype

## Overview

This is an experimental first-person lightsaber combat simulation built with:

- **React Three Fiber (R3F)** for rendering
    
- **Three.js** for 3D math and scene control
    
- Pointer Lock API for mouse-based lightsaber control
    
- WASD for player movement in a 3D environment
    

The current version:

- Places the player in a first-person camera
    
- Allows movement with WASD
    
- Uses the mouse to directly rotate the lightsaber in X (up/down) and Y (left/right) axes
    
- Keeps the lightsaber positioned in front of the camera, with basic rotation matching mouse movements
    

* * *

## What We Have So Far

- **Player movement**: WASD moves forward, backward, and strafes left/right correctly
    
- **Camera lock**: The camera stays positioned at the player's head height, always looking forward
    
- **Lightsaber rotation**: Mouse input directly rotates the saber model around its pivot point
    
- **Pointer Lock**: Clicking on the canvas locks the mouse, giving relative mouse movement
    

* * *

## Future Plan — Swing Improvements

### Goal

Make saber motion **feel more realistic** by:

1.  Pivoting from a "wrist" point, so the hilt behaves like it's held in the player's hand
    
2.  Adding momentum and smoothing, so fast mouse moves result in a follow-through swing
    
3.  Optionally, adding idle sway while moving to simulate a hand-held weapon
    

* * *

### Implementation Plan

**1\. Wrist Pivot**

- **Current behavior**: We rotate the saber’s group directly at its center.
    
- **Future behavior**:
    
    - Create a `wristGroup` at the position where the player’s hand would be (offset from camera/player).
        
    - Attach the saber mesh **as a child** of this group, offset forward.
        
    - Apply rotations to `wristGroup` instead of saber mesh.
        

**Code Architecture**

tsx

CopyEdit

`<group ref={wristRef} position={[0.5, 1, -0.5]}> <Lightsaber /></group>`

ts

CopyEdit

`// On mouse movewristRef.current.rotation.x += deltaY * rotationSpeedwristRef.current.rotation.y += deltaX * rotationSpeed`

* * *

**2\. Momentum & Smoothing**

- Keep track of mouse movement deltas as a "velocity"
    
- Apply velocity to rotation gradually, with a decay factor
    
- Creates natural swing follow-through
    

**Pseudocode**

ts

CopyEdit

`let rotationVelocity = new THREE.Vector2()onMouseMove(e) { rotationVelocity.x += e.movementY * 0.002 rotationVelocity.y += e.movementX * 0.002}useFrame(() => { wristRef.current.rotation.x += rotationVelocity.x wristRef.current.rotation.y += rotationVelocity.y rotationVelocity.multiplyScalar(0.9) // friction})`

* * *

**3\. Idle Bob & Sway**

- Add small oscillating rotation based on player movement
    
- Example: sway side-to-side with `Math.sin` based on time + speed
    

**Pseudocode**

ts

CopyEdit

`if (isMoving) { wristRef.current.rotation.z = Math.sin(clock.elapsedTime * 5) * 0.02}`

* * *

## Priority Order

1.  **Wrist pivot** — essential for realistic swinging
    
2.  **Momentum smoothing** — improves feel significantly
    
3.  **Idle sway** — visual polish, optional
    

* * *

## Time Estimate

- Wrist pivot: **5–10 min**
    
- Momentum smoothing: **10 min**
    
- Idle sway: **5 min**
    
- Total: **~25 minutes for basic version**
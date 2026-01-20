# Basic Three.js

## What are render loops?

Game Loop, Update Loop, Main Loop, etc.
Runs continuously - Updates state - Renders result
Only ends when game is shut down

```js
function main() {
  initGame();
  while (true) {
    updateState();
    render();
    if (isFinished()) {
      break;
    }
  }
}
```

## What are frame deltas?

frameDelta, deltaTime, timeElapsed, etc.

- Needed to maintain consistent rate on different hardware

What is it?

- Elapsed time between current and previous frame
- Used in updates and calculations
- Ensures consistent experience across hardware

```js
function main() {
  initGame();
  while (true) {
    deltaTime = clock.getDeltaTime();
    updateState(deltaTime);
    render(deltaTime);
    if (isFinished()) {
      break;
    }
  }
}
```

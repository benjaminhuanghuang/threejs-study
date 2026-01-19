# Three.js 3D Game Tutorial

https://www.youtube.com/watch?v=sPereCgQnWQ

https://chriscourses.com/

⭐️⭐️⭐️⭐️⭐️

## The Essentials

- Project setup
- Materials and lighting
- Shadows
- Gravity

```js
update() {
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    // Gravity effect
    // Every frame, gravity increases downward speed.
    // the bounce gives it an upward velocity, but gravity pulls it back down on the very next frame.
    this.velocity.y += this.gravity;
    // this is where we hit the ground
    if (this.bottom + this.velocity.y <= ground.top) {
        this.velocity.y *= 0.8;
        this.velocity.y = -this.velocity.y;
    } else {
        // move normally
        this.position.y += this.velocity.y;
    }
}
```

- Movement
- Full collision detection
- Enemy spawning
- End game scenario

```

```

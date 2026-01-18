# ThreeJS Primer

```js
class App {
  constructor() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    window.addEventListener("resize", this.resize.bind(this));

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Render loop
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  resize() {}

  render() {}
}
```

[Three.js Editor]https://threejs.org/editor/

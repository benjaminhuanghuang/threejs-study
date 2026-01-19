# Game Loop

```js
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app") as HTMLCanvasElement,
});

function tick() {
  scene.update();
  renderer.render(scene, mainCamera);
  requestAnimationFrame(tick);
}

tick();
```

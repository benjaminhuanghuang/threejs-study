# Render loop

## setInterval

Before HTML5 way to do this was by using the setInterval(function,interval) function.
The problem with this function is that it doesn’t take into account what is happening in the browser. If you were browsing another tab, this function would still be fired every couple of milliseconds.

Besides that, setInterval isn’t synchronized when the the screen is redrawn. This can lead to higher CPU usage, flickering, and generally poor performance.

## requestAnimationFrame

Luckily, modern browsers have a solution for that with the requestAnimationFrame function.

```js
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

```js
const renderLoop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
```

stats.js: gives us information about the frame rate the animation is running at. 


```js
import Stats from 'three/examples/jsm/libs/stats.module'
const stats = Stats()
document.body.appendChild(stats.dom)



function animate() {
  requestAnimationFrame(animate);
  stats.update();
  renderer.render(scene, camera);
}
animate();
```

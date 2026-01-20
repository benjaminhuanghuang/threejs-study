import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// create a scene
// basic scene setup
const scene = new THREE.Scene();
scene.backgroundColor = 0xffffff;
scene.fog = new THREE.Fog(0xffffff, 0.0025, 50);

// setup camera

// setup the renderer and attach to canvas

// add lights

// create a cube and torus knot and add them to the scene

// create a very large ground plane

// add orbitcontrols to pan around the scene using mouse

// add statistics to monitor the framerate

// render the scene
function animate() {
  requestAnimationFrame(animate);
  stats.update();
  renderer.render(scene, camera);
}
animate();

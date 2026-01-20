import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const threejs = new THREE.WebGLRenderer();
threejs.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(threejs.domElement);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
camera.position.z = 5;

const controls = new OrbitControls(camera, threejs.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);
controls.update();

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  }),
);
scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  threejs.render(scene, camera);
}
animate();

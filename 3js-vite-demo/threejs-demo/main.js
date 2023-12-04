import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();
// Create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshBasicMaterial({ color: "#00ff83" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(45, 800, 600);
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const render = new THREE.WebGLRenderer({ canvas });
render.setSize(800, 600);
render.render(scene, camera);

//

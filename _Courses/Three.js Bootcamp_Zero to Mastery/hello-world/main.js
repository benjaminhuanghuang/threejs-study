import * as THREE from 'three';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube);


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);


// init renderer
const canvas = document.querySelector('.threejs');
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

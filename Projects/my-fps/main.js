import * as THREE from 'three';
//
import Game from './game.js'

const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('app')
})
renderer.setSize(window.innerWidth, window.innerHeight)
const mainCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
const scene = new THREE.Scene();

function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
	renderer.setSize(width, height);
    mainCamera.aspect = width / height;
    mainCamera.updateProjectionMatrix();
  }

window.addEventListener("resize", resize, false);

const game = new Game(scene, mainCamera);
await game.initialize();

function animate()
{
	renderer.render(scene, mainCamera);
	requestAnimationFrame(animate);
}

animate();

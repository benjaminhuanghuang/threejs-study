import * as THREE from 'three';
//
import Game from './game.js'

const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('app')
})
renderer.setSize(window.innerWidth, window.innerHeight)

// Create the main camera
const mainCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
mainCamera.position.z = 1;
mainCamera.position.y = 0.5;

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 4, 2);
scene.add(light);

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

document.addEventListener('keydown', game.handleKeyDown)
document.addEventListener('keyup', game.handleKeyUp)

function animate()
{
  game.update();

	renderer.render(scene, mainCamera);
	requestAnimationFrame(animate);
}

animate();

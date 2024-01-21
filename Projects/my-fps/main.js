import * as THREE from 'three';
//
import SceneTest from './sceneTest.js'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('app')
})
renderer.setSize(width, height)

const mainCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)

const scene = new SceneTest(mainCamera)
scene.initialize()

function tick()
{
	//scene.update()
	renderer.render(scene, mainCamera)
	requestAnimationFrame(tick)
}

tick();

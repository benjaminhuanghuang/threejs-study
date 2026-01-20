import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class App {
  #threejs = null;
  #camera = null;
  #scene = null;
  #clock = new THREE.Clock();
  #controls = null;
  #mesh = null;

  constructor() {
    window.addEventListener(
      "resize",
      () => {
        this.#onWindowResize();
      },
      false,
    );
  }

  Initialize() {
    this.#threejs = new THREE.WebGLRenderer();
    this.#threejs.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.#threejs.domElement);

    const aspect = window.innerWidth / window.innerHeight;
    this.#camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    this.#camera.position.z = 5;

    this.#controls = new OrbitControls(this.#camera, this.#threejs.domElement);
    this.#controls.enableDamping = true;
    this.#controls.target.set(0, 0, 0);
    this.#controls.update();

    this.#scene = new THREE.Scene();

    this.#mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
      }),
    );
    this.#scene.add(this.#mesh);
    this.#raf();
  }

  #raf() {
    requestAnimationFrame(() => {
      const deltaTime = this.#clock.getDelta();
      this.#step(deltaTime);
      this.#render();
      this.#raf();
    });
  }

  #step(timeElapsed) {
    // State update
    this.#mesh.rotation.y += timeElapsed;
  }

  #render() {
    this.#threejs.render(this.#scene, this.#camera);
  }

  #onWindowResize() {
    const canvas = this.#threejs.domElement;
    const dpr = window.devicePixelRatio;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    this.#threejs.setSize(width * dpr, height * dpr, false);
    // this.#threejs.setPixelRatio(dpr);

    this.#camera.aspect = aspect;
    this.#camera.updateProjectionMatrix();
  }
}

const app = new App();
app.Initialize();

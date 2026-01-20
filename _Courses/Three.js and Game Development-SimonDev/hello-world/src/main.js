import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class App {
  #threejs = null;
  #camera = null;
  #scene = null;

  constructor() {
    this.Initialize();
  }

  Initialize() {
    this.#threejs = new THREE.WebGLRenderer();
    this.#threejs.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.#threejs.domElement);

    const aspect = window.innerWidth / window.innerHeight;
    this.#camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    this.#camera.position.z = 5;

    const controls = new OrbitControls(this.#camera, this.#threejs.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();

    this.#scene = new THREE.Scene();

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
      }),
    );
    this.#scene.add(mesh);
  }

  Run() {
    const render = () => {
      requestAnimationFrame(render);
      this.#threejs.render(this.#scene, this.#camera);
    };
    render();
  }
}

const app = new App();
app.Run();

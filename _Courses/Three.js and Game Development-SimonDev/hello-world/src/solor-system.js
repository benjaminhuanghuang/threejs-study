import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class App {
  #threejs_ = null;
  #camera_ = null;
  #scene_ = null;
  #clock_ = null;

  #sun_ = null;
  #earth_ = null;

  constructor() {}

  async Initialize() {
    this.#clock_ = new THREE.Clock(true);
    window.addEventListener(
      "resize",
      () => {
        this.#onWindowResize_();
      },
      false,
    );
    await this.#setupProject_();

    this.#onWindowResize_();
    this.#raf_();
  }
  async #setupProject_() {
    this.#threejs_ = new THREE.WebGLRenderer();
    this.#threejs_.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.#threejs_.domElement);

    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    this.#camera_ = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.#camera_.position.set(0, 0, 200);

    const controls = new OrbitControls(
      this.#camera_,
      this.#threejs_.domElement,
    );
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();

    this.#scene_ = new THREE.Scene();
    this.#scene_.background = new THREE.Color(0x000000);

    this.#CreateSolarSystem_();
  }
  #CreateSolarSystem_() {
    const moonGeo = new THREE.SphereGeometry(2, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(8, 0, 0);

    const earthGeo = new THREE.SphereGeometry(5, 32, 32);
    const earthMat = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    this.#earth_ = new THREE.Mesh(earthGeo, earthMat);
    this.#earth_.position.set(60, 0, 0);
    this.#earth_.add(moon);
    const sunGeo = new THREE.SphereGeometry(40, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    this.#sun_ = new THREE.Mesh(sunGeo, sunMat);
    this.#sun_.add(this.#earth_);

    this.#scene_.add(this.#sun_);
  }

  #onWindowResize_() {
    const canvas = this.#threejs_.domElement;
    const dpr = window.devicePixelRatio;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    this.#threejs_.setSize(width * dpr, height * dpr, false);

    this.#camera_.aspect = aspect;
    this.#camera_.updateProjectionMatrix();
  }

  #raf_() {
    requestAnimationFrame(() => {
      this.#step_(this.#clock_.getDelta());
      this.#render_();
      this.#raf_();
    });
  }

  #render_() {
    this.#threejs_.render(this.#scene_, this.#camera_);
  }

  #step_(timeElapsed) {
    // State update
    this.#sun_.rotateY(timeElapsed);
    this.#earth_.rotateY(timeElapsed * 2);
  }
}

const app = new App();
app.Initialize();

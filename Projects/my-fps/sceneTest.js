import * as THREE from "three";

import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

export default class SceneTest extends THREE.Scene {
  mtlLoader = new MTLLoader();
  objLoader = new OBJLoader();

  targets = [];

  constructor(camera) {
    super();
    this.camera = camera;
  }

  async initialize() {
    // load a shared MTL (Material Template Library) for the targets
    const targetMtl = await this.mtlLoader.loadAsync("assets/targetA.mtl");
    targetMtl.preload();

    // create the 4 targets
    const t1 = await this.createTarget(targetMtl);
    t1.position.x = -1;
    t1.position.z = -3;

    const t2 = await this.createTarget(targetMtl);
    t2.position.x = 1;
    t2.position.z = -3;

    const t3 = await this.createTarget(targetMtl);
    t3.position.x = 2;
    t3.position.z = -3;

    const t4 = await this.createTarget(targetMtl);
    t4.position.x = -2;
    t4.position.z = -3;

    this.add(t1, t2, t3, t4);
    this.targets.push(t1, t2, t3, t4);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 4, 2);

    this.add(light);

    // Create the gun
    this.gun = await this.createGun()
		this.add(this.gun)

    this.gun.position.z = 3
		this.gun.add(this.camera)

		this.camera.position.z = 1
		this.camera.position.y = 0.5
  }
  

  async createTarget(mtl) {
    this.objLoader.setMaterials(mtl);

    const modelRoot = await this.objLoader.loadAsync("assets/targetA.obj");

    modelRoot.rotateY(Math.PI * 0.5);

    return modelRoot;
  }

  async createGun()
	{
		const mtl = await this.mtlLoader.loadAsync('assets/blasterG.mtl')
		mtl.preload()

		this.objLoader.setMaterials(mtl)

		const modelRoot = await this.objLoader.loadAsync('assets/blasterG.obj')

		return modelRoot
	}
}

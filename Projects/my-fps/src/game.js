import * as THREE from "three";

import Target from "./target.js";
import Gun from "./gun.js";

export default class Game {
  targets = [];

  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
  }

  async initialize() {
    // Create 4 targets
    const t1 = new Target();
    await t1.initialize();
    t1.setPosition(-1, 0, -3);

    const t2 = new Target();
    await t2.initialize();
    t2.setPosition(1, 0, -3);

    const t3 = new Target();
    await t3.initialize();
    t3.setPosition(2, 0, -3);

    const t4 = new Target();
    await t4.initialize();
    t4.setPosition(-2, 0, -3);

    this.scene.add(t1.model, t2.model, t3.model, t4.model);
    this.targets.push(t1, t2, t3, t4);

    // Create the gun
    this.gun = new Gun();
    await this.gun.initialize();
    this.scene.add(this.gun.model);
    this.gun.model.position.z = 3;

    this.gun.addCamera(this.camera);
  }
}

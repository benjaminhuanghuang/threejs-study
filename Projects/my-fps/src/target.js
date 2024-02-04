import ResourceManager from "./ResourceManager.js";

export default class Target {
  constructor() {
    this.resManager = new ResourceManager();
  }

  async initialize() {
    // load a shared MTL (Material Template Library) for the targets
    const mtl = await this.resManager.loadMtl("assets/targetA.mtl");
    this.model = await this.resManager.loadModel(mtl, "assets/targetA.obj");
    this.model.rotateY(Math.PI * 0.5);
  }

  setPosition(x, y, z) {
    this.model.position.set(x, y, z);
  }
}

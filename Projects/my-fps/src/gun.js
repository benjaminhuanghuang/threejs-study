import ResourceManager from "./ResourceManager.js";

export default class Gun {
  constructor() {
    this.resManager = new ResourceManager();
  }

  async initialize() {
    const mtl = await this.resManager.loadMtl("assets/blasterG.mtl");
    this.model = await this.resManager.loadModel(mtl, "assets/blasterG.obj");
  }

  addCamera(camera) {
    this.model.add(camera);
  }
}

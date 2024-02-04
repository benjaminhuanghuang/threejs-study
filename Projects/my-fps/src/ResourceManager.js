import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

class ResourceManager {
  constructor() {
    this.mtlLoader = new MTLLoader();
    this.objLoader = new OBJLoader();
  }

  async loadMtl(path) {
    const mtl = await this.mtlLoader.loadAsync(path);
    mtl.preload();
    return mtl;
  }

  async loadModel(mtl, path) {
    this.objLoader.setMaterials(mtl);
    const model = await this.objLoader.loadAsync(path);
    return model;
  }
}

export default ResourceManager;

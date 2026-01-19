import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Tank {
  private model: THREE.Group | null = null;
  private scene: THREE.Scene;
  private loader: GLTFLoader;
  private textureLoader: THREE.TextureLoader;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
  }

  async load(): Promise<void> {
    try {
      // Load texture
      const texture = await this.loadTexture("/textures/tank-body-red.png");
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false; // GLB models often need this

      // Load model
      const gltf = await this.loadModel("/models/tank.glb");
      this.model = gltf.scene;

      // Apply texture to the model
      this.model?.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Create a new material with the texture
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Add model to scene
      this.scene.add(this.model!);

      console.log("Tank loaded successfully!");
    } catch (error) {
      console.error("Error loading tank:", error);
      throw error;
    }
  }

  private loadModel(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => resolve(gltf),
        (progress) => {
          const percent = (progress.loaded / progress.total) * 100;
          console.log(`Loading model: ${percent.toFixed(2)}%`);
        },
        (error) => reject(error),
      );
    });
  }

  private loadTexture(path: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        path,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error),
      );
    });
  }

  // Update tank position
  setPosition(x: number, y: number, z: number): void {
    if (this.model) {
      this.model.position.set(x, y, z);
    }
  }

  // Update tank rotation
  setRotation(x: number, y: number, z: number): void {
    if (this.model) {
      this.model.rotation.set(x, y, z);
    }
  }

  // Update tank scale
  setScale(scale: number): void {
    if (this.model) {
      this.model.scale.setScalar(scale);
    }
  }

  // Rotate tank on Y axis (turn left/right)
  rotate(angle: number): void {
    if (this.model) {
      this.model.rotation.y += angle;
    }
  }

  // Move tank forward/backward
  moveForward(distance: number): void {
    if (this.model) {
      const direction = new THREE.Vector3(0, 0, 1);
      direction.applyQuaternion(this.model.quaternion);
      this.model.position.addScaledVector(direction, distance);
    }
  }

  // Get the tank model
  getModel(): THREE.Group | null {
    return this.model;
  }

  // Clean up
  dispose(): void {
    if (this.model) {
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
      this.scene.remove(this.model);
      this.model = null;
    }
  }
}

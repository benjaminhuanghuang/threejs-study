import * as THREE from "three";

export default class Game {
  constructor(scene, camera) {
    // init variables

    // prepare 3D scene
    this.initializeScene(scene, camera);
    // bind event callbacks
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  update() {
    // recompute the game state
    this.updateGrid();
    this.checkCollisions();
    this.updateInfoPanel();
  }

  onKeyDown(event) {
    // handle key down events
  }

  onKeyUp(event) {
    // handle key up events
  }

  updateGrid() {}

  checkCollisions() {
    // obstacles
    // bonuses
  }

  updateInfoPanel() {}

  gameOver() {
    //prepare end state
    // show UI
    // reset game
  }

  initializeScene(scene, camera) {
    // prepare 3D scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    scene.add(this.cube);

    camera.position.z = 5;
  }
}

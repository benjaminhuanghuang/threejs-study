import * as THREE from "three";
import Lerp from "./lerp.js";

export default class Game {
  OBSTACLE_PREFAB = new THREE.BoxBufferGeometry(1, 1, 1);
  OBSTACLE_MATERIAL = new THREE.MeshBasicMaterial({ color: 0xccdece });
  BONUS_PREFAB = new THREE.BoxBufferGeometry(1, 12, 12);
  COLLISION_THRESHOLD = 0.2;

  constructor(scene, camera) {
    this.divScore = document.getElementById("score");
    this.divDistance = document.getElementById("distance");
    this.divHealth = document.getElementById("health");

    this.divGameOver = document.getElementById("game-over");
    this.divGameOverScore = document.getElementById("game-over-score");
    this.divGameOverDistance = document.getElementById("game-over-distance");

    document.getElementById("start-button").addEventListener("click", () => {
      this.running = true;
      document.getElementById("intro-panel").style.display = "none";
    });

    document.getElementById("replay-button").addEventListener("click", () => {
      this.running = true;
      this.divGameOverPanel.style.display = "none";
    });

    this.scene = scene;
    this.camera = camera;
    this.reset(false);

    // bind event callbacks
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  update() {
    if (!this.running) return;

    // recompute the game state
    const timeDelta = this.clock.getDelta();
    this.time += timeDelta;

    if (this.rotateLerp != null) this.rotateLerp.update(timeDelta);
    if (this.cameraLerp != null) this.cameraLerp.update(timeDelta);

    this.translateX += this.speedX * -0.05;

    this.updateGrid();
    this.checkCollisions();
    this.updateInfoPanel();
  }

  reset(reply) {
    //initialize the variables
    this.running = false;

    this.speedZ = 20;
    this.speedX = 0; //-1 left, 0 straight, 1 right
    this.translateX = 0;

    this.time = 0;
    this.clock = new THREE.Clock();

    this.health = 100;
    this.score = 0;

    this.rotationLerp = null;
    this.cameraLerp = null;

    // show initial values
    this.divScore.innerText = this.score;
    this.divDistance.innerText = 0;
    this.divHealth.value = this.health;

    // prepare 3D scene
    this.initializeScene(this.scene, this.camera, reply);
  }

  onKeyDown(event) {
    let newSpeedX;
    switch (event.key) {
      case "ArrowLeft":
        newSpeedX = -1;
        break;
      case "ArrowRight":
        newSpeedX = 1;
        break;
      default:
        break;
    }
    if (this.speedX !== newSpeedX) {
      this.speedX = newSpeedX;
      this.rotateShip((this.speedX * 20 * Math.PI) / 180, 0.8);
    }
  }

  onKeyUp(event) {
    // handle key up events
    this.speedX = 0;
    this.rotateShip(0, 0.5);
  }

  rotateShip(targetRotation, delay) {
    const $this = this;
    this.rotationLerp = new Lerp(this.ship.rotation.z, targetRotation, delay)
      .onUpdate((value) => {
        $this.ship.rotation.z = value;
      })
      .onFinish(() => {
        $this.rotateLerp = null;
      });
  }

  updateGrid() {
    //console.log(this.time);
    this.speedZ += 0.002;
    this.grid.material.uniforms.speedZ.value = this.speedZ;

    this.grid.material.uniforms.time.value = this.time;
    this.objectsParent.position.z += this.speedZ * this.time;
    this.grid.material.uniforms.translateX.value = this.translateX;
    this.objectsParent.position.x = this.translateX;

    this.objectsParent.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const childZPos = child.position.z + this.objectsParent.position.z;
        if (childZPos > 0) {
          // reset the object
          const params = [
            child,
            -this.translateX,
            -this.objectsParent.position.z,
          ];
          if (child.userData.type === "obstacle") {
            this.setupObstacles(...params);
          } else {
            const price = this.setupBonus(...params);
            child.userData.price = price;
          }
        }
      }
    });
  }

  checkCollisions() {
    this.objectsParent.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // pos in world space
        const childZPos = child.position.z + this.objectsParent.position.z;
        // threshold distance
        const thresholdX = this.COLLISION_THRESHOLD + child.scale.x / 2;
        const thresholdZ = this.COLLISION_THRESHOLD + child.scale.z / 2;

        if (
          childZPos > -thresholdZ &&
          Math.abs(child.position.x + this.translateX) < thresholdX
        ) {
          // Collision
          const params = [
            child,
            -this.translateX,
            -this.objectsParent.position.z,
          ];
          if (child.userData.type === "obstacle") {
            if (soundAudio) {
              soundAudio.play("crash");
            }
            this.health -= 10;
            this.divHealth.value = this.health;
            this.setupObstacles(...params);
            this.shakeCamera();

            if (this.health <= 0) {
              this.gameOver();
            }
          } else {
            if (soundAudio) {
              const soundId = Math.floor(
                (7 * (child.userData.price - 5)) / (20 - 5)
              );
              soundAudio.play(`bonus-${soundId}`);
            }
            this.score += child.userData.price;
            this.divScore.innerText = this.score;
            child.userData.price = this.setupBonus(...params);
          }
        }
      }
    });
  }

  updateInfoPanel() {
    this.divDistance.innerText = this.objectsParent.position.z.toFixed(0);
  }

  gameOver() {
    //prepare end state
    this.running = false;
    // show UI
    this.divGameOverScore.innerText = this.score;
    this.divGameOverDistance.innerText =
      this.objectsParent.position.z.toFixed(0);
    setTimeout(() => {
      this.divGameOver.style.display = "grid";
      this.reset(true);
    }, 1000);

    // reset game
  }

  createShip(scene) {
    const shipBody = new THREE.Mesh(
      new THREE.TetrahedronBufferGeometry(0.4),
      new THREE.MeshBasicMaterial({ color: 0xbbccdd })
    );
    shipBody.rotateX((45 * Math.PI) / 180);
    shipBody.rotateY((45 * Math.PI) / 180);

    this.ship = new THREE.Group();
    this.ship.add(shipBody);

    scene.add(this.ship);

    const reactorSocketGeometry = new THREE.CylinderBufferGeometry(
      0.08,
      0.08,
      0.1,
      16
    );
    const reactorSocketMaterial = new THREE.MeshBasicMaterial({
      color: 0x99aacc,
    });
    const reactorSocket1 = new THREE.Mesh(
      reactorSocketGeometry,
      reactorSocketMaterial
    );
    const reactorSocket2 = new THREE.Mesh(
      reactorSocketGeometry,
      reactorSocketMaterial
    );
    const reactorSocket3 = new THREE.Mesh(
      reactorSocketGeometry,
      reactorSocketMaterial
    );

    this.ship.add(reactorSocket1);
    this.ship.add(reactorSocket2);
    this.ship.add(reactorSocket3);
    reactorSocket1.rotateX((90 * Math.PI) / 180);
    reactorSocket1.position.set(-0.15, 0, 0.1);
    reactorSocket2.rotateX((90 * Math.PI) / 180);
    reactorSocket2.position.set(0.15, 0, 0.1);
    reactorSocket3.rotateX((90 * Math.PI) / 180);
    reactorSocket3.position.set(0, -0.15, 0.1);

    const reactorLightGeometry = new THREE.CylinderBufferGeometry(
      0.055,
      0.055,
      0.1,
      16
    );
    const reactorLightMaterial = new THREE.MeshBasicMaterial({
      color: 0xaadeff,
    });
    const reactorLight1 = new THREE.Mesh(
      reactorLightGeometry,
      reactorLightMaterial
    );
    const reactorLight2 = new THREE.Mesh(
      reactorLightGeometry,
      reactorLightMaterial
    );
    const reactorLight3 = new THREE.Mesh(
      reactorLightGeometry,
      reactorLightMaterial
    );
    this.ship.add(reactorLight1);
    this.ship.add(reactorLight2);
    this.ship.add(reactorLight3);
    reactorLight1.rotateX((90 * Math.PI) / 180);
    reactorLight1.position.set(-0.15, 0, 0.11);
    reactorLight2.rotateX((90 * Math.PI) / 180);
    reactorLight2.position.set(0.15, 0, 0.11);
    reactorLight3.rotateX((90 * Math.PI) / 180);
    reactorLight3.position.set(0, -0.15, 0.11);
  }

  createGrid(scene) {
    let division = 30;
    let gridLimit = 200;

    this.grid = new THREE.GridHelper(
      gridLimit * 2,
      division,
      0xccddee,
      0xccddee
    );

    const moveableZ = [];
    const moveableX = [];

    for (let i = 0; i <= division; i++) {
      moveableX.push(0, 0, 1, 1); // move vertical lines only (1- point is moveable, 0 - not moveable)
      moveableZ.push(1, 1, 0, 0); // move horizontal lines only (1- point is moveable, 0 - not moveable)
    }
    this.grid.geometry.setAttribute(
      "moveableX",
      new THREE.BufferAttribute(new Uint8Array(moveableX), 1)
    );
    this.grid.geometry.setAttribute(
      "moveableZ",
      new THREE.BufferAttribute(new Uint8Array(moveableZ), 1)
    );

    this.grid.material = new THREE.ShaderMaterial({
      uniforms: {
        translateX: { value: this.translateX },
        speedZ: { value: this.speedZ },
        gridLimits: { value: new THREE.Vector2(-gridLimit, gridLimit) },
        time: { value: 0 },
      },
      vertexShader: `
            uniform float time;
            uniform vec2 gridLimits;
            uniform float speedZ;
            uniform float translateX;
            
            attribute float moveableX;
            attribute float moveableZ;
            
            varying vec3 vColor;
        
            void main() {
                vColor = color;
                float limLen = gridLimits.y - gridLimits.x;
                vec3 pos = position;
                if (floor(moveableX + 0.5) > 0.5){ // if a point has "moveableX" attribute = 1 
                  float xDist = translateX;
                  float currXPos = mod((pos.x + xDist) - gridLimits.x, limLen) + gridLimits.x;
                  pos.x = currXPos;
                } 
                if (floor(moveableZ + 0.5) > 0.5){ // if a point has "moveable" attribute = 1 
                  float zDist = speedZ * time;
                  float currZPos = mod((pos.z + zDist) - gridLimits.x, limLen) + gridLimits.x;
                  pos.z = currZPos;
                } 
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
            }
        `,
      fragmentShader: `
            varying vec3 vColor;
        
            void main() {
                gl_FragColor = vec4(vColor, 1.);
            }
        `,
      vertexColors: THREE.VertexColors,
    });
    scene.add(this.grid);
  }

  initializeScene(scene, camera, reply) {
    // prepare 3D scene
    if (reply) {
      this.objectsParent.traverse((item) => {
        if (child instanceof THREE.Mesh) {
          // child item
          if (item.userData.type === "obstacle") {
            this.setupObstacles(item);
          } else {
            item.userData.price = this.setupBonus(item);
          }
        } else {
          // the anchor itself
          item.position.set(0, 0, 0);
        }
      });
    } else {
      this.createShip(scene);
      this.createGrid(scene);

      this.objectsParent = new THREE.Group();
      scene.add(this.objectsParent);

      for (let i = 0; i < 10; i++) {
        this.spawnObstacle();
      }

      for (let i = 0; i < 10; i++) {
        this.spawnBonus();
      }
      camera.rotateX((-20 * Math.PI) / 180);
      camera.position.set(0, 1.5, 2);
    }
  }

  spawnObstacle() {
    // create geometry
    const obj = new THREE.Mesh(this.OBSTACLE_PREFAB, this.OBSTACLE_MATERIAL);
    this.setupObstacles(obj);
    obj.userData = {
      type: "obstacle",
    };
    this.objectsParent.add(obj);
  }

  setupObstacles(obj, refXPos = 0, refZPos = 0) {
    // random scale
    obj.scale.set(
      this.randomFloat(0.5, 2),
      this.randomFloat(0.5, 2),
      this.randomFloat(0.5, 2)
    );

    // random position
    obj.position.set(
      refXPos + this.randomFloat(-30, 30),
      obj.scale.y * 0.5,
      refZPos - 100 - this.randomFloat(0, 100)
    );
  }

  spawnBonus() {
    const obj = new THREE.Mesh(
      this.BONUS_PREFAB,
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    const price = this.setupBonus(obj);
    obj.userData = {
      type: "bonus",
      price,
    };
    this.objectsParent.add(obj);
  }

  setupBonus(obj, refXPos = 0, refZPos = 0) {
    const price = this.randomInt(5, 20);
    const ratio = price / 20;

    const size = ratio * 0.5;
    obj.scale.set(size, size, size);
    const hue = 0.5 + ratio * 0.5;
    obj.material.color.setHSL(hue, 1, 0.5);

    // random position
    obj.position.set(
      refXPos + this.randomFloat(-30, 30),
      obj.scale.y * 0.5,
      refZPos - 100 - this.randomFloat(0, 100)
    );
  }

  shakeCamera(initialPosition, remainingShakes = 0.5) {
    const $this = this;

    const startPosition = this.camera.position.clone();

    const startOffset = { x: 0, y: 0 };
    const endOffset = {
      x: this.randomFloat(-0.25, 8.25),
      y: this.randomFloat(-0.25, 0.25),
    };

    this.cameraLerp = new Lerp(
      startOffset,
      endOffset,
      this.randomFloat(0.1, 0.22)
    )
      .onUpdate((value) => {
        $this.camera.position.set(
          startPosition.x + value.x,
          startPosition.y + value.y,
          startPosition.z
        );
      })
      .onFinish(() => {
        if (remainingShakes > 0)
          $this.shakeCamera(initialPosition, remainingShakes - 1);
        else {
          this.cameraLerp = null;
          $this.camera.position.set(
            initialPosition.x,
            initialPosition.y,
            initialPosition.z
          );
        }
      });
  }

  createScorePopup() {}

  randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

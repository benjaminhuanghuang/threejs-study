import * as THREE from "three";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 10, 50);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var clock = new THREE.Clock();
var time = 0;
const grid = createGrid(scene);

function render() {
  requestAnimationFrame(render);

  time += clock.getDelta();
  grid.material.uniforms.time.value = time;

  renderer.render(scene, camera);
}
render();


function createGrid(scene) {
  const division = 20; // divisions across the grid
  const gridLimit = 100;   // grid size
  const grid = new THREE.GridHelper(gridLimit * 2, division, "red", "blue");

  var moveableZ = [];
  for (let i = 0; i <= division; i++) {
    moveableZ.push(1, 1, 0, 0); // move horizontal lines only (1 - point is moveable)
  }

  grid.geometry.setAttribute(
    "moveableZ",
    new THREE.BufferAttribute(new Uint8Array(moveableZ), 1)
  );
  grid.material = new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 0,
      },
      limits: {
        value: new THREE.Vector2(-gridLimit, gridLimit),
      },
      speed: {
        value: 5,
      },
    },
    vertexShader: `
    uniform float time;
    uniform vec2 limits;
    uniform float speed;
    
    attribute float moveable;
    
    varying vec3 vColor;
  
    void main() {
      vColor = color;
      float limLen = limits.y - limits.x;
      vec3 pos = position;
      if (floor(moveable + 0.5) > 0.5){ // if a point has "moveable" attribute = 1 
        float dist = speed * time;
        float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
        pos.z = currPos;
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
    vertexColors: true //THREE.vertexColors,
  });

  scene.add(grid);

  return grid;
}




```js
// create a cube and torus knot and add them to the scene
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshPhongMaterial({ color:
  0x0000FF });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -1;
cube.castShadow = true;
scene.add(cube);


const torusKnotGeometry = new THREE.TorusKnotBufferGeometry(0.5, 0.2, 100, 100);
const torusKnotMat = new THREE.MeshStandardMaterial({
  color: 0x00ff88,
  roughness: 0.1,
});
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMat);
torusKnotMesh.castShadow = true;
torusKnotMesh.position.x = 2;
scene.add(torusKnotMesh);

// create a very large ground plane
const groundGeometry = new THREE.PlaneBufferGeometry(10000, 10000)
const groundMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff
})
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
groundMesh.position.set(0, -2, 0)
groundMesh.rotation.set(Math.PI / -2, 0, 0)
groundMesh.receiveShadow = true
scene.add(groundMesh)

```


THREE.AmbientLight: This is just a simple light that affects everything with the `same intensity and color`.
```js
scene.add(new THREE.AmbientLight(0x666666))
```

THREE.DirectionalLight: This is a light source whose rays are cast `in parallel` to one another. This is pretty much how we experience the light of the Sun.
```js
const dirLight = new THREE.DirectionalLight(0xaaaaaa)
dirLight.position.set(5, 12, 8)
dirLight.castShadow = true
```

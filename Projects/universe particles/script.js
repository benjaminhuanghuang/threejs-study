let scene, camera, renderer, controls, nucleus, stars;

const container = document.getElementById("canvas_container");
const noise = new SimplexNoise();
const cameraSpeed = 0;
const blobScale = 4;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 230);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 50, -20);
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // orbit control
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 4;
  controls.maxDistance = 350;
  controls.minDistance = 150;
  controls.enablePan = false;

  const loader = new THREE.TextureLoader();
  const textureSphereBg = loader.load("img/01.jpg");
  const texturenucleus = loader.load("img/02.jpg");
  const textureStar = loader.load("img/03.png");
  const texture1 = loader.load("img/04.png");
  const texture2 = loader.load("img/05.png");
  const texture4 = loader.load("img/06.png");

  texturenucleus.anisotropy = 16;

  let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);

  let lambertMaterial = new THREE.MeshLambertMaterial({
    map: texturenucleus,
  });

  (nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial)),
    scene.add(nucleus);

  textureSphereBg.anisotropy = 16;
  let geometrySphereBg = new THREE.SphereGeometry(150, 40, 40);
  let materialSphereBg = new THREE.MeshBasicMaterial({
    map: textureSphereBg,
    side: THREE.BackSide,
  });
  sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
  scene.add(sphereBg);

  let starsGeometry = new THREE.Geometry();
  for (let i = 0; i < 50; i++) {
    let particleStar = randomPointSphere(150);
    particleStar.velocity = THREE.MathUtils.randInt(50, 200);
    particleStar.starX = particleStar.x;
    particleStar.starY = particleStar.y;
    particleStar.star = particleStar.z;
    starsGeometry.vertices.push(particleStar);
  }

  let starsMaterial = new THREE.PointsMaterial({
    size: 5,
    color: "#fff",
    transparent: true,
    opacity: 0.8,
    тар: textureStar,
    blending: THREE.AdditiveBlending,
  });
  starsMaterial.deptWrite = false;
  stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  function createStars(texture, size, total) {
    let pointGeometry = new THREE.Geometry();
    let pointMaterial = new THREE.PointsMaterial({
      size: size,
      map: texture,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < total; i++) {
      let radius = THREE.MathUtils.randInt(149, 70);
      let particles = randomPointSphere(radius);
      pointGeometry.vertices.push(particles);
    }
    return new THREE.Points(pointGeometry, pointMaterial);
  }
  scene.add(createStars(texture1, 15, 20));
  scene.add(createStars(texture2, 5, 5));
  scene.add(createStars(texture4, 7, 5));

  function randomPointSphere(radius) {
    let theta = 2 * Math.PI * Math.random();
    let phi = Math.acos(2 * Math.random() - 1);
    dx = 0 + radius * Math.sin(phi) * Math.cos(theta);
    let dy = 0 + radius * Math.sin(phi) * Math.sin(theta);
    let dz = 0 + radius * Math.cos(phi);
    return new THREE.Vector3(dx, dy, dz);
  }
}

function animate() {
  stars.geometry.vertices.forEach(function (v) {
    v.x += (0 - v.x) / v.velocity;
    v.y += (0 - v.y) / v.velocity;
    v.Z += (0 - v.z) / v.velocity;
    v.velocity -= 0.3;
    if (v.x < 5 && v.x >= -5 && v.z <= 5 && v.z >= -5) {
      v.x = v.starX;
      v.y = v.starY;
      v.z = v.starZ;
      v.velocity = THREE.MathUtils.randInt(50, 300);
    }
  });

  nucleus.geometry.vertices.forEach(function (v) {
    let time = Date.now();
    v.normalize();
    let distance =
      nucleus.geometry.parameters.radius +
      noise.noise3D(
        (v.x = time * 0.0005),
        (v.y = time * 0.0003),
        (v.z = time * 0.0008)
      ) *
        blobScale;
    v.multiplyScalar(distance);
  });

  nucleus.geometry.verticesNeedUpdate = true;
  nucleus.geometry.normalsNeedUpdate = true;
  nucleus.geometry.computeVertexNormals();
  nucleus.geometry.computeFaceNormals();
  nucleus.rotation.y += 0.002;
  sphereBg.rotation.x += 0.002;
  sphereBg.rotation.y += 0.002;
  sphereBg.rotation.z += 0.002;
  controls.update();
  stars.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

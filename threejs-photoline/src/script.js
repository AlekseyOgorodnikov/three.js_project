import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

let dots = 50;
let lines = 50;
let radius = 100;

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

const points = [];

for (let i = 0; i < lines; i++) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);
  for (let j = 0; j < dots; j++) {
    let coord = (j / dots) * radius * 2 - radius;
    points.push(new THREE.Vector3(coord, 0, 0));
  }
  line.rotation.z = Math.random() * Math.PI;
  line.rotation.x = Math.random() * Math.PI;
  line.rotation.y = Math.random() * Math.PI;
  scene.add(line);
}

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

function updateLines(time) {
  for (let i = 0; i < lines; i++) {
    let li = scene.children[i];
    for (let j = 0; j < dots; j++) {
      //   let vector = line.geometry.vertices[j];
      //   vector.y = Math.random() * 20;
      console.log(i, j, li);
    }
  }
  line.geometry.verticesNeedUpdate = true;
}

const clock = new THREE.Clock();
let time = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  time++;
  // Update objects
  //   sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  //   controls.update();
  updateLines(time);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

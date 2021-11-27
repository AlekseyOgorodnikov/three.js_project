import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// shaders
import fragmentShader from './shaders/fragment.glsl';
import vertextShader from './shaders/vertex.glsl';
//Perlin Noise
import Perlin from './js/perlinNoise';

import * as dat from 'dat.gui';

var camera, controls, scene, renderer, geometry, mesh;
let size = 90;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  renderer = new THREE.WebGLRenderer();

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerWidth);

  let container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // camera position
  camera.position.z = 200;
  // scene position
  scene.position.x = -100;
  scene.position.y = 0;

  controls = new OrbitControls(camera, renderer.domElement);

  // create element
  const material = new THREE.ShaderMaterial({
    // wireframe: true,
    extensions: {
      derivatives: '#extension GL_OES_standard_derivatives : enable',
    },
    uniforms: {
      time: { type: 'f', value: 0.0 },
    },
    vertexShader: vertextShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
  });

  geometry = new THREE.PlaneGeometry(600, 600, size, size);

  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  animate();
}

// console.log(vertices);
function updatePlane(time) {
  let vertices = geometry.attributes.position.array;

  for (let i = 0; i < vertices.length; i += 3) {
    vertices[i + 2] =
      100 * Perlin(vertices[i] / 100, vertices[i + 1] / 100, time / 100);
  }
  geometry.attributes.position.needsUpdate = true;
}

let time = 0;
function animate() {
  time++;
  updatePlane(time);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();

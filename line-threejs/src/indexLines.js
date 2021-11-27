import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Perlin from './js/perlinNoise';

import * as dat from 'dat.gui';

let camera, controls, scene, renderer, meshX, meshY, groupX, groupY;
let size = 30;

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

  // create group
  groupX = new THREE.Group();
  groupY = new THREE.Group();
  scene.add(groupX, groupY);

  controls = new OrbitControls(camera, renderer.domElement);

  // create element
  let material = new THREE.LineBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < size; i++) {
    let gorizontalLine = [];
    let verticalLine = [];

    for (let j = 0; j < size; j++) {
      gorizontalLine.push(new THREE.Vector3(j * 10, i * 10, 0));
      verticalLine.push(new THREE.Vector3(i * 10, j * 10, 0));
    }

    let geometryX = new THREE.BufferGeometry().setFromPoints(gorizontalLine);
    let geometryY = new THREE.BufferGeometry().setFromPoints(verticalLine);

    meshX = new THREE.Line(geometryX, material);
    meshY = new THREE.Line(geometryY, material);
    groupX.add(meshX);
    groupY.add(meshY);
  }

  animate();
}

function updateGrid(time) {
  for (let i = 0; i < size; i++) {
    //line gorizontal and vertical
    let lineX = groupX.children[i];
    let lineY = groupY.children[i];

    let vertices1 = lineX.geometry.attributes.position.array;
    let vertices2 = lineY.geometry.attributes.position.array;

    for (let j = 0; j < vertices1.length; j += 3) {
      // lineX
      vertices1[j + 2] =
        100 * Perlin(vertices1[j] / 100, vertices1[j + 1] / 100, time / 100);
      // lineY
      vertices2[j + 2] =
        100 * Perlin(vertices2[j] / 100, vertices2[j + 1] / 100, time / 100);
    }

    lineX.geometry.attributes.position.needsUpdate = true;
    lineY.geometry.attributes.position.needsUpdate = true;
  }
}

let time = 0;
function animate() {
  time++;
  updateGrid(time);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();

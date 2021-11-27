import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// shaders
import fragmentShader from './shaders/fragment.glsl';
import vertextShader from './shaders/vertex.glsl';
//Perlin Noise

import img from '../static/texture/foto.jpg';

import * as dat from 'dat.gui';

var container;
var camera, scene, renderer;
var uniforms;
var mouse = { x: 0, y: 0 };
var loader = new THREE.TextureLoader();
document.onmousemove = getMouseXY;

init();
animate();
function getMouseXY(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
  uniforms.u_mouse.value.x = mouse.x;
  uniforms.u_mouse.value.y = mouse.y;
}
function init() {
  container = document.getElementById('container');

  camera = new THREE.Camera();
  camera.position.z = 1;
  scene = new THREE.Scene();
  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  var MyTexture = loader.load('/texture/foto.jpg');

  uniforms = {
    u_time: { type: 'f', value: 1.0 },
    u_animation: { type: 'f', value: 0.0 },
    u_mouse: { type: 'v2', value: new THREE.Vector2() },
    u_resolution: { type: 'v2', value: new THREE.Vector2() },
    u_size: {
      type: 'v2',
      value: new THREE.Vector2(800, 600),
    },
    u_texture: { value: MyTexture },
    map: { value: loader.load('/texture/popkamap.jpg') },
  };
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertextShader,
    fragmentShader: fragmentShader,
  });
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
  uniforms.u_mouse.value.x = mouse.x;
  uniforms.u_mouse.value.y = mouse.y;
}
function animate() {
  requestAnimationFrame(animate);
  render();
}
function render() {
  uniforms.u_time.value += 0.05;
  renderer.render(scene, camera);
}

document.addEventListener('click', function () {
  var tl = new TimelineMax();
  tl.to(uniforms.u_animation, 5, { value: 1, ease: Power3.easeInOut });
});

// Style css
import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import * as dat from 'dat.gui';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';

// Variable
const mouse = {
  x: undefined,
  y: undefined,
};

const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 50,
    heightSegments: 50,
  },
};

// Geometry
const palaneGeometry = new THREE.PlaneGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
);

// Material
const planeMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true,
});

// Mesh
const planeMesh = new THREE.Mesh(palaneGeometry, planeMaterial);

// GUI Controls
const gui = new dat.GUI();

// width
gui.add(world.plane, 'width', 1, 500).onChange(generateMesh);
// height
gui.add(world.plane, 'height', 1, 500).onChange(generateMesh);
// widthSegments
gui.add(world.plane, 'widthSegments', 1, 100).onChange(generateMesh);
// heightSegments
gui.add(world.plane, 'heightSegments', 1, 100).onChange(generateMesh);

function generateMesh() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );

  // vertical position randomizatino
  const { array } = planeMesh.geometry.attributes.position;
  const randomValues = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 3 === 0) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];

      array[i] = x + (Math.random() - 0.5) * 3;
      array[i + 1] = y + (Math.random() - 0.5) * 3;
      array[i + 2] = z + (Math.random() - 0.5) * 3;
    }

    randomValues.push(Math.random() * Math.PI * 2);
  }

  planeMesh.geometry.attributes.position.randomValues = randomValues;

  planeMesh.geometry.attributes.position.originalPosition =
    planeMesh.geometry.attributes.position.array;

  const colors = [];
  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4);
  }

  planeMesh.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  );
}

generateMesh();

// base rander
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Camera position
camera.position.z = 50;
new OrbitControls(camera, renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, -1, 1);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);

// Scene add
scene.add(planeMesh, light, backLight);

// Animation

let frame = 0;

function animation() {
  requestAnimationFrame(animation);
  frame += 0.01;
  // Render
  renderer.render(scene, camera);
  // box.rotation.x += 0.01;

  // Raycaster
  raycaster.setFromCamera(mouse, camera);

  const { array, originalPosition, randomValues } =
    planeMesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    // x
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01;
    // y
    array[i + 1] =
      originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.001;
  }

  planeMesh.geometry.attributes.position.needsUpdate = true;

  const intersects = raycaster.intersectObject(planeMesh);
  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes;

    // verice 1
    color.setX(intersects[0].face.a, 0.1);
    color.setY(intersects[0].face.a, 0.5);
    color.setZ(intersects[0].face.a, 1);

    // verice 2
    color.setX(intersects[0].face.b, 0.1);
    color.setY(intersects[0].face.b, 0.5);
    color.setZ(intersects[0].face.b, 1);

    // verice 3
    color.setX(intersects[0].face.c, 0.1);
    color.setY(intersects[0].face.c, 0.5);
    color.setZ(intersects[0].face.c, 1);

    color.needsUpdate = true;

    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4,
    };

    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1,
    };

    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      onUpdate: () => {
        // verice 1
        color.setX(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.a, hoverColor.g);
        color.setZ(intersects[0].face.a, hoverColor.b);

        // verice 2
        color.setX(intersects[0].face.b, hoverColor.r);
        color.setY(intersects[0].face.b, hoverColor.g);
        color.setZ(intersects[0].face.b, hoverColor.b);

        // verice 3
        color.setX(intersects[0].face.c, hoverColor.r);
        color.setY(intersects[0].face.c, hoverColor.g);
        color.setZ(intersects[0].face.c, hoverColor.b);

        color.needsUpdate = true;
      },
    });
  }
}

animation();

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
});

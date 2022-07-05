import './style.css';

import * as THREE from 'three';
import { AmbientLight, GridHelper } from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



// initializing camera and scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);





const geometry = new THREE.OctahedronGeometry(10, 3, 16, 100) 
const material = new THREE.MeshStandardMaterial( {color: 0xffffff, wireframe: true});
const poly = new THREE.Mesh( geometry, material);

scene.add(poly)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar(){
  const geometry = new THREE.SphereGeometry(0.1, 0.1, 0.1);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
 star.position.set(x,y,z);
 scene.add(star); 

}
Array(200).fill().forEach(addStar);

const bgTexture = new THREE.TextureLoader().load('images/1black.jpg');
scene.background = bgTexture;

/*const floareTexture = new THREE.TextureLoader().load('floaredor.jpg')
const floare = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: floareTexture})
);
scene.add(floare);*/

// ball

const moonTexture = new THREE.TextureLoader().load('images/water.jpg');
const normalTexture = new THREE.TextureLoader().load('images/1black.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);



function animate(){
  requestAnimationFrame(animate);
  poly.rotation.x += 0.01;
  poly.rotation.y += 0.005;
  poly.rotation.z += 0.01;
  pointLight.position.x += 1;
  pointLight.position.y += 3;
  pointLight.position.z += 1;
  controls.update();

  renderer.render( scene, camera);

}
animate();
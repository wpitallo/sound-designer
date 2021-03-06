/* eslint-disable */

import * as THREE from "three";

let p = [
  [389, 246, 0],
  [410, 255, 20],
  [413, 268, 7],
  [431, 261, 12],
  [418, 244, 30],
  [416, 217, 25],
  [420, 205, 8],
  [427, 227, -20],
  [432, 236, 5],
  [444, 228, 12],
  [451, 232, 41],
  [446, 246, 72],
  [443, 264, 96],
  [446, 278, 65],
  [463, 267, 20],
  [460, 258, -10],
  [464, 243, -20],
  [459, 233, 0],
  [475, 225, 22],
  [484, 225, 29],
  [490, 214, 51],
  [476, 202, 55],
  [462, 202, 55],
  [446, 205, 42],
  [440, 192, 42],
  [430, 183, 72],
  [413, 184, 58],
  [406, 191, 32],
  [406, 207, 0],
  [402, 220, 0],
  [390, 222, 20],
  [385, 228, 10],
  [389, 246, 0]
];

var w = window.innerWidth,
  h = window.innerHeight;
window.onresize = function() {
  var w = window.innerWidth,
    h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
};

let cameraSpeed = 0.0003;
let lightSpeed = 0.001;
let tubularSegments = 1000;
let radialSegments = 3;
let tubeRadius = 2;
let ambientLight = 0x222222;
let lightColor = 0xffffff;
let lightIntensity = 1;
let lightDistance = 20;
let hs = 0; // Hue-Start
let he = 360; // Hue-End

let canvas = document.getElementById("background-canvas");

var renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(w, h);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, w / h, 0.001, 1000);

var starsGeometry = new THREE.Geometry();
for (let i = 0; i < 3000; i++) {
  var star = new THREE.Vector3();
  star.x = THREE.Math.randFloatSpread(1500);
  star.y = THREE.Math.randFloatSpread(1500);
  star.z = THREE.Math.randFloatSpread(1500);
  starsGeometry.vertices.push(star);
}
var starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
var starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

for (let i = 0; i < p.length; i++) {
  var x = p[i][0];
  var y = p[i][2];
  var z = p[i][1];
  p[i] = new THREE.Vector3(x, y, z);
}
var path = new THREE.CatmullRomCurve3(p);
var geometry = new THREE.TubeGeometry(path, tubularSegments, tubeRadius, radialSegments, true);

let hue = hs;
let hup = true;
for (let i = 0; i < geometry.faces.length; i++) {
  hup == 1 ? hue++ : hue--;
  hue == he ? (hup = false) : hue == hs ? (hup = true) : 0;
  geometry.faces[i].color = new THREE.Color("hsl(" + hue + ",100%,50%)");
  geometry.faces[i].color = new THREE.Color("hsl(" + hue + ",100%,50%)");
}

var material = new THREE.MeshLambertMaterial({
  side: THREE.BackSide,
  vertexColors: THREE.FaceColors,
  wireframe: true
});

var tube = new THREE.Mesh(geometry, material);
scene.add(tube);

var light = new THREE.PointLight(0xffffff, 1, 50);
scene.add(light);
var light2 = new THREE.AmbientLight(ambientLight);
scene.add(light2);

var l1 = new THREE.PointLight(lightColor, lightIntensity, lightDistance);
scene.add(l1);
var l2 = new THREE.PointLight(lightColor, lightIntensity, lightDistance);
scene.add(l2);
var l3 = new THREE.PointLight(lightColor, lightIntensity, lightDistance);
scene.add(l3);
var l4 = new THREE.PointLight(lightColor, lightIntensity, lightDistance);
scene.add(l4);
var l5 = new THREE.PointLight(lightColor, lightIntensity, lightDistance);
scene.add(l5);

var pct = 0;
var pct2 = 0;

function render() {
  pct += cameraSpeed;
  pct2 += lightSpeed;
  var pt1 = path.getPointAt(pct % 1);
  var pt2 = path.getPointAt((pct + 0.01) % 1);
  camera.position.set(pt1.x, pt1.y, pt1.z);
  camera.lookAt(pt2);
  light.position.set(pt2.x, pt2.y, pt2.z);

  l1.position.set(path.getPointAt((pct2 + 0.0) % 1).x, path.getPointAt((pct2 + 0.0) % 1).y, path.getPointAt((pct2 + 0.0) % 1).z);
  l2.position.set(path.getPointAt((pct2 + 0.2) % 1).x, path.getPointAt((pct2 + 0.2) % 1).y, path.getPointAt((pct2 + 0.2) % 1).z);
  l3.position.set(path.getPointAt((pct2 + 0.4) % 1).x, path.getPointAt((pct2 + 0.4) % 1).y, path.getPointAt((pct2 + 0.4) % 1).z);
  l4.position.set(path.getPointAt((pct2 + 0.6) % 1).x, path.getPointAt((pct2 + 0.6) % 1).y, path.getPointAt((pct2 + 0.6) % 1).z);
  l5.position.set(path.getPointAt((pct2 + 0.8) % 1).x, path.getPointAt((pct2 + 0.8) % 1).y, path.getPointAt((pct2 + 0.8) % 1).z);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

import React from "react";
import "./visualizer.css";

import SimplexNoise from "simplex-noise";
import * as THREE from "three";

//some helper functions here
function fractionate(val, minVal, maxVal) {
  return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
  let fr = fractionate(val, minVal, maxVal);
  let delta = outMax - outMin;
  return outMin + fr * delta;
}

function avg(arr) {
  let total = arr.reduce(function(sum, b) {
    return sum + b;
  });
  return total / arr.length;
}

function max(arr) {
  return arr.reduce(function(a, b) {
    return Math.max(a, b);
  });
}

export default class ThreeVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.noise = new SimplexNoise();

    this.onWindowResize = this.onWindowResize.bind(this);
    this.makeRoughBall = this.makeRoughBall.bind(this);
    this.makeRoughGround = this.makeRoughGround.bind(this);
    this.renderViz = this.renderViz.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    if (!this.loadedIntoDom) {
      //here comes the webgl
      this.scene = new THREE.Scene();
      this.group = new THREE.Group();
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 100);
      this.camera.lookAt(this.scene.position);
      this.scene.add(this.camera);

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // let planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
      // let planeMaterial = new THREE.MeshLambertMaterial({
      //   color: 0xd3d3d3,
      //   side: THREE.DoubleSide,
      //   wireframe: true
      // });

      // this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
      // this.plane.rotation.x = -0.5 * Math.PI;
      // this.plane.position.set(0, 30, 0);
      // this.group.add(this.plane);

      // this.plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
      // this.plane2.rotation.x = -0.5 * Math.PI;
      // this.plane2.position.set(0, -30, 0);
      // this.group.add(this.plane2);

      let icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
      let lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xfc039d,
        wireframe: true
      });

      this.ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
      this.ball.position.set(0, 0, 0);
      this.group.add(this.ball);

      let ambientLight = new THREE.AmbientLight(0xaaaaaa);
      this.scene.add(ambientLight);

      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.intensity = 0.9;
      spotLight.position.set(-10, 40, 20);
      spotLight.lookAt(this.ball);
      spotLight.castShadow = true;
      this.scene.add(spotLight);

      // let orbitControls = new THREE.OrbitControls(camera);
      // orbitControls.autoRotate = true;

      this.scene.add(this.group);

      this.renderer.domElement.className = "three-visualizer";
      this.loadedIntoDom = true;
      document.getElementById("out").appendChild(this.renderer.domElement);
      window.addEventListener("resize", this.onWindowResize, false);
    }
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  attachAnalyser(analyser) {
    this.analyser = analyser;
    this.analyser.fftSize = 512;
    let bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);

    this.renderViz();
    //this.audio.play();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  makeRoughBall(mesh, bassFr, treFr) {
    mesh.geometry.vertices.forEach((vertex, i) => {
      let offset = mesh.geometry.parameters.radius;
      let amp = 7;
      let time = window.performance.now();
      vertex.normalize();
      let rf = 0.0001;
      let distance =
        offset +
        bassFr +
        this.noise.noise3D(
          vertex.x + time * rf * 7,
          vertex.y + time * rf * 8,
          vertex.z + time * rf * 9
        ) *
          amp *
          treFr;
      vertex.multiplyScalar(distance);
    });
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
  }

  makeRoughGround(mesh, distortionFr) {
    // mesh.geometry.vertices.forEach((vertex, i) => {
    //   let amp = 3;
    //   let time = Date.now();
    //   let distance =
    //     (this.noise.noise2D(
    //       vertex.x + time * 0.0003,
    //       vertex.y + time * 0.0001
    //     ) +
    //       0) *
    //     distortionFr *
    //     amp;
    //   vertex.z = distance;
    // });
    // mesh.geometry.verticesNeedUpdate = true;
    // mesh.geometry.normalsNeedUpdate = true;
    // mesh.geometry.computeVertexNormals();
    // mesh.geometry.computeFaceNormals();
  }

  renderViz() {
    this.analyser.getByteFrequencyData(this.dataArray);

    let lowerHalfArray = this.dataArray.slice(0, this.dataArray.length / 2 - 1);
    let upperHalfArray = this.dataArray.slice(
      this.dataArray.length / 2 - 1,
      this.dataArray.length - 1
    );

    let overallAvg = avg(this.dataArray);
    let lowerMax = max(lowerHalfArray);
    let lowerAvg = avg(lowerHalfArray);
    let upperMax = max(upperHalfArray);
    let upperAvg = avg(upperHalfArray);

    let lowerMaxFr = lowerMax / lowerHalfArray.length;
    let lowerAvgFr = lowerAvg / lowerHalfArray.length;
    let upperMaxFr = upperMax / upperHalfArray.length;
    let upperAvgFr = upperAvg / upperHalfArray.length;

    this.makeRoughGround(this.plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
    this.makeRoughGround(this.plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));

    this.makeRoughBall(
      this.ball,
      modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
      modulate(upperAvgFr, 0, 1, 0, 4)
    );

    this.group.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.renderViz);
  }

  render() {
    return (
      <div id="content">
        <div id="out" style={{ width: "1250px" }} />
      </div>
    );
  }
}

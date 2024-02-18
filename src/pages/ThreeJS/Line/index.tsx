import React, { Component } from 'react';
import * as THREE from 'three';

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.sceneRef = React.createRef();
  }

  componentDidMount() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.sceneRef.current.appendChild(renderer.domElement);

    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    points.push(new THREE.Vector3(100, 0, 0));
    points.push(new THREE.Vector3(0, 50, 0));
    points.push(new THREE.Vector3(0, -50, 50));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    //     let points = [new THREE.Vector3(1, 2, 3), new THREE.Vector3(4, 5, 6)];
    // let box = new THREE.Box3().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    renderer.render(scene, camera);
  }

  render() {
    return <div ref={this.sceneRef}></div>;
  }
}

export default ThreeScene;

import React, { Component } from 'react';
import * as Three from 'three';

class ThreeBuilding extends Component {
  constructor(props) {
    super(props);
    this.mountRef = React.createRef();
    this.scene = new Three.Scene();
    this.camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new Three.WebGLRenderer();
    this.building1 = null;
    this.building2 = null;
    this.building3 = null;
  }

  componentDidMount() {
    const mount = this.mountRef.current;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(this.renderer.domElement);

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });

    this.building1 = new Three.Mesh(geometry, material);
    this.building1.position.set(0, 0, -5);
    this.scene.add(this.building1);

    this.building2 = new Three.Mesh(geometry, material);
    this.building2.position.set(0, 2, -5);
    this.scene.add(this.building2);

    this.building3 = new Three.Mesh(geometry, material);
    this.building3.position.set(0, 4, -5);
    this.scene.add(this.building3);

    this.camera.position.z = 5;

    const animate = () => {
      this.frameId = requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };

    animate();

    console.log('index.this', this);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mountRef.current.removeChild(this.renderer.domElement);
  }

  handleBuildingClick = (building) => {
    if (building === 'building2') {
      this.building3.visible = false;
    }
  };

  render() {
    return <div ref={this.mountRef} onClick={() => this.handleBuildingClick('building2')} />;
  }
}

export default ThreeBuilding;

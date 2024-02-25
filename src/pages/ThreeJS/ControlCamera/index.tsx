import React, { Component } from 'react';
import * as THREE from 'three';
// import 'three-obj-loader'; // 这将自动注册OBJLoader
// import 'three-orbit-controls'; // 这将自动注册OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.sceneRef = React.createRef();
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.sceneRef.current.appendChild(renderer.domElement);

    // 设置相机位置
    camera.position.z = 10;

    // 创建控制器并实现相机控制
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // 创建房子和楼层的3D模型
    const houseGeometry = new THREE.BoxGeometry(10, 10, 10);
    const floorGeometry = new THREE.BoxGeometry(10, 1, 10);
    const material = new THREE.MeshBasicMaterial({ color: 'blue' });
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });

    const house = new THREE.Mesh(houseGeometry, material);
    const floor1 = new THREE.Mesh(floorGeometry, floorMaterial);
    const floor2 = new THREE.Mesh(floorGeometry, floorMaterial);

    house.position.set(0, 0, 0);
    floor1.position.set(0, -8, 0);
    floor2.position.set(0, -10, 0);

    // 创建地面的几何体
    const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10); // 宽度和高度可以根据需要调整
    // 创建地面的材质
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 'gray', side: THREE.DoubleSide }); // 颜色可以根据需要调整
    // 创建地面的网格
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotateX(-Math.PI / 2); //平行地面：矩形Mesh默认单面可见，注意旋转-Math.PI / 2

    scene.add(house, floor1, floor2, ground);

    const animate = () => {
      requestAnimationFrame(animate);
      // house.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return (
      <div
        ref={this.sceneRef}
        style={{ width: window.innerWidth, height: window.innerHeight }}
      ></div>
    );
  }
}

export default ThreeScene;

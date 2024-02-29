import React, { Component } from 'react';
import * as THREE from 'three';
// import 'three-obj-loader'; // 这将自动注册OBJLoader
// import 'three-orbit-controls'; // 这将自动注册OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 引入gltf模型加载库GLTFLoader.js
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const floor = {
  one: '1F',
  two: '2F',
  three: '3F',
};

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.sceneRef = React.createRef();
    this.house2F = null;
    this.house3F = null;
    this.scene = null;
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.sceneRef.current.appendChild(renderer.domElement);

    // 创建控制器并实现相机控制
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    //辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(10000);

    // 创建地面的几何体
    const groundSize = 3000;
    const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize, 10, 10); // 宽度和高度可以根据需要调整
    // 创建地面的材质
    const groundMaterial = new THREE.MeshBasicMaterial({
      color: 'gray',
      side: THREE.DoubleSide,
      // transparent: true,
    }); // 颜色可以根据需要调整
    // 创建地面的网格
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotateX(-Math.PI / 2); //平行地面：矩形Mesh默认单面可见，注意旋转-Math.PI / 2

    // 添加一个辅助网格地面
    const gridHelper = new THREE.GridHelper(3000, 25, 0x004444, 0x004444);
    // gridHelper.rotateX(-Math.PI / 2);

    // 设置相机位置
    // camera.position.z = 10;
    camera.position.set(1000, 1000, 1000); // 设置相机位置
    camera.lookAt(0, 0, 0); // 让相机朝向XOY平面的中心点

    // 创建房子和楼层的3D模型
    const houseY = 300;
    const houseGeometry1F = new THREE.BoxGeometry(300, houseY, 400);
    const houseGeometry2F = new THREE.BoxGeometry(300, houseY, 400);
    const houseGeometry3F = new THREE.BoxGeometry(300, houseY, 400);
    const material = new THREE.MeshBasicMaterial({ color: 'blue' });

    const house1F = new THREE.Mesh(houseGeometry1F, material);
    this.house2F = new THREE.Mesh(houseGeometry2F, material);
    this.house3F = new THREE.Mesh(houseGeometry3F, material);

    house1F.position.set(0, houseY / 2, 0);
    this.house2F.position.set(0, houseY / 2 + houseY, 0);
    this.house3F.position.set(0, houseY / 2 + 2 * houseY, 0);

    // 创建GLTF加载器对象
    const loader = new GLTFLoader();

    loader.load(
      '/public/Model/LittlestTokyo.gltf',
      function (gltf) {
        console.log('gltf', gltf);
        console.log('gltf.scene', gltf.scene);
        // 返回的场景对象gltf.scene插入到threejs场景中
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.log('loader.error', error);
      },
    );

    loader.load(
      'path_to_your_model.gltf',
      function (gltf) {
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      },
    );

    scene.add(house1F, this.house2F, this.house3F, ground, gridHelper, axesHelper);

    this.scene = scene;

    const animate = () => {
      requestAnimationFrame(animate);
      // house.rotation.y += 0.01;
      // house.position.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    console.log('index.this', this);
  }

  handleShow2FClick = (value) => {
    if (value === floor.one) {
      this.house2F.visible = false;
    }
    if (value === floor.two) {
      this.house3F.visible = false;
    }
  };

  render() {
    return (
      <div
        ref={this.sceneRef}
        style={{ width: window.innerWidth, height: window.innerHeight, position: 'relative' }}
      >
        <span
          style={{ position: 'absolute', color: 'white' }}
          onClick={() => {
            this.handleShow2FClick(floor.one);
          }}
        >
          {floor.one}
        </span>
        <span
          style={{ position: 'absolute', color: 'white', top: 20 }}
          onClick={() => {
            this.handleShow2FClick(floor.two);
          }}
        >
          {floor.two}
        </span>
      </div>
    );
  }
}

export default ThreeScene;

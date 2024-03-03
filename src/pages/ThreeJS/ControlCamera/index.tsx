import React, { Component } from 'react';
import * as THREE from 'three';
// import 'three-obj-loader'; // 这将自动注册OBJLoader
// import 'three-orbit-controls'; // 这将自动注册OrbitControls
import { OrbitControls } from 'three/addons/controls/OrbitControls';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000,
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true, //开启优化锯齿
      // 背景透明
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
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

    const loader = new GLTFLoader(); //创建一个GLTF加载器

    const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

    loader.load('../../工厂.gltf', function (gltf) {
      //gltf加载成功后返回一个对象
      console.log('控制台查看gltf对象结构', gltf);
      console.log('场景3D模型数据', gltf.scene);
      model.add(gltf.scene); //三维场景添加到model组对象中
    });

    scene.add(model, house1F, this.house2F, this.house3F, gridHelper, axesHelper);
    // scene.add(house1F, this.house2F, this.house3F, ground, gridHelper, axesHelper);

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

import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

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
      10000,
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true, //开启优化锯齿
      // 背景透明
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.sceneRef.current.appendChild(renderer.domElement);

    // 创建控制器并实现相机控制
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    //辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(10000);
    scene.add(axesHelper);

    // 添加一个辅助网格地面
    // const gridHelper = new THREE.GridHelper(3000, 25, 0x004444, 0x004444);
    // scene.add(gridHelper);

    // //create a blue LineBasicMaterial
    // const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    // const points = [];
    // points.push(new THREE.Vector3(-10, 0, 0));
    // points.push(new THREE.Vector3(0, 10, 0));
    // points.push(new THREE.Vector3(10, 0, 0));
    // points.push(new THREE.Vector3(100, 0, 0));
    // points.push(new THREE.Vector3(0, 50, 0));
    // points.push(new THREE.Vector3(0, -50, 50));

    // const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // //     let points = [new THREE.Vector3(1, 2, 3), new THREE.Vector3(4, 5, 6)];
    // // let box = new THREE.Box3().setFromPoints(points);

    // const line = new THREE.Line(geometry, material);
    // scene.add(line);

    // 三维向量Vector3创建一组顶点坐标
    // const arr = [
    //   new THREE.Vector3(-50, 20, 90),
    //   new THREE.Vector3(-10, 40, 40),
    //   new THREE.Vector3(0, 0, 0),
    //   new THREE.Vector3(60, -60, 0),
    //   new THREE.Vector3(70, 0, 80),
    // ];
    // 三维样条曲线
    // const curve = new THREE.CatmullRomCurve3(arr);

    // 二维向量Vector2创建一组顶点坐标
    const arr = [new THREE.Vector2(-100, 0), new THREE.Vector2(0, 30), new THREE.Vector2(100, 0)];
    // 二维样条曲线
    const curve = new THREE.SplineCurve(arr);

    // //曲线上获取点
    const pointsArr = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry();
    //读取坐标数据赋值给几何体顶点
    geometry.setFromPoints(pointsArr);
    // 线材质
    const material = new THREE.LineBasicMaterial({
      color: 0x00fffff,
    });
    // 线模型
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // 用点模型可视化样条曲线经过的顶点位置
    // const geometry2 = new THREE.BufferGeometry();
    // geometry2.setFromPoints(pointsArr);
    // const material2 = new THREE.PointsMaterial({
    //   color: 0xff00ff,
    //   size: 10,
    // });
    // //点模型对象
    // const points = new THREE.Points(geometry2, material2);
    // scene.add(points);

    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return <div ref={this.sceneRef}></div>;
  }
}

export default ThreeScene;

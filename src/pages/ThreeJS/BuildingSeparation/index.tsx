import { useEffect, useRef } from 'react';
import * as Three from 'three';

const ThreeBuilding = () => {
  const mountRef = useRef(null);
  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new Three.WebGLRenderer();
  let building3, building2, building1;

  useEffect(() => {
    const mount = mountRef.current;
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });

    building1 = new Three.Mesh(geometry, material);
    building1.position.set(0, 0, -5);
    scene.add(building1);

    building2 = new Three.Mesh(geometry, material);
    building2.position.set(0, 2, -5);
    scene.add(building2);

    building3 = new Three.Mesh(geometry, material);
    building3.position.set(0, 4, -5);
    scene.add(building3);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  const handleBuildingClick = (building) => {
    if (building === 'building2') {
      building3.visible = false;
    }
  };

  return <div ref={mountRef} onClick={() => handleBuildingClick('building2')} />;
};

export default ThreeBuilding;

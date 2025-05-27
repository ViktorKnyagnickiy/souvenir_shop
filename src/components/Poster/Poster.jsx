import React from "react";
import styles from "../../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const PanoramaModel = () => {
  const { scene } = useGLTF("/models/panorama.glb");
  return <primitive object={scene} scale={[1.5, 1.5, 1.5]} />;
};

const Poster = () => (
  <section className={styles.home}>
    <div className={styles.product}>
      <div className={styles.text}>
        <h1 className={styles.head}>Прогуляйся в 3D просто зараз</h1>
        <p className={styles.description}>
          Ласкаво просимо до нашого магазину традиційних українських сувенірів! У нас знайдете унікальні вироби з Опішнянської та Косівської кераміки, ляльки-мотанки та мистецькі роботи, натхненні спадщиною Марії Приймаченко. Завітайте до нас, аби відчути тепло та автентичність української культури!
        </p>
      </div>
      <div className={styles.image}>
        <div className={styles.canvasWrapper}>
          <Canvas
            camera={{ position: [5, 3, 5], fov: 11 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <PanoramaModel />
            <OrbitControls target={[0, 1, 0]} />
            <Environment preset="sunset" />
          </Canvas>
        </div>
      </div>
    </div>
  </section>
);

useGLTF.preload("/models/panorama.glb");

export default Poster;

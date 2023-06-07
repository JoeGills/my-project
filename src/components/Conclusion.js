import React, { useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import * as THREE from "three";
import "./Conclusion.css";

const Conclusion = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Setup canvas and 3D scene logic
    // Use the canvasRef to access the DOM element

    //Creating a spinning torus with three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up any event listeners or resources
    return () => {
      // Additional cleanup if needed
    };
  }, []);

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={springProps}>
      <canvas ref={canvasRef} />
      <h2>Congratulations!</h2>
      <p>You have successfully completed the challenge.</p>
    </animated.div>
  );
};

export default Conclusion;

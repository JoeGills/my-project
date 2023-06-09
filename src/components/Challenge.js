import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";
import "./Challenge.css";

const Challenge = ({ onComplete }) => {
  const canvasRef = useRef();
  const audioRef = useRef();
  const [muted, setMuted] = useState(false); // State to track muted state

  useEffect(() => {
    // Setup canvas and audio logic
    // Use the canvasRef and audioRef to access the DOM elements

    //Creating a rotating cube with three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Play audio on component mount
    audioRef.current = new Audio("/my-audio-file.mp3");
    audioRef.current.loop = true;
    audioRef.current.muted = muted; // Set initial muted state
    audioRef.current.play();

    // Clean up any event listeners or resources
    return () => {
      //Stop audio playback
      audioRef.current?.pause();
    };
  }, [muted]);

  const bind = useDrag(({ down }) => {
    // Handle user input and interactions
    //update the canvas or play audio based on drag events

    if (!down) {
      // When the user finishes the challenge, call the onComplete callback
      onComplete();
    }
  });

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const toggleMuted = () => {
    setMuted((prevMuted) => !prevMuted); // Toggle the muted state
  };

  return (
    <animated.div className="container" style={springProps}>
      <div className="blinking-line"></div>
      <div className="blinking-line"></div>
      <div className="blinking-line"></div>
      <div className="blinking-line"></div>
      <canvas ref={canvasRef} {...bind()} />
      <button onClick={toggleMuted}>
        {muted ? "Unmute Audio" : "Mute Audio"}
      </button>
      <audio ref={audioRef} src="/my-audio-file.mp3" />
    </animated.div>
  );
};

export default Challenge;

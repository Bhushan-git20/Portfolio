import { useRef, useEffect, useState, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  
  const center = 16;
  const radius = 14;

  const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

function StarfieldPoints() {
  const pointsRef = useRef(null);
  const { size } = useThree();
  
  // Track mouse coordinates outside React state to avoid re-renders
  const mouse = useRef({ x: 0, y: 0 });

  const [positions] = useState(() => {
    const starsCount = 3200;
    const posArray = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    return posArray;
  });

  const [starTexture] = useState(() => createStarTexture());

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX - size.width / 2) * 0.0001;
      mouse.current.y = (event.clientY - size.height / 2) * 0.0001;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    // Base continuous slow rotation
    pointsRef.current.rotation.y += 0.0001;
    pointsRef.current.rotation.x += 0.00005;

    // Mouse parallax
    pointsRef.current.rotation.y += mouse.current.x * 0.5;
    pointsRef.current.rotation.x += mouse.current.y * 0.5;
  });

  if (!positions || !starTexture) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        map={starTexture}
        color={0xffffff}
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

const Starfield = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 20] }}>
        <StarfieldPoints />
      </Canvas>
    </div>
  );
};

export default memo(Starfield);

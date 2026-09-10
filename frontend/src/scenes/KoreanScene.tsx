import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// Cherry blossom rain falling vertically
function CherryBlossoms() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = Math.random() * 8 - 4; // x
      pos[i * 3 + 1] = Math.random() * 8 - 2; // y
      pos[i * 3 + 2] = Math.random() * 6 - 3; // z
      spd[i] = Math.random() * 0.4 + 0.1; // falling speed
    }

    return [pos, spd];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      const xIdx = i * 3;

      // Fall down
      posArr[yIdx] -= speeds[i] * delta * 1.5;
      // Sway left/right
      posArr[xIdx] += Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.005;

      // Reset when below viewport boundary
      if (posArr[yIdx] < -3) {
        posArr[yIdx] = 5;
        posArr[xIdx] = Math.random() * 8 - 4;
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#f472b6" // Cherry pink petals
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function KoreanScene() {
  const characterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (characterRef.current) {
      // Gentle floating of the silhouette character
      characterRef.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
    }
  });

  return (
    <group>
      {/* Falling cherry blossoms */}
      <CherryBlossoms />

      {/* Stylized handsome K-Drama silhouette/avatar */}
      <mesh ref={characterRef} position={[0, 0.5, -3]}>
        <planeGeometry args={[1.8, 3.2]} />
        <meshBasicMaterial 
          color="#0b0816" // Dark silhouette
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Silhouette Glow Border */}
      <mesh position={[0, 0.5, -3.1]} scale={[1.05, 1.05, 1]}>
        <planeGeometry args={[1.8, 3.2]} />
        <meshBasicMaterial 
          color="#a855f7" // Cyan/Purple glow edge
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Fictional neon signs in Seoul night café style */}
      <group position={[-2.8, 1.5, -2]} rotation={[0, Math.PI / 4, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 1.5, 0.8]} />
          <meshStandardMaterial 
            color="#0f172a" 
            roughness={0.5} 
            emissive="#06b6d4" 
            emissiveIntensity={0.6} 
          />
        </mesh>
        <Sparkles count={5} scale={1.2} size={2} speed={1} color="#06b6d4" />
      </group>

      <group position={[2.8, 1.2, -2]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 1.2, 0.6]} />
          <meshStandardMaterial 
            color="#0f172a" 
            roughness={0.5} 
            emissive="#ec4899" 
            emissiveIntensity={0.6} 
          />
        </mesh>
        <Sparkles count={5} scale={1} size={2} speed={1} color="#ec4899" />
      </group>

      {/* Atmospheric lighting */}
      <directionalLight position={[2, 4, 1]} intensity={0.5} color="#06b6d4" />
      <directionalLight position={[-2, 4, 1]} intensity={0.5} color="#ec4899" />
    </group>
  );
}

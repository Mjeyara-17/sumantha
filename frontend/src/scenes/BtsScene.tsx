import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// Moving concert spotlight beams
function Spotlight({ position, rotationZ }: { position: [number, number, number]; rotationZ: number }) {
  const beamRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (beamRef.current) {
      // Oscillate spotlight rotation to simulate scanning stage lights
      beamRef.current.rotation.z = rotationZ + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15;
    }
  });

  return (
    <mesh ref={beamRef} position={position} rotation={[0, 0, rotationZ]}>
      <cylinderGeometry args={[0.01, 1.2, 8, 16]} />
      <meshBasicMaterial 
        color="#a855f7" 
        transparent 
        opacity={0.12} 
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function BtsScene() {
  const lightsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lightsRef.current) {
      lightsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* Stage platform */}
      <mesh position={[0, -2, -3]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#0b071a" roughness={0.6} />
      </mesh>

      {/* Stage neon border */}
      <mesh position={[0, -1.95, -0.1]}>
        <boxGeometry args={[12, 0.05, 0.05]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* Interactive scanning spotlights */}
      <group ref={lightsRef}>
        <Spotlight position={[-4, 1.5, -4]} rotationZ={-0.3} />
        <Spotlight position={[4, 1.5, -4]} rotationZ={0.3} />
        <Spotlight position={[-1.5, 2, -5]} rotationZ={-0.1} />
        <Spotlight position={[1.5, 2, -5]} rotationZ={0.1} />
      </group>

      {/* Floating purple stardust lightsticks simulation */}
      <Sparkles 
        count={150} 
        scale={8} 
        size={3} 
        speed={1.5} 
        color="#a855f7" 
      />

      {/* Purple Heart light indicators floating upwards */}
      {[...Array(6)].map((_, i) => {
        const x = (i - 2.5) * 1.8;
        return (
          <Float key={`heart-${i}`} speed={2.5} floatIntensity={1.2}>
            <mesh position={[x, -0.5 + Math.sin(i) * 0.5, -2]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshBasicMaterial color="#ec4899" toneMapped={false} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

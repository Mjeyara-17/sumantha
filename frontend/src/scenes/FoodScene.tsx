import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Glazed Torus Donut
function Donut({ position, color, glazeColor }: { position: [number, number, number]; color: string; glazeColor?: string }) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Donut Dough */}
      <mesh castShadow>
        <torusGeometry args={[0.32, 0.14, 16, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Glaze */}
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.32, 0.12, 16, 32, Math.PI * 1.6]} />
        <meshStandardMaterial color={glazeColor || "#f43f5e"} roughness={0.1} metalness={0.2} />
      </mesh>
    </group>
  );
}

// Cupcake / Ice cream cone geometry
function IceCream({ position, creamColor }: { position: [number, number, number]; creamColor?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.45;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Waffle Cone */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.22, 0.65, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.7} />
      </mesh>
      {/* Cream Sphere 1 */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color={creamColor || "#f472b6"} roughness={0.35} />
      </mesh>
      {/* Cream Sphere 2 */}
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.19, 16, 16]} />
        <meshStandardMaterial color="#fff1f2" roughness={0.35} />
      </mesh>
      {/* Cherry on top */}
      <mesh position={[0, 0.68, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

// Floating Chocolate Bar
function ChocoBar({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.5, 0.7, 0.1]} />
      <meshStandardMaterial color="#3b1d11" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

// Floating Korean Food Ramen / Tteokbokki Bowl
function FoodBowl({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Bowl */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.25, 0.3, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Food Soup Top */}
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 16]} />
        <meshBasicMaterial color="#ea580c" />
      </mesh>
    </group>
  );
}

export default function FoodScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient dessert sparkles */}
      <Sparkles count={50} scale={10} size={2.5} speed={0.8} color="#f59e0b" />

      {/* Floating Donuts */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
        <Donut position={[-2.4, 1.4, 0]} color="#d97706" glazeColor="#ec4899" />
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
        <Donut position={[2.2, 0.6, -1.8]} color="#d97706" glazeColor="#a855f7" />
      </Float>
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={1.1}>
        <Donut position={[-1.2, -1.2, -2.5]} color="#d97706" glazeColor="#06b6d4" />
      </Float>

      {/* Floating Ice Creams */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
        <IceCream position={[2.0, 2.0, 0.8]} creamColor="#f472b6" />
      </Float>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.3}>
        <IceCream position={[-2.4, -0.6, -1]} creamColor="#38bdf8" />
      </Float>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.9}>
        <IceCream position={[0.6, -1.8, 0.2]} creamColor="#a855f7" />
      </Float>

      {/* Floating Chocolate Bars */}
      <Float speed={2} floatIntensity={1}>
        <ChocoBar position={[-1.8, 2.5, -2]} />
      </Float>
      <Float speed={1.7} floatIntensity={1.1}>
        <ChocoBar position={[1.5, -1.2, 1.5]} />
      </Float>

      {/* Floating Korean Food Bowl */}
      <Float speed={1.5} floatIntensity={0.8}>
        <FoodBowl position={[2.4, -0.5, -1]} />
      </Float>

      {/* Floating Strawberries/Berries */}
      {[...Array(8)].map((_, i) => {
        const theta = (i / 8) * Math.PI * 2;
        const x = Math.sin(theta) * 3.4;
        const z = Math.cos(theta) * 3.4;
        return (
          <Float key={`berry-${i}`} speed={1.8} floatIntensity={0.9}>
            <mesh position={[x, Math.sin(i * 1.5) * 1.8, z]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#ef4444" roughness={0.3} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

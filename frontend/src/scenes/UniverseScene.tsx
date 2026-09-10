import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { PerformanceState } from '../hooks/usePerformanceMode';
import { CakeConfig } from '../components/CakeCustomizerModal';

import MemoryScene from './MemoryScene';
import FoodScene from './FoodScene';
import KoreanScene from './KoreanScene';
import BtsScene from './BtsScene';
import GiftScene from './GiftScene';
import CakeScene from './CakeScene';
import FireworksScene from './FireworksScene';

export type GameZoneType = 
  | 'INTRO' 
  | 'GAME' 
  | 'CHATS'
  | 'FOOD' 
  | 'KOREAN' 
  | 'BTS' 
  | 'PUZZLE'
  | 'TIMELINE'
  | 'LETTER' 
  | 'GIFT' 
  | 'CAKE' 
  | 'FINALE';

interface CameraControllerProps {
  activeZone: GameZoneType;
  selectedMemoryId: number | null;
}

function CameraController({ activeZone, selectedMemoryId }: CameraControllerProps) {
  const { camera } = useThree();
  const lookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  
  // Custom camera travels for each 3D Zone
  const zonePositions: Record<GameZoneType, THREE.Vector3> = {
    INTRO: new THREE.Vector3(0, 0, 11),
    GAME: new THREE.Vector3(0, 3, 16),
    CHATS: new THREE.Vector3(0, 1.5, 14),
    FOOD: new THREE.Vector3(0, 1.5, 9),
    KOREAN: new THREE.Vector3(0, 1.2, 7),
    BTS: new THREE.Vector3(0, 1.5, 9),
    PUZZLE: new THREE.Vector3(0, 1.8, 12),
    TIMELINE: new THREE.Vector3(0, 1.5, 12),
    LETTER: new THREE.Vector3(4, 1.2, 10),
    GIFT: new THREE.Vector3(0, 0.4, 9),
    CAKE: new THREE.Vector3(0, 0.6, 7),
    FINALE: new THREE.Vector3(0, 1.8, 12)
  };

  const zoneLookAtPoints: Record<GameZoneType, THREE.Vector3> = {
    INTRO: new THREE.Vector3(0, 0, 0),
    GAME: new THREE.Vector3(-2, 1.5, 0),
    CHATS: new THREE.Vector3(0, 0, 0),
    FOOD: new THREE.Vector3(0, 0, 0),
    KOREAN: new THREE.Vector3(0, 0.8, -3),
    BTS: new THREE.Vector3(0, 0.5, -4),
    PUZZLE: new THREE.Vector3(0, 0, 0),
    TIMELINE: new THREE.Vector3(0, 1, 0),
    LETTER: new THREE.Vector3(4, 1.2, 0),
    GIFT: new THREE.Vector3(0, 0.4, 0),
    CAKE: new THREE.Vector3(0, -0.2, 0),
    FINALE: new THREE.Vector3(0, 1.5, 0)
  };

  useEffect(() => {
    let targetPos = zonePositions[activeZone] || new THREE.Vector3(0, 0, 10);
    let targetLook = zoneLookAtPoints[activeZone] || new THREE.Vector3(0, 0, 0);

    // Zoom camera close to a specific polaroid memory in GAME zone if selected
    if (activeZone === 'GAME' && selectedMemoryId !== null) {
      const angle = ((selectedMemoryId - 1) / 4) * Math.PI * 2;
      const x = Math.sin(angle) * 4.5;
      const z = Math.cos(angle) * 4.5;
      targetPos = new THREE.Vector3(x, 1.5, z + 2.5);
      targetLook = new THREE.Vector3(x, 1.5, z);
    }

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(lookAtRef.current);

    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 2.2,
      ease: 'power3.inOut'
    });

    gsap.to(lookAtRef.current, {
      x: targetLook.x,
      y: targetLook.y,
      z: targetLook.z,
      duration: 2.2,
      ease: 'power3.inOut'
    });
  }, [activeZone, selectedMemoryId]);

  useFrame(() => {
    camera.lookAt(lookAtRef.current);
  });

  return null;
}

// Central Glowing Cosmic Heart Planet for Sumantha's Little Universe
function CentralCosmicPlanet({ memoryKeys }: { memoryKeys: number }) {
  const planetRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const planets = [
    { name: "Chaos Planet", icon: "😂", angle: 0, unlocked: memoryKeys >= 1 },
    { name: "Chat Planet", icon: "📱", angle: 1, unlocked: memoryKeys >= 2 },
    { name: "Food Planet", icon: "🍰", angle: 2, unlocked: memoryKeys >= 3 },
    { name: "Seoul Planet", icon: "🇰🇷", angle: 3, unlocked: memoryKeys >= 4 },
    { name: "Purple Planet", icon: "💜", angle: 4, unlocked: memoryKeys >= 5 },
    { name: "Memory Planet", icon: "📸", angle: 5, unlocked: memoryKeys >= 6 },
    { name: "Heart Planet", icon: "❤️", angle: 6, unlocked: memoryKeys >= 7 },
  ];

  return (
    <group ref={planetRef} position={[0, 0, -2]}>
      {/* Central Star/Planet Sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial 
          color="#9333ea" 
          emissive="#f59e0b" 
          emissiveIntensity={0.25} 
          roughness={0.4} 
        />
      </mesh>

      {/* Atmospheric Halo */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Orbiting Planetary Nodes */}
      {planets.map((p, idx) => {
        const theta = (idx / planets.length) * Math.PI * 2;
        const radius = 4.2;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        return (
          <group key={idx} position={[x, Math.sin(idx) * 0.4, z]}>
            <mesh>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial 
                color={p.unlocked ? "#f59e0b" : "#334155"} 
                emissive={p.unlocked ? "#ec4899" : "#000000"}
                emissiveIntensity={p.unlocked ? 0.5 : 0}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Tiny Hidden Twinkling Star for Secret Ending
function SecretHiddenStar({ onSecretClick }: { onSecretClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[7.5, 4.2, -6]}>
      <mesh 
        onClick={(e) => {
          e.stopPropagation();
          onSecretClick();
        }}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial 
          color={hovered ? "#ec4899" : "#ffffff"} 
          toneMapped={false} 
        />
      </mesh>
      <Sparkles count={8} scale={0.4} size={3} speed={2} color="#ec4899" />
    </group>
  );
}

interface UniverseSceneProps {
  activeZone: GameZoneType;
  selectedMemoryId: number | null;
  onSelectMemory: (id: number | null) => void;
  perf: PerformanceState;
  giftOpened: boolean;
  onOpenGift: () => void;
  candlesLit: boolean;
  onBlowOutCandles: () => void;
  cakeConfig: CakeConfig;
  memoryKeys: number;
  onSecretStarClick: () => void;
}

export default function UniverseScene({
  activeZone,
  selectedMemoryId,
  onSelectMemory,
  perf,
  giftOpened,
  onOpenGift,
  candlesLit,
  onBlowOutCandles,
  cakeConfig,
  memoryKeys,
  onSecretStarClick
}: UniverseSceneProps) {
  return (
    <Canvas
      gl={{ antialias: perf.tier !== 'low' }}
      dpr={perf.dpr}
      shadows={perf.shadows}
      camera={{ position: [0, 0, 11], fov: 60 }}
      className="w-full h-full"
    >
      <color attach="background" args={['#050308']} />

      {/* Global Lighting System */}
      <ambientLight intensity={activeZone === 'CAKE' && candlesLit ? 0.22 : 0.65} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffd700" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#a855f7" />

      {/* Camera Coordinator */}
      <CameraController activeZone={activeZone} selectedMemoryId={selectedMemoryId} />

      {/* Stars Backdrop */}
      <Stars 
        radius={100} 
        depth={50} 
        count={perf.particleCount * 4} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={activeZone === 'INTRO' ? 1.4 : 0.3} 
      />
      
      {perf.tier !== 'low' && (
        <Sparkles 
          count={perf.particleCount / 3} 
          scale={24} 
          size={1.6} 
          speed={0.2} 
          color={activeZone === 'BTS' ? '#a855f7' : '#ffd700'} 
        />
      )}

      {/* Hidden Secret Twinkling Star */}
      <SecretHiddenStar onSecretClick={onSecretStarClick} />

      {/* RENDER ZONE GRAPHICS */}

      {activeZone === 'INTRO' && (
        <CentralCosmicPlanet memoryKeys={memoryKeys} />
      )}

      {activeZone === 'GAME' && (
        <MemoryScene 
          selectedId={selectedMemoryId} 
          onSelect={onSelectMemory} 
        />
      )}

      {activeZone === 'FOOD' && (
        <FoodScene />
      )}

      {activeZone === 'KOREAN' && (
        <KoreanScene />
      )}

      {activeZone === 'BTS' && (
        <BtsScene />
      )}

      {activeZone === 'GIFT' && (
        <GiftScene opened={giftOpened} onOpen={onOpenGift} />
      )}

      {activeZone === 'CAKE' && (
        <CakeScene 
          lit={candlesLit} 
          onBlowOut={onBlowOutCandles} 
          cakeConfig={cakeConfig}
        />
      )}

      {activeZone === 'FINALE' && (
        <group>
          <FireworksScene particleMultiplier={perf.tier === 'low' ? 0.35 : 1.0} />
          {/* Renders Cake in background for aesthetic setup */}
          <group position={[0, -2, -2]} scale={0.7} rotation={[0, Math.PI / 4, 0]}>
            <CakeScene 
              lit={false} 
              onBlowOut={() => {}} 
              cakeConfig={cakeConfig}
            />
          </group>
        </group>
      )}

      {/* Allow gentle mouse rotation control in INTRO section */}
      {activeZone === 'INTRO' && (
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 1.8} 
          minPolarAngle={Math.PI / 2.2} 
        />
      )}
    </Canvas>
  );
}

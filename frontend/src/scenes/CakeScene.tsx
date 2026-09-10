import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { CakeConfig } from '../components/CakeCustomizerModal';

interface CakeSceneProps {
  lit: boolean;
  onBlowOut: () => void;
  cakeConfig?: CakeConfig;
}

export default function CakeScene({ 
  lit, 
  onBlowOut,
  cakeConfig = { flavor: 'chocolate', topping: 'strawberry', theme: 'purple' }
}: CakeSceneProps) {
  const cakeGroup = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Rotate the cake slowly
  useFrame((state) => {
    if (cakeGroup.current) {
      cakeGroup.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!lit) return;
    onBlowOut();
  };

  // Color mapping based on selected flavor
  const getBaseColor = () => {
    if (cakeConfig.flavor === 'chocolate') return '#2b1408'; // Rich dark chocolate
    if (cakeConfig.flavor === 'strawberry') return '#f43f5e'; // Vibrant strawberry pink
    return '#fef08a'; // Creamy vanilla gold
  };

  const getTopColor = () => {
    if (cakeConfig.flavor === 'chocolate') return '#522510';
    if (cakeConfig.flavor === 'strawberry') return '#fb7185';
    return '#fef9c3';
  };

  const getDollopColor = () => {
    if (cakeConfig.topping === 'chocolate') return '#3e1a0b';
    if (cakeConfig.topping === 'icecream') return '#ffffff';
    return '#ec4899'; // strawberry
  };

  const getCandleAccentColor = () => {
    if (cakeConfig.theme === 'purple') return '#a855f7';
    if (cakeConfig.theme === 'seoul') return '#f472b6';
    if (cakeConfig.theme === 'galaxy') return '#06b6d4';
    return '#f59e0b'; // classic
  };

  return (
    <group 
      ref={cakeGroup} 
      position={[0, -1.2, 0]}
      onClick={handleClick}
      onPointerOver={() => { if (lit) { setHovered(true); document.body.style.cursor = 'pointer'; } }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      {/* --- CAKE BOTTOM LAYER --- */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.55, 0.8, 32]} />
        <meshStandardMaterial 
          color={getBaseColor()}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Rim Cream Dollops (Bottom Tier) */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 1.45;
        return (
          <mesh key={`b-frost-${i}`} position={[r * Math.cos(angle), 0.8, r * Math.sin(angle)]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color={getDollopColor()} roughness={0.5} />
          </mesh>
        );
      })}

      {/* --- CAKE TOP LAYER --- */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 1.05, 0.6, 32]} />
        <meshStandardMaterial 
          color={getTopColor()}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* Rim Cream Dollops (Top Tier) */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const r = 0.95;
        return (
          <mesh key={`t-frost-${i}`} position={[r * Math.cos(angle), 1.4, r * Math.sin(angle)]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
        );
      })}

      {/* Extra Ice Cream Topping on Center (if icecream chosen) */}
      {cakeConfig.topping === 'icecream' && (
        <group position={[0, 1.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#fff1f2" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      )}

      {/* --- CANDLES --- */}
      {[
        { pos: [-0.3, 1.6, 0.2] as [number, number, number], color: getCandleAccentColor() },
        { pos: [0.3, 1.6, 0.2] as [number, number, number], color: '#ec4899' },
        { pos: [0, 1.6, -0.3] as [number, number, number], color: '#f59e0b' }
      ].map((candle, idx) => (
        <group key={`candle-${idx}`} position={candle.pos}>
          {/* Candle stick */}
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
            <meshStandardMaterial color={candle.color} roughness={0.4} />
          </mesh>
          {/* Wick */}
          <mesh position={[0, 0.26, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
            <meshBasicMaterial color="#334155" />
          </mesh>

          {/* Candle Flame (Extinguished if not lit) */}
          {lit ? (
            <group position={[0, 0.36, 0]}>
              <mesh>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#f59e0b" toneMapped={false} />
              </mesh>
              {/* Core flame */}
              <mesh scale={[0.5, 1.5, 0.5]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
              </mesh>
              {/* Candle light */}
              <pointLight distance={3.5} intensity={2.0} color="#f59e0b" />
              <Sparkles count={4} scale={0.2} size={3} speed={2} color="#f59e0b" />
            </group>
          ) : (
            // Small rising smoke particles when blown out
            <group position={[0, 0.36, 0]}>
              <Sparkles count={6} scale={0.35} size={1.2} speed={1.2} color="#94a3b8" />
            </group>
          )}
        </group>
      ))}

      {/* HTML interactive hint */}
      {lit && (
        <Html distanceFactor={6} position={[0, 2.3, 0]} center>
          <div 
            className={`px-4 py-2 border rounded-full text-[9px] tracking-[0.15em] font-semibold uppercase transition-all shadow-md ${
              hovered 
                ? 'bg-amber-400 border-white text-slate-950 scale-105 shadow-amber-500/30' 
                : 'bg-space-card border-space-border text-slate-300'
            }`}
          >
            Click Cake to Blow Out Candles 🎂✨
          </div>
        </Html>
      )}
    </group>
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { memories } from '../data/memories';

interface TimelineSceneProps {
  scrollProgress: number; // Value from 0 (top scroll) to 1 (timeline end)
}

export default function TimelineScene({ scrollProgress }: TimelineSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Arrange timeline milestones along Z-axis (Z decreases as we go forward in time)
  const milestones = [
    { z: 32, year: "2023", title: "Where it Began", desc: "First connection, late chats, and starting our unique timeline." },
    { z: 24, year: "2024", title: "Sparks & Adventures", desc: "Coffee dates, concert tickets, and laughing until our cheeks hurt." },
    { z: 16, year: "2025", title: "Starry Ridge Escapes", desc: "Watching shooting stars under blankets and setting big life plans." },
    { z: 8, year: "2026", title: "Deeper Connections", desc: "Overcoming challenges together and strengthening our cosmic bonds." },
    { z: 0, year: "TODAY", title: "Your Day ❤️", desc: "Celebrating the wonderful light you represent. Happy Birthday, Camille!" }
  ];

  useFrame(() => {
    if (groupRef.current) {
      // Map scroll progress (0 to 1) to transition the timeline group along the Z axis!
      // This pulls the Z coordinates forward towards the camera as the user scrolls,
      // creating a gorgeous cinematic fly-through timeline effect!
      const startZ = -15;
      const endZ = 35;
      const targetZ = startZ + scrollProgress * (endZ - startZ);
      
      // Interpolate position smoothly
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      
      // Glimmering rotation tilt based on mouse parallax
      groupRef.current.rotation.y = Math.sin(scrollProgress * Math.PI) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing vector connecting milestones */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 16]}>
        <cylinderGeometry args={[0.02, 0.02, 45, 8]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.15} />
      </mesh>

      {/* Render milestone nodes */}
      {milestones.map((stone, idx) => (
        <group key={idx} position={[idx % 2 === 0 ? -1.8 : 1.8, 0, stone.z]}>
          
          {/* Glowing node sphere */}
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={idx === milestones.length - 1 ? "#ec4899" : "#ffd700"} />
          </mesh>

          {/* Halo Ring */}
          <mesh scale={[1.8, 1.8, 1.8]}>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshBasicMaterial 
              color={idx === milestones.length - 1 ? "#ec4899" : "#ffd700"} 
              transparent 
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* HTML Timeline panel card */}
          <Html
            transform
            distanceFactor={5.5}
            occlude="blending"
            className="pointer-events-none select-none"
          >
            <div className="w-[180px] bg-space-card border border-space-border backdrop-blur-md p-4 rounded-xl shadow-2xl flex flex-col gap-2">
              <span className="font-display font-black text-amber-500 text-sm tracking-widest">
                {stone.year}
              </span>
              <h4 className="font-display text-white text-[11px] font-bold tracking-wide">
                {stone.title}
              </h4>
              <p className="text-slate-400 font-light text-[9px] leading-relaxed tracking-wide">
                {stone.desc}
              </p>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

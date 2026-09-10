import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { photoMemories, PhotoMemoryItem } from '../data/photoMemories';
import SafeImage from '../components/SafeImage';

interface FloatingMemoryCardProps {
  photo: PhotoMemoryItem;
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  isSelected: boolean;
  onSelect: (id: number | null) => void;
}

function FloatingMemoryCard({
  photo,
  position,
  rotation,
  speed,
  isSelected,
  onSelect
}: FloatingMemoryCardProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && !isSelected) {
      const t = state.clock.getElapsedTime() * speed;
      groupRef.current.position.y = position[1] + Math.sin(t) * 0.2;
      groupRef.current.rotation.z = rotation[2] + Math.sin(t * 0.8) * 0.05;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(isSelected ? null : photo.id);
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* 3D hitbox */}
      <mesh onClick={handleClick}>
        <planeGeometry args={[2.5, 3.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Html
        transform
        distanceFactor={5.5}
        occlude="blending"
        className="pointer-events-none select-none"
        style={{
          transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transform: `scale(${isSelected ? 1.3 : hovered ? 1.1 : 0.95})`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
          className={`w-[220px] h-[275px] bg-white p-2.5 pb-5 rounded-md shadow-2xl flex flex-col justify-between border pointer-events-auto transition-all duration-300 ${
            isSelected 
              ? 'border-amber-400 ring-4 ring-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)]' 
              : hovered 
                ? 'border-purple-400 shadow-purple-500/40' 
                : 'border-slate-200 shadow-lg'
          }`}
        >
          {/* Polaroid Photo Box */}
          <div className="w-full h-[185px] rounded-xs overflow-hidden relative bg-black">
            <SafeImage
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover"
              focusX={photo.focusX}
              focusY={photo.focusY}
            />
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-[8px] font-mono text-purple-200">
              PHOTO #{photo.id.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Polaroid Footnote */}
          <div className="text-center mt-2 px-1">
            <div className="font-display font-black text-slate-900 text-xs tracking-wide truncate">
              {photo.title}
            </div>
            <div className="font-mono text-[8px] text-purple-600 font-semibold mt-0.5 uppercase tracking-wider">
              {isSelected ? "TAP TO CLOSE" : "CLICK TO ZOOM • 3D"}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

interface MemorySceneProps {
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export default function MemoryScene({ selectedId, onSelect }: MemorySceneProps) {
  // Photos 02, 03, 04 are the 3 floating memory frames around glowing planet
  const memoryPlanetPhotos = [
    photoMemories[1], // Photo 02
    photoMemories[2], // Photo 03
    photoMemories[3]  // Photo 04
  ];

  const configs: Array<{
    pos: [number, number, number];
    rot: [number, number, number];
    speed: number;
  }> = [
    { pos: [-3.2, 1.2, 1.0], rot: [0, 0.35, -0.05], speed: 1.1 },
    { pos: [0, 2.0, -1.2], rot: [0, 0, 0.04], speed: 0.9 },
    { pos: [3.2, 1.0, 0.8], rot: [0, -0.35, 0.05], speed: 1.3 }
  ];

  return (
    <group>
      {/* Orbital glow ring */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]} position={[0, 1.2, 0]}>
        <ringGeometry args={[4.2, 4.3, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>

      {memoryPlanetPhotos.map((photo, idx) => (
        <FloatingMemoryCard
          key={photo.id}
          photo={photo}
          position={configs[idx].pos}
          rotation={configs[idx].rot}
          speed={configs[idx].speed}
          isSelected={selectedId === photo.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

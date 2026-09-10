import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { photoMemories, PhotoMemoryItem } from '../data/photoMemories';
import SafeImage from './SafeImage';
import { X, RotateCcw, Sparkles as SparkleIcon, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

// Generate parametric 3D Heart coordinates for 22 points
function getHeartPosition(index: number, total: number): [number, number, number] {
  const t = (index / total) * Math.PI * 2;
  // Parametric heart formula:
  // x = 16 * sin^3(t)
  // y = 13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t)
  const x = (16 * Math.pow(Math.sin(t), 3)) * 0.35;
  const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.35 + 0.5;
  // Subtle depth oscillation
  const z = Math.sin(t * 2) * 1.5;
  return [x, y, z];
}

interface ConstellationNodeProps {
  photo: PhotoMemoryItem;
  position: [number, number, number];
  onSelectPhoto: (photo: PhotoMemoryItem) => void;
}

function ConstellationNode({ photo, position, onSelectPhoto }: ConstellationNodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Glowing Star Point */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#f59e0b"
          emissiveIntensity={hovered ? 2.5 : 1.2}
        />
      </mesh>

      {/* Floating 3D Polaroid Thumbnail */}
      <Html
        transform
        distanceFactor={6}
        occlude="blending"
        style={{
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transform: `scale(${hovered ? 1.4 : 1.0})`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onSelectPhoto(photo)}
          className={`w-20 h-24 sm:w-24 sm:h-28 bg-white/95 p-1 pb-3 rounded-md shadow-xl border select-none transition-all duration-300 ${
            hovered 
              ? 'border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.8)] z-30' 
              : 'border-white/40 shadow-md'
          }`}
        >
          <div className="w-full h-16 sm:h-20 rounded-xs overflow-hidden bg-black relative">
            <SafeImage
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover"
              focusX={photo.focusX}
              focusY={photo.focusY}
            />
          </div>
          <div className="text-[7px] sm:text-[8px] font-black text-slate-800 text-center mt-1 truncate px-0.5">
            #{photo.id.toString().padStart(2, '0')}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Draw glowing constellation lines connecting heart nodes in sequence
function ConstellationLines() {
  const points = photoMemories.map((_, idx) => {
    const pos = getHeartPosition(idx, photoMemories.length);
    return new THREE.Vector3(...pos);
  });
  // Close the heart loop
  points.push(new THREE.Vector3(...getHeartPosition(0, photoMemories.length)));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive object={new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#ec4899'),
        transparent: true,
        opacity: 0.45,
        linewidth: 2
      })
    )} />
  );
}

interface HeartConstellation3DProps {
  onClose: () => void;
}

export default function HeartConstellation3D({ onClose }: HeartConstellation3DProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemoryItem | null>(null);

  const triggerCelebrate = () => {
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.4 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col select-none animate-fade-in">
      {/* HUD Header */}
      <div className="absolute top-0 inset-x-0 z-30 p-4 sm:p-6 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/90 via-black/40 to-transparent">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-pink-500/20 rounded-2xl border border-pink-400/40">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300">
              SUMANTHA'S 22-PHOTO HEART CONSTELLATION ❤️
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-300 font-mono">
              All 22 memories arranged in 3D orbit around your special day • 11 September
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={triggerCelebrate}
            className="p-2.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-400/40 text-pink-300 transition-all"
            title="Celebrate"
          >
            <SparkleIcon className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-white transition-all"
            title="Exit Constellation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 14], fov: 60 }}
          className="w-full h-full"
        >
          <color attach="background" args={['#030108']} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffd700" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ec4899" />

          {/* Stars & Galaxy Particles */}
          <Stars radius={80} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1.2} />
          <Sparkles count={200} scale={20} size={2} speed={0.4} color="#ec4899" />

          {/* Constellation Glow Lines */}
          <ConstellationLines />

          {/* Center 3D Plaque */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Html center position={[0, 0.4, 0]} className="pointer-events-none">
              <div className="text-center bg-black/70 backdrop-blur-md p-4 sm:p-6 rounded-3xl border-2 border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.4)] w-64 sm:w-72">
                <h2 className="text-lg sm:text-2xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-amber-400">
                  SUMANTHA
                </h2>
                <div className="text-xs font-mono text-amber-300 tracking-widest mt-1">
                  11 • SEPTEMBER
                </div>
                <div className="text-[10px] text-pink-200 mt-2 italic">
                  "22 photos... 22 little moments... Aana idhoda memories mudiyala ❤️"
                </div>
              </div>
            </Html>
          </Float>

          {/* Render all 22 Nodes */}
          {photoMemories.map((photo, idx) => {
            const pos = getHeartPosition(idx, photoMemories.length);
            return (
              <ConstellationNode
                key={photo.id}
                photo={photo}
                position={pos}
                onSelectPhoto={setSelectedPhoto}
              />
            );
          })}

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            maxDistance={25}
            minDistance={6}
          />
        </Canvas>
      </div>

      {/* Footer Banner */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-30 pointer-events-none flex justify-center bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <div className="bg-slate-950/80 backdrop-blur-md border border-purple-500/40 px-6 py-2 rounded-full text-center pointer-events-auto">
          <span className="text-xs sm:text-sm font-medium text-purple-200">
            "Gallery full aagalam... Namma nonsense mattum mudiyathu 😂❤️"
          </span>
        </div>
      </div>

      {/* Selected Photo Modal Viewer */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="max-w-md w-full bg-slate-900 border-2 border-purple-500/40 rounded-3xl p-6 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-amber-300 font-bold">
                PHOTO #{selectedPhoto.id.toString().padStart(2, '0')} • {selectedPhoto.category.toUpperCase()}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-64 h-72 sm:w-72 sm:h-80 mx-auto rounded-2xl overflow-hidden border-2 border-purple-400 mb-4">
              <SafeImage
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
                focusX={selectedPhoto.focusX}
                focusY={selectedPhoto.focusY}
              />
            </div>

            <h3 className="text-lg font-bold text-white font-display mb-1">
              {selectedPhoto.title}
            </h3>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {selectedPhoto.caption}
            </p>
            {selectedPhoto.funnyCaption && (
              <p className="text-xs text-amber-300 font-medium italic">
                {selectedPhoto.funnyCaption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

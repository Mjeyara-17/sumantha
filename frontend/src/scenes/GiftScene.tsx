import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface GiftSceneProps {
  opened: boolean;
  onOpen: () => void;
}

export default function GiftScene({ opened, onOpen }: GiftSceneProps) {
  const giftGroup = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);
  const [animating, setAnimating] = useState(false);
  const [showSparks, setShowSparks] = useState(false);

  // Slow ambient rotation of gift box
  useFrame((state) => {
    if (giftGroup.current && !animating) {
      giftGroup.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      giftGroup.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  const handleOpenClick = (e: any) => {
    e.stopPropagation();
    if (opened || animating) return;
    
    setAnimating(true);
    
    // Shaking timeline sequence
    const tl = gsap.timeline({
      onComplete: () => {
        // Fly lid off
        if (lidRef.current) {
          gsap.to(lidRef.current.position, {
            y: 3.5,
            z: -2.0,
            duration: 1.2,
            ease: 'power3.out'
          });
          gsap.to(lidRef.current.rotation, {
            x: Math.PI / 1.5,
            y: Math.PI / 3,
            z: Math.PI / 4,
            duration: 1.2,
            ease: 'power3.out',
            onComplete: () => {
              setShowSparks(true);
              onOpen(); // Trigger parent reveal
              setAnimating(false);
            }
          });
        }
      }
    });

    // Box shaking vibration
    if (giftGroup.current) {
      tl.to(giftGroup.current.rotation, { z: 0.1, duration: 0.08, repeat: 3, yoyo: true })
        .to(giftGroup.current.rotation, { z: -0.1, duration: 0.08, repeat: 3, yoyo: true })
        .to(giftGroup.current.rotation, { z: 0, duration: 0.05 });
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <group 
        ref={giftGroup}
        onClick={handleOpenClick}
        onPointerOver={() => { if (!opened) document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        {/* --- GIFT LID (Tweened up upon open) --- */}
        <mesh ref={lidRef} position={[0, 0.65, 0]}>
          <boxGeometry args={[1.65, 0.35, 1.65]} />
          <meshStandardMaterial 
            color="#ec4899" // Pink lid
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Lid Ribbon Knot */}
        {!opened && (
          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.4} /> {/* Gold knot */}
          </mesh>
        )}

        {/* --- GIFT BASE BOX --- */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.5, 1.3, 1.5]} />
          <meshStandardMaterial 
            color="#6b21a8" // Deep purple box base
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Decorative Ribbons wrapping the box sides */}
        {!opened && (
          <>
            {/* Vertical ribbon Z */}
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.2, 1.34, 1.54]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.4} />
            </mesh>
            {/* Vertical ribbon X */}
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[1.54, 1.34, 0.2]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.4} />
            </mesh>
          </>
        )}

        {/* Inside glow item */}
        {opened && (
          <group position={[0, 0.1, 0]}>
            {/* Bright internal spot light */}
            <pointLight intensity={3.5} distance={5} color="#ffd700" />
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color="#ffd700" toneMapped={false} />
            </mesh>
          </group>
        )}

        {/* Floating stardust particle burst when opened */}
        {(opened || showSparks) && (
          <Sparkles 
            count={80} 
            scale={2.8} 
            size={4} 
            speed={2} 
            color="#f59e0b" 
          />
        )}
      </group>
    </Float>
  );
}

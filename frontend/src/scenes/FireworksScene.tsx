import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FireworkExplosionProps {
  center: [number, number, number];
  color: string;
  delay: number;
}

function FireworkExplosion({ center, color, delay }: FireworkExplosionProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  // Generate random radial vectors
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Set initial positions at the center
      pos[i * 3] = center[0];
      pos[i * 3 + 1] = center[1];
      pos[i * 3 + 2] = center[2];

      // Spherical random velocity
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = Math.random() * 2.5 + 1.2;

      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      vel[i * 3 + 2] = Math.cos(phi) * speed;
    }

    return [pos, vel];
  }, [center]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime() + delay;
    const cycle = (time % 2.5) / 2.5; // 2.5 second animation cycle

    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const mat = pointsRef.current.material as THREE.PointsMaterial;

    // Reset particles on cycle boundary
    if (cycle < 0.05) {
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] = center[0];
        posArr[i * 3 + 1] = center[1];
        posArr[i * 3 + 2] = center[2];
      }
      mat.opacity = 1.0;
    } else {
      for (let i = 0; i < particleCount; i++) {
        // Apply velocity
        posArr[i * 3] += velocities[i * 3] * delta * 1.5;
        posArr[i * 3 + 1] += (velocities[i * 3 + 1] - cycle * 0.8) * delta * 1.5; // add gravity drag
        posArr[i * 3 + 2] += velocities[i * 3 + 2] * delta * 1.5;
      }
      // Fade out particles during expansion
      mat.opacity = THREE.MathUtils.lerp(1.0, 0.0, cycle);
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
        size={0.14}
        color={color}
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface FireworksSceneProps {
  particleMultiplier: number;
}

export default function FireworksScene({ particleMultiplier }: FireworksSceneProps) {
  const explosions = [
    { center: [0, 4, -4] as [number, number, number], color: '#f59e0b', delay: 0 },
    { center: [-3, 2, -2] as [number, number, number], color: '#ec4899', delay: 0.6 },
    { center: [3, 3, -3] as [number, number, number], color: '#06b6d4', delay: 1.2 },
    { center: [-1.5, 5, -5] as [number, number, number], color: '#a855f7', delay: 1.8 }
  ];

  return (
    <group>
      {explosions.map((exp, idx) => (
        <FireworkExplosion
          key={idx}
          center={exp.center}
          color={exp.color}
          delay={exp.delay}
        />
      ))}
    </group>
  );
}

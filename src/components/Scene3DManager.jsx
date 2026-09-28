import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function GardenAmbienceScene({ scrollProgress }) {
  const cameraGroupRef = useRef();
  const fairyLightsRef = useRef();
  const foliageRef = useRef();
  const lanternsRef = useRef();

  // Fairy string lights data
  const fairyLights = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      pos: [
        (i - 12) * 0.7,
        2.2 + Math.sin(i * 0.4) * 0.35,
        -1.5 + Math.cos(i * 0.3) * 0.5,
      ],
      color: i % 2 === 0 ? '#FFE8A3' : '#E2A72E',
      blinkOffset: i * 0.3,
    }));
  }, []);

  // Hanging garden lanterns (for footer & evening sunset)
  const lanterns = useMemo(() => {
    return [
      { pos: [-3.2, 0.8, -1.0], color: '#FFA534' },
      { pos: [3.2, 1.2, -1.2], color: '#FFB84D' },
      { pos: [-2.0, -0.6, -0.8], color: '#FFA534' },
      { pos: [2.4, -0.4, -1.0], color: '#FF9419' },
    ];
  }, []);

  // Floating background garden leaves
  const backgroundFoliage = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      initPos: [
        (Math.sin(i * 1.3) * 6) + (i % 2 === 0 ? 1 : -1),
        (Math.cos(i * 1.9) * 4) - 0.5,
        (Math.sin(i * 2.7) * 2) - 2.5,
      ],
      scale: 0.15 + (i % 3) * 0.08,
      speed: 0.2 + (i % 3) * 0.1,
      color: i % 2 === 0 ? '#7FA043' : '#6B7F2E',
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current; // 0 to 1

    // 1. Smooth Camera Flight through the garden
    if (cameraGroupRef.current) {
      // Hero (p=0) -> About (p=0.3) -> Menu (p=0.55) -> Gallery (p=0.75) -> Sunset Footer (p=1.0)
      const targetZ = 5 - p * 3.5;
      const targetY = -p * 2.8;
      const targetRotX = p * 0.25;
      const targetRotY = Math.sin(p * Math.PI) * 0.2;

      cameraGroupRef.current.position.z = THREE.MathUtils.lerp(cameraGroupRef.current.position.z, targetZ, 0.05);
      cameraGroupRef.current.position.y = THREE.MathUtils.lerp(cameraGroupRef.current.position.y, targetY, 0.05);
      cameraGroupRef.current.rotation.x = THREE.MathUtils.lerp(cameraGroupRef.current.rotation.x, targetRotX, 0.05);
      cameraGroupRef.current.rotation.y = THREE.MathUtils.lerp(cameraGroupRef.current.rotation.y, targetRotY, 0.05);
    }

    // 2. Fairy lights shimmer
    if (fairyLightsRef.current) {
      fairyLightsRef.current.children.forEach((lightMesh, idx) => {
        const item = fairyLights[idx];
        const pulse = 0.6 + Math.sin(t * 2.5 + item.blinkOffset) * 0.4;
        if (lightMesh.material) {
          lightMesh.material.opacity = pulse * Math.min(1, p * 2.5); // brighter as you scroll past hero
        }
      });
    }

    // 3. Lanterns sway in breeze and glow at sunset
    if (lanternsRef.current) {
      const footerWeight = THREE.MathUtils.smoothstep(p, 0.65, 1.0);
      lanternsRef.current.children.forEach((lanternGroup, idx) => {
        lanternGroup.rotation.z = Math.sin(t * 1.2 + idx) * 0.08;
        lanternGroup.scale.setScalar(footerWeight * 1.2);
      });
    }

    // 4. Subtle foliage drift
    if (foliageRef.current) {
      foliageRef.current.children.forEach((leaf, idx) => {
        const item = backgroundFoliage[idx];
        leaf.position.y = item.initPos[1] + Math.sin(t * item.speed + idx) * 0.25;
        leaf.rotation.z += 0.003;
      });
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} color="#FAF6EB" />
      <directionalLight position={[5, 8, 3]} intensity={1.2} color="#FFF8E7" />
      <pointLight position={[0, -2, 2]} intensity={0.8} color="#E2A72E" />

      <group ref={cameraGroupRef}>
        {/* Fairy String Lights (Draped across garden canopy) */}
        <group ref={fairyLightsRef}>
          {fairyLights.map((light, i) => (
            <mesh key={i} position={light.pos}>
              <sphereGeometry args={[0.065, 12, 12]} />
              <meshBasicMaterial color={light.color} transparent opacity={0.8} />
            </mesh>
          ))}
        </group>

        {/* Hanging Lanterns (Glows as footer approaches) */}
        <group ref={lanternsRef}>
          {lanterns.map((l, i) => (
            <group key={i} position={l.pos}>
              {/* String */}
              <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
                <meshBasicMaterial color="#3B2A1E" />
              </mesh>
              {/* Lantern Frame */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.35, 0.5, 0.35]} />
                <meshStandardMaterial color="#3E4A22" wireframe />
              </mesh>
              {/* Glowing Core */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshBasicMaterial color={l.color} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Ambient Drifting Foliage */}
        <group ref={foliageRef}>
          {backgroundFoliage.map((f, i) => (
            <mesh key={i} position={f.initPos} scale={f.scale}>
              <sphereGeometry args={[0.5, 10, 10]} />
              <meshStandardMaterial color={f.color} roughness={0.6} transparent opacity={0.4} />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}

export default function Scene3DManager() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1.2]}
      >
        <GardenAmbienceScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

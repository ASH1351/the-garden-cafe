import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowDown, Compass, UtensilsCrossed } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* 1. Procedural 3D Golden Teacup on a Tulip Stem with Leaves        */
/* ------------------------------------------------------------------ */
function TeacupPlant({ growthProgress, mousePos }) {
  const groupRef = useRef();
  const stemRef = useRef();
  const leafLeftRef = useRef();
  const leafRightRef = useRef();
  const cupGroupRef = useRef();
  const steamGroupRef = useRef();

  // Steam particle data
  const steamPuffs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      offset: i * 0.45,
      speed: 0.7 + (i % 3) * 0.2,
      xSpread: (Math.sin(i * 1.5) * 0.12),
      scale: 0.12 + (i % 4) * 0.04,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Mouse Parallax tilt (smooth lerp)
    if (groupRef.current) {
      const targetRotY = mousePos.current.x * 0.45;
      const targetRotX = -mousePos.current.y * 0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);

      // Gentle floating sway
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    }

    // 2. Growth animation driven by growthProgress (0 to 1)
    const p = growthProgress.current;

    if (stemRef.current) {
      // Stem grows upward from ground
      stemRef.current.scale.y = THREE.MathUtils.lerp(stemRef.current.scale.y, p, 0.08);
      stemRef.current.position.y = (stemRef.current.scale.y * 1.25) / 2 - 1.2;
    }

    // Leaves unfurl outward as plant grows
    if (leafLeftRef.current && leafRightRef.current) {
      const leafScale = Math.max(0.001, (p - 0.2) / 0.8);
      const sway = Math.sin(t * 1.8) * 0.06;

      leafLeftRef.current.scale.setScalar(leafScale);
      leafLeftRef.current.rotation.z = 0.55 + sway;
      leafLeftRef.current.rotation.y = -0.3 + Math.cos(t * 1.4) * 0.05;

      leafRightRef.current.scale.setScalar(leafScale);
      leafRightRef.current.rotation.z = -0.55 - sway;
      leafRightRef.current.rotation.y = 0.3 - Math.cos(t * 1.4) * 0.05;
    }

    // Cup blooms and opens at the top
    if (cupGroupRef.current) {
      const cupScale = Math.max(0.001, (p - 0.45) / 0.55);
      cupGroupRef.current.scale.setScalar(cupScale);
      cupGroupRef.current.position.y = -1.2 + (stemRef.current?.scale.y || 1) * 1.25 + 0.3;
      cupGroupRef.current.rotation.y = Math.sin(t * 0.8) * 0.08;
    }

    // 3. Steam rising and fading in gentle sine wave
    if (steamGroupRef.current && p > 0.6) {
      steamGroupRef.current.children.forEach((puff, idx) => {
        const item = steamPuffs[idx];
        const age = (t * item.speed + item.offset) % 2.5; // 0 to 2.5s loop
        const progress = age / 2.5;

        puff.position.y = 0.4 + progress * 1.2;
        puff.position.x = item.xSpread + Math.sin(t * 2 + idx) * (0.08 * progress);
        puff.position.z = Math.cos(t * 1.8 + idx) * (0.06 * progress);

        // Scale expands as it rises
        const s = item.scale * (0.8 + progress * 1.6);
        puff.scale.set(s, s * 1.3, s);

        // Opacity fades out towards top
        if (puff.material) {
          puff.material.opacity = Math.sin(progress * Math.PI) * 0.45;
        }
      });
    }
  });

  // Materials
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E2A72E'),
        roughness: 0.28,
        metalness: 0.35,
        emissive: new THREE.Color('#785108'),
        emissiveIntensity: 0.15,
      }),
    []
  );

  const stemMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#6B7F2E'),
        roughness: 0.5,
        metalness: 0.1,
      }),
    []
  );

  const leafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#7FA043'),
        roughness: 0.42,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
    []
  );

  const coffeeLiquidMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3B2A1E'),
        roughness: 0.2,
        metalness: 0.1,
      }),
    []
  );

  const creamMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FAF6EB'),
        roughness: 0.35,
      }),
    []
  );

  const soilMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3E4A22'),
        roughness: 0.8,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base Earth / Moss Mound */}
      <mesh position={[0, -1.25, 0]} material={soilMaterial} receiveShadow>
        <cylinderGeometry args={[0.9, 1.2, 0.25, 32]} />
      </mesh>
      {/* Terracotta Saucer Ring */}
      <mesh position={[0, -1.35, 0]} material={goldMaterial}>
        <cylinderGeometry args={[1.3, 1.15, 0.1, 32]} />
      </mesh>

      {/* Growing Stem */}
      <mesh ref={stemRef} position={[0, -0.6, 0]} material={stemMaterial} castShadow>
        <cylinderGeometry args={[0.075, 0.09, 1.25, 24]} />
      </mesh>

      {/* Tulip Stem Leaves */}
      <group position={[0, -0.7, 0]}>
        {/* Left Botanical Leaf */}
        <group ref={leafLeftRef} position={[-0.04, 0, 0]}>
          <mesh material={leafMaterial} position={[-0.45, 0.3, 0]} rotation={[0.2, 0, -0.3]} castShadow>
            {/* Organic leaf curvature shape */}
            <sphereGeometry args={[0.42, 16, 16]} />
          </mesh>
        </group>

        {/* Right Botanical Leaf */}
        <group ref={leafRightRef} position={[0.04, 0, 0]}>
          <mesh material={leafMaterial} position={[0.45, 0.3, 0]} rotation={[-0.2, 0, 0.3]} castShadow>
            <sphereGeometry args={[0.42, 16, 16]} />
          </mesh>
        </group>
      </group>

      {/* The Blooming Golden Teacup at Top of Stem */}
      <group ref={cupGroupRef} position={[0, 0.35, 0]}>
        {/* Tulip Calyx / Cup Base Petal Support */}
        <mesh position={[0, -0.38, 0]} material={leafMaterial}>
          <coneGeometry args={[0.3, 0.25, 16]} />
        </mesh>

        {/* Main Golden Teacup Body (Tulip silhouette) */}
        <mesh material={goldMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.62, 0.35, 0.72, 32, 1, false]} />
        </mesh>

        {/* Teacup Rim Ring */}
        <mesh position={[0, 0.36, 0]} material={goldMaterial}>
          <torusGeometry args={[0.62, 0.035, 16, 32]} />
        </mesh>

        {/* Inner Cup Porcelain Wall */}
        <mesh position={[0, 0.05, 0]} material={creamMaterial}>
          <cylinderGeometry args={[0.56, 0.3, 0.65, 32, 1, true]} />
        </mesh>

        {/* Steaming Espresso Surface */}
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]} material={coffeeLiquidMaterial}>
          <circleGeometry args={[0.55, 32]} />
        </mesh>

        {/* Latte Art Crema Heart/Rosetta in Cup */}
        <mesh position={[0, 0.225, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.22, 24]} />
          <meshBasicMaterial color="#E0CAA0" opacity={0.85} transparent />
        </mesh>

        {/* Teacup Golden Handle */}
        <mesh position={[0.7, 0.05, 0]} rotation={[0, 0, Math.PI / 8]} material={goldMaterial}>
          <torusGeometry args={[0.24, 0.055, 16, 32, Math.PI * 1.3]} />
        </mesh>

        {/* Rising Steam Group */}
        <group ref={steamGroupRef}>
          {steamPuffs.map((_, i) => (
            <mesh key={i}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshBasicMaterial color="#FFF9ED" transparent opacity={0.35} depthWrite={false} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Floating 3D Elements (Coffee Beans, Petals, Garden Leaves)      */
/* ------------------------------------------------------------------ */
function FloatingGardenElements() {
  const count = 18;
  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const type = i % 3 === 0 ? 'bean' : i % 3 === 1 ? 'petal' : 'leaf';
      return {
        type,
        initPos: [
          (Math.sin(i * 1.7) * 4.5) + (i % 2 === 0 ? 1 : -1) * 1.5,
          (Math.cos(i * 2.1) * 2.8) + 0.2,
          (Math.sin(i * 3.3) * 2.2) - 0.5,
        ],
        speed: 0.3 + (i % 4) * 0.15,
        rotSpeed: [(Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02],
        scale: type === 'bean' ? 0.18 : type === 'petal' ? 0.22 : 0.28,
        color:
          type === 'bean'
            ? '#3B2A1E'
            : type === 'petal'
            ? '#E2A72E'
            : '#7FA043',
      };
    });
  }, []);

  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, idx) => {
      const el = elements[idx];
      // Gentle circular drift and tumbling
      child.position.y = el.initPos[1] + Math.sin(t * el.speed + idx) * 0.35;
      child.position.x = el.initPos[0] + Math.cos(t * el.speed * 0.7 + idx) * 0.2;
      child.rotation.x += el.rotSpeed[0];
      child.rotation.y += el.rotSpeed[1];
      child.rotation.z += el.rotSpeed[2];
    });
  });

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <group key={i} position={el.initPos} scale={el.scale}>
          {el.type === 'bean' ? (
            /* Coffee Bean Shape */
            <group>
              <mesh>
                <sphereGeometry args={[0.7, 16, 16]} />
                <meshStandardMaterial color={el.color} roughness={0.3} metalness={0.1} />
              </mesh>
              {/* Bean Center Crease Groove */}
              <mesh position={[0, 0, 0.45]} scale={[0.15, 0.8, 0.2]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="#1B220E" />
              </mesh>
            </group>
          ) : el.type === 'petal' ? (
            /* Golden Petal */
            <mesh>
              <coneGeometry args={[0.5, 0.9, 12]} />
              <meshStandardMaterial color={el.color} roughness={0.4} side={THREE.DoubleSide} />
            </mesh>
          ) : (
            /* Garden Leaf */
            <mesh>
              <sphereGeometry args={[0.6, 12, 12]} />
              <meshStandardMaterial color={el.color} roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Hero Section Main Component with Canvas & Overlay               */
/* ------------------------------------------------------------------ */
export default function Hero3D({ onExploreMenu, onBookTable }) {
  const mousePos = useRef({ x: 0, y: 0 });
  const growthProgress = useRef(0);
  const [grown, setGrown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Growth animation trigger
  useEffect(() => {
    let animId;
    let startTime = null;

    const animateGrowth = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / 2.2, 1);

      growthProgress.current = 1 - Math.pow(1 - progress, 3);

      if (progress < 1) {
        animId = requestAnimationFrame(animateGrowth);
      } else {
        setGrown(true);
      }
    };

    animId = requestAnimationFrame(animateGrowth);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Mouse, Touch & Gyroscope handler for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mousePos.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mousePos.current.y = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      }
    };

    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mousePos.current.x = THREE.MathUtils.clamp(e.gamma / 30, -1, 1);
        mousePos.current.y = THREE.MathUtils.clamp((e.beta - 45) / 30, -1, 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-cream-200 pt-20 pb-16 sm:pb-20"
    >
      {/* Warm Ambient Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[700px] h-[340px] sm:h-[700px] rounded-full bg-mustard/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-4 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-olive/10 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-4 sm:right-10 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-leaf/15 blur-3xl pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas
          shadows
          camera={{
            position: isMobile ? [0, 0.2, 5.8] : [0, 0.4, 4.8],
            fov: isMobile ? 50 : 45
          }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, isMobile ? 1.5 : 1.75]}
        >
          {/* Warm Garden Lighting */}
          <ambientLight intensity={0.85} color="#FAF6EB" />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.5}
            color="#FFF4D6"
            castShadow
            shadow-mapSize-width={isMobile ? 512 : 1024}
            shadow-mapSize-height={isMobile ? 512 : 1024}
          />
          <pointLight position={[-4, 2, -2]} intensity={0.6} color="#7FA043" />
          <pointLight position={[0, -1, 2]} intensity={0.5} color="#E2A72E" />

          {/* Golden Teacup Plant Centerpiece */}
          <TeacupPlant growthProgress={growthProgress} mousePos={mousePos} />

          {/* Floating Leaves, Beans, and Petals */}
          <FloatingGardenElements />

          {/* Golden Ambient Sparkles */}
          <Sparkles count={isMobile ? 18 : 35} scale={6} size={2.5} speed={0.4} opacity={0.6} color="#E2A72E" />
        </Canvas>
      </div>

      {/* UI Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between pointer-events-none">
        
        {/* Top Floating Badge & Welcome Note */}
        <div className="flex justify-between items-start pt-2 sm:pt-6">
          <div className="pointer-events-auto flex items-center gap-2">
            <span className="ribbon-banner text-[10px] sm:text-xs py-1 px-3.5 sm:px-5 shadow-warm-md">
              EST. 2018
            </span>
          </div>

          {/* Circular Rotating Text Stamp Badge */}
          <div className="pointer-events-auto relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
            <svg
              className="w-full h-full animate-spin-slow text-forest opacity-80"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <text fontSize="8.6" fontWeight="bold" letterSpacing="0.2em" fill="currentColor">
                <textPath href="#circlePath">
                  • FRESHLY BREWED • EST. 2018 • ARTISANAL
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg sm:text-2xl">☕</span>
            </div>
          </div>
        </div>

        {/* Hero Central Typography & Call-To-Actions */}
        <div className="my-auto py-8 sm:py-16 flex flex-col items-center text-center">
          
          {/* Subheading Ribbon */}
          <div className="pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-cream-100/90 border border-olive/30 text-olive text-[10px] sm:text-xs font-sub font-bold tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4 shadow-warm-sm">
            <span>🌿</span>
            <span>BOTANICAL SANCTUARY</span>
            <span>🌿</span>
          </div>

          {/* Massive Handcrafted Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-forest font-bold tracking-tight leading-[1.08] drop-shadow-sm max-w-4xl px-2">
            WHERE COFFEE <br className="hidden xs:inline" />
            <span className="text-olive underline decoration-mustard decoration-wavy decoration-2">
              BLOOMS
            </span>
          </h1>

          {/* Warm Narrative Tagline */}
          <p className="mt-4 max-w-lg text-sm sm:text-base md:text-xl text-espresso/80 font-body font-normal leading-relaxed px-3">
            Step through our vine-covered arches into sun-dappled tables, artisanal single-origin brews, and handcrafted garden bites.
          </p>

          {/* Call to Actions - Full width on small phones */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto w-full max-w-xs sm:max-w-none px-4 sm:px-0">
            {/* Mustard CTA: VIEW MENU */}
            <button
              onClick={onExploreMenu}
              data-cursor="cup"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-mustard hover:bg-mustard-light text-espresso font-sub font-bold text-xs sm:text-sm tracking-widest px-7 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-warm-lg hover:shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              <UtensilsCrossed className="w-4 h-4 text-espresso group-hover:rotate-12 transition-transform" />
              <span>EXPLORE MENU</span>
            </button>

            {/* Green Outline CTA: FIND US */}
            <a
              href="#contact"
              data-cursor="pointer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-cream-100/90 hover:bg-cream-100 text-forest border-2 border-forest/40 hover:border-forest font-sub font-bold text-xs sm:text-sm tracking-widest px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-warm-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-olive" />
              <span>FIND US</span>
            </a>
          </div>

          {/* Handwritten touch */}
          <p className="mt-3 sm:mt-4 font-handwriting text-lg sm:text-2xl text-olive rotate-[-2deg]">
            "Fresh leaves, fresh beans, calm minds."
          </p>
        </div>

        {/* Scroll Indicator at Bottom */}
        <div className="flex flex-col items-center justify-center pb-2 pointer-events-auto">
          <a
            href="#about"
            data-cursor="leaf"
            aria-label="Scroll down to Our Story"
            className="flex flex-col items-center gap-1 text-olive hover:text-forest transition-colors duration-200 group"
          >
            <span className="font-sub text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] font-semibold">
              SCROLL TO DISCOVER
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-olive/30 flex items-center justify-center group-hover:border-olive group-hover:bg-cream-100 transition-all animate-bounce">
              <ArrowDown className="w-3.5 h-3.5 text-olive" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}

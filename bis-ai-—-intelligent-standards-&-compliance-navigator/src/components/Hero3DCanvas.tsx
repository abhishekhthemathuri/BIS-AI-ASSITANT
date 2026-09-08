import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ShieldCheck, Award, FlaskConical, Gem } from 'lucide-react';

interface FloatingBadgeProps {
  position: [number, number, number];
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  glowColor: string;
  speed?: number;
}

function FloatingBadge({ position, title, icon, subtitle, glowColor, speed = 1.5 }: FloatingBadgeProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.0015;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.8} position={position}>
      <group ref={meshRef}>
        {/* Glowing 3D Orb Node */}
        <mesh>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>
        
        {/* Subtle Outer Halo Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[0.3, 0.36, 32]} />
          <meshBasicMaterial color={glowColor} side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>

        {/* 3D Glassmorphic Node HTML Annotation */}
        <Html distanceFactor={11} center position={[0, -0.45, 0]}>
          <div className="select-none pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 text-xs font-semibold text-white tracking-wide">
            <span className="text-cyan-400">{icon}</span>
            <span>{title}</span>
            <span className="text-[10px] text-cyan-200/60 font-mono hidden sm:inline">({subtitle})</span>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function KnowledgeCorePlexus({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const coreGroup = useRef<THREE.Group>(null);
  const innerSphere = useRef<THREE.Mesh>(null);
  const outerWire = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate constellation points
  const particleCount = 280;
  const [positions, lineIndices] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const radius = 2.4;
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.8 + Math.random() * 0.5);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    // Connect close nodes with line segments
    const indices: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.85 && indices.length < 900) {
          indices.push(i, j);
        }
      }
    }

    return [pos, new Uint16Array(indices)];
  }, []);

  useFrame((state, delta) => {
    if (coreGroup.current) {
      // Smooth interactive rotation reacting to cursor
      const targetRotY = state.clock.elapsedTime * 0.12 + mousePosition.x * 0.6;
      const targetRotX = mousePosition.y * 0.4;
      coreGroup.current.rotation.y = THREE.MathUtils.lerp(coreGroup.current.rotation.y, targetRotY, 0.05);
      coreGroup.current.rotation.x = THREE.MathUtils.lerp(coreGroup.current.rotation.x, targetRotX, 0.05);
    }
    if (innerSphere.current) {
      innerSphere.current.rotation.y += delta * 0.25;
    }
    if (outerWire.current) {
      outerWire.current.rotation.x -= delta * 0.15;
      outerWire.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={coreGroup}>
      {/* Central Luminescent Knowledge Sphere */}
      <mesh ref={innerSphere}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Geodesic Wireframe Outer Shell */}
      <mesh ref={outerWire}>
        <icosahedronGeometry args={[1.75, 2]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0369a1"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Point Cloud & Plexus Connectors */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#67e8f9"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Line Segments connecting plexus nodes */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[lineIndices, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0284c7" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Floating 3D Badge Nodes */}
      <FloatingBadge
        position={[2.4, 1.2, 0.8]}
        title="IS Standards"
        subtitle="21,000+ Codes"
        icon={<ShieldCheck className="w-3.5 h-3.5" />}
        glowColor="#06B6D4"
        speed={1.6}
      />
      <FloatingBadge
        position={[-2.5, 1.4, -0.6]}
        title="Certification"
        subtitle="ISI • CRS • FMCS"
        icon={<Award className="w-3.5 h-3.5" />}
        glowColor="#3B82F6"
        speed={1.8}
      />
      <FloatingBadge
        position={[-2.2, -1.3, 0.9]}
        title="Testing Labs"
        subtitle="1,200+ NABL"
        icon={<FlaskConical className="w-3.5 h-3.5" />}
        glowColor="#38BDF8"
        speed={1.4}
      />
      <FloatingBadge
        position={[2.3, -1.2, -0.7]}
        title="Hallmarking"
        subtitle="6-Digit HUID"
        icon={<Gem className="w-3.5 h-3.5" />}
        glowColor="#F59E0B"
        speed={1.7}
      />
    </group>
  );
}

// Fallback Canvas if WebGL has issues or in low-power mode
function FallbackPlexusCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    const nodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * (1 - dist / 130)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block opacity-70" />;
}

export default function Hero3DCanvas() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [webglFailed, setWebglFailed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePosition({ x, y });
  };

  return (
    <div
      id="hero-3d-canvas-container"
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0 pointer-events-auto overflow-hidden"
    >
      {/* Radial Gradient overlay to blend with dark obsidian theme */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-cyan-950/20 via-slate-950/70 to-[#0B0F19] z-10 pointer-events-none" />

      {webglFailed ? (
        <FallbackPlexusCanvas />
      ) : (
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 48 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          onError={() => setWebglFailed(true)}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color="#06b6d4" />
          <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
          <KnowledgeCorePlexus mousePosition={mousePosition} />
        </Canvas>
      )}
    </div>
  );
}

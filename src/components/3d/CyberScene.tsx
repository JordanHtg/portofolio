"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles, Icosahedron, MeshDistortMaterial, Html } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useSecretMode } from "@/store/useSecretMode";
import { FaGithub, FaUserSecret } from "react-icons/fa";
import { motion } from "framer-motion";

// ==========================================
// ORBITAL SYSTEM (SECRET MODE)
// ==========================================

const secretData = [
  { type: "bio", title: "Jourdan Hutagalung", desc: "Software Engineer & Cybersecurity Enthusiast. Exploring the boundary between secure systems and immersive web experiences." },
  { type: "project", title: "Project Zero: Breach", desc: "ML Intrusion Detection 3D", github: "#" },
  { type: "project", title: "Secure Vault API", desc: "Quantum-resistant storage", github: "#" },
  { type: "project", title: "Nexus Cyber Dashboard", desc: "Live threat monitoring", github: "#" },
  { type: "project", title: "QKD Simulator", desc: "BB84 Protocol Simulator", github: "#" }
];

function Planet({ 
  item, 
  idx, 
  total,
  hoveredIndex, 
  setHoveredIndex 
}: { 
  item: typeof secretData[0], 
  idx: number, 
  total: number,
  hoveredIndex: number | null, 
  setHoveredIndex: (v: number | null) => void 
}) {
  const ref = useRef<THREE.Group>(null);
  
  // Base radius 6, each subsequent orbit is +2.5 further away
  const radius = 6 + idx * 2.5;
  // Kecepatan orbit berbeda-beda: makin jauh makin lambat
  const speed = 0.4 / (idx + 1);

  // Initial angular offset so they don't start in a straight line
  const initialAngle = (idx * Math.PI * 2) / total;

  useFrame((state, delta) => {
    if (ref.current) {
      // Pause/slow down when hovered
      const currentSpeed = hoveredIndex === idx ? 0.02 : speed;
      ref.current.rotation.y += delta * currentSpeed;
    }
  });

  // Calculate position on the circle
  const x = Math.cos(initialAngle) * radius;
  const z = Math.sin(initialAngle) * radius;

  return (
    <group ref={ref}>
      <group position={[x, 0, z]}>
        <Html transform sprite distanceFactor={12} zIndexRange={[100, 0]}>
          <motion.div 
            initial={false}
            animate={{
              scale: hoveredIndex === idx ? 1.15 : 1,
              opacity: hoveredIndex === null || hoveredIndex === idx ? 1 : 0.5,
              borderColor: hoveredIndex === idx ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 240, 255, 0.3)',
              boxShadow: hoveredIndex === idx ? '0 0 50px rgba(0, 240, 255, 0.6)' : '0 0 20px rgba(0, 240, 255, 0.2)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[220px] md:w-[260px] p-5 rounded-2xl bg-black/70 backdrop-blur-xl cursor-pointer text-left"
            onPointerEnter={() => setHoveredIndex(idx)}
            onPointerLeave={() => setHoveredIndex(null)}
            onClick={(e) => {
              // Untuk Android/Touch devices, toggle hover state via click
              e.stopPropagation();
              setHoveredIndex(hoveredIndex === idx ? null : idx);
            }}
          >
            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
              {item.type === "bio" ? (
                <FaUserSecret className="w-6 h-6 text-cyber-cyan" />
              ) : (
                <FaGithub className="w-6 h-6 text-white" />
              )}
              <h3 className="text-lg md:text-xl font-heading font-bold text-white leading-tight">
                {item.title}
              </h3>
            </div>
            <p className="text-gray-300 font-sans text-xs md:text-sm">
              {item.desc}
            </p>
            {item.github && (
              <a href={item.github} className="mt-4 inline-block text-[10px] md:text-xs uppercase tracking-wider text-cyber-cyan hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                View Repository →
              </a>
            )}
          </motion.div>
        </Html>
      </group>
      
      {/* Orbital Path Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.03, radius + 0.03, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function OrbitalSystem() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <group>
      {secretData.map((item, idx) => (
        <Planet 
          key={idx} 
          item={item} 
          idx={idx} 
          total={secretData.length}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </group>
  );
}

// ==========================================
// CORE 3D SCENE
// ==========================================

function AnimatedNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { pointer, camera } = useThree();
  const [scrollY, setScrollY] = useState(0);
  const { isSecretMode } = useSecretMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (!isSecretMode) {
        // Normal Mode: React to scroll and pointer
        const scrollRotationX = scrollY * 0.001;
        const scrollRotationY = scrollY * 0.0015;

        const targetX = pointer.x * 2;
        const targetY = pointer.y * 2;
        
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.05);
        
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX + scrollRotationY, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY + scrollRotationX, 0.05);
        
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollY * 0.002, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 0.05);
      } else {
        // Secret Mode: Move Core to center, zoom out camera, spin beautifully
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.02);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.02);
        
        // Auto spin without scroll effect
        groupRef.current.rotation.y += delta * 0.1;
        groupRef.current.rotation.x += delta * 0.05;

        // Animate camera to see the full orbit
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 8, 0.02);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 25, 0.02);
        camera.lookAt(0, 0, 0);
      }

      if (coreRef.current) {
        // Core spins faster in secret mode
        const coreSpeed = isSecretMode ? 1.0 : 0.5;
        coreRef.current.rotation.x -= delta * coreSpeed;
        coreRef.current.rotation.y -= delta * coreSpeed;
      }
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Icosahedron ref={coreRef} args={[1.5, 0]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#0A0A0A"
              emissive="#00F0FF"
              emissiveIntensity={isSecretMode ? 1 : 0.6}
              wireframe
              distort={isSecretMode ? 0.6 : 0.3}
              speed={isSecretMode ? 5 : 3}
              transparent
              opacity={0.8}
            />
          </Icosahedron>
          
          <Icosahedron args={[0.8, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#000000" emissive="#007BFF" emissiveIntensity={0.8} />
          </Icosahedron>
        </Float>
        
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.01, 16, 100]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.2} />
        </mesh>
        
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[3.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#007BFF" transparent opacity={0.2} />
        </mesh>
        
        <Sparkles count={isSecretMode ? 600 : 300} scale={15} size={3} speed={0.5} opacity={0.6} color="#00F0FF" />
      </group>

      {/* Render Orbital System only in Secret Mode */}
      {isSecretMode && <OrbitalSystem />}
    </group>
  );
}

export function CyberScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-cyber-black pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#007BFF" />
        <AnimatedNodes />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

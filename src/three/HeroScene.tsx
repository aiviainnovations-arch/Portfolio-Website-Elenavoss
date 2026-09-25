import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type FloatingPlateProps = {
  src: string;
};

function FloatingPlate({ src }: FloatingPlateProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(src);
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // gentle idle float
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.08;

    // cursor-driven tilt — the "art installation" feel from the brief
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;
    meshRef.current.rotation.y = pointer.current.x * 0.25;
    meshRef.current.rotation.x = -pointer.current.y * 0.15;
  });

  const planeHeight = Math.min(viewport.height * 0.82, 6.2);
  const planeWidth = planeHeight * 0.78;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

type HeroSceneProps = {
  src: string;
};

/**
 * Kept deliberately small: one lazily-mounted plate, no lighting rig, no
 * post-processing. The brief calls for 3D that "enhances the photography"
 * rather than heavy 3D everywhere, so this scene is the only R3F canvas on
 * the page (see Hero.tsx for the mobile / reduced-motion fallback).
 */
export default function HeroScene({ src }: HeroSceneProps) {
  const [ready, setReady] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 32 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => setReady(true)}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <Suspense fallback={null}>
        <FloatingPlate src={src} />
      </Suspense>
    </Canvas>
  );
}

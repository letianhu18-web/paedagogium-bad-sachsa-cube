"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Group, MathUtils, MeshStandardMaterial, type EulerOrder } from "three";
import type { CubeFaceId } from "@/data/site";

interface SceneProps {
  selectedFace: CubeFaceId | null;
  autoRotate: boolean;
  scrambleSeed: number;
  resetKey: number;
  onSelect: (face: CubeFaceId) => void;
}

type Vec3 = [number, number, number];
type Rotation = [number, number, number, EulerOrder?];

const faces: { id: CubeFaceId; color: string; normal: Vec3; rotation: Rotation; visible: (x: number, y: number, z: number) => boolean }[] = [
  { id: "school", color: "#2563eb", normal: [0, 0, 1], rotation: [0, 0, 0], visible: (_x, _y, z) => z === 1 },
  { id: "history", color: "#ef4444", normal: [0, 0, -1], rotation: [0, Math.PI, 0], visible: (_x, _y, z) => z === -1 },
  { id: "leadership", color: "#facc15", normal: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0], visible: (_x, y) => y === 1 },
  { id: "teachers", color: "#22c55e", normal: [1, 0, 0], rotation: [0, Math.PI / 2, 0], visible: (x) => x === 1 },
  { id: "internat", color: "#f8fafc", normal: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], visible: (x) => x === -1 },
  { id: "contact", color: "#f97316", normal: [0, -1, 0], rotation: [Math.PI / 2, 0, 0], visible: (_x, y) => y === -1 },
];
const stickerPalette = faces.map((face) => face.color);

const positions = [-1, 0, 1].flatMap((x) => [-1, 0, 1].flatMap((y) => [-1, 0, 1].map((z) => ({ x, y, z }))));
const targetRotations: Record<CubeFaceId, Vec3> = {
  school: [0.12, 0, 0], history: [0.12, Math.PI, 0], leadership: [Math.PI / 2, 0, 0], teachers: [0.08, -Math.PI / 2, 0], internat: [0.08, Math.PI / 2, 0], contact: [-Math.PI / 2, 0, 0],
};

function Sticker({ face, position, index, scrambleSeed, onSelect }: { face: (typeof faces)[number]; position: Vec3; index: number; scrambleSeed: number; onSelect: (face: CubeFaceId) => void }) {
  const [hovered, setHovered] = useState(false);
  const material = useRef<MeshStandardMaterial>(null);
  const base = scrambleSeed === 0 ? face.color : stickerPalette[(index * 7 + faces.findIndex((item) => item.id === face.id) * 3 + scrambleSeed) % stickerPalette.length];
  const targetColor = useMemo(() => hovered ? new Color(base).lerp(new Color("white"), 0.28) : new Color(base), [base, hovered]);

  useFrame((_state, delta) => {
    if (!material.current) return;
    const alpha = 1 - Math.exp(-delta * 4.8);
    material.current.color.lerp(targetColor, alpha);
    material.current.emissive.lerp(targetColor, alpha);
    material.current.emissiveIntensity = MathUtils.damp(material.current.emissiveIntensity, hovered ? 0.22 : 0.045, 6, delta);
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(face.id);
  };

  return (
    <mesh
      position={position}
      rotation={face.rotation}
      onClick={handleClick}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
      scale={hovered ? 1.06 : 1}
    >
      <planeGeometry args={[0.78, 0.78]} />
      <meshStandardMaterial ref={material} color={face.color} roughness={0.34} metalness={0.06} emissive={face.color} emissiveIntensity={0.045} />
    </mesh>
  );
}

function CubeModel({ selectedFace, autoRotate, scrambleSeed, resetKey, onSelect }: SceneProps) {
  const group = useRef<Group>(null);

  useEffect(() => {
    if (!group.current) return;
    group.current.rotation.set(0.42, -0.58, 0.05);
  }, [resetKey]);

  useEffect(() => {
    if (!group.current || scrambleSeed === 0) return;
    group.current.rotation.x += 1.2;
    group.current.rotation.y -= 1.6;
    group.current.rotation.z += 0.45;
  }, [scrambleSeed]);

  useFrame((_state, delta) => {
    if (!group.current) return;
    if (selectedFace) {
      const target = targetRotations[selectedFace];
      group.current.rotation.x = MathUtils.damp(group.current.rotation.x, target[0], 4.5, delta);
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, target[1], 4.5, delta);
      group.current.rotation.z = MathUtils.damp(group.current.rotation.z, target[2], 4.5, delta);
    } else if (autoRotate) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x += delta * 0.035;
    }
  });

  return (
    <group ref={group} rotation={[0.42, -0.58, 0.05]}>
      {positions.map(({ x, y, z }, cubieIndex) => {
        const center: Vec3 = [x * 0.96, y * 0.96, z * 0.96];
        return (
          <group key={`${x}-${y}-${z}`}>
            <mesh position={center}>
              <boxGeometry args={[0.89, 0.89, 0.89]} />
              <meshStandardMaterial color="#080b12" roughness={0.45} metalness={0.18} />
            </mesh>
            {faces.filter((face) => face.visible(x, y, z)).map((face) => {
              const position: Vec3 = [center[0] + face.normal[0] * 0.456, center[1] + face.normal[1] * 0.456, center[2] + face.normal[2] * 0.456];
              return <Sticker key={face.id} face={face} position={position} index={cubieIndex} scrambleSeed={scrambleSeed} onSelect={onSelect} />;
            })}
          </group>
        );
      })}
    </group>
  );
}

export function RubiksCubeScene(props: SceneProps) {
  return (
    <div className="h-full min-h-[420px] touch-none sm:min-h-[560px]">
      <Canvas camera={{ position: [5.1, 4.2, 6.2], fov: 36 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 7, 5]} intensity={3.4} />
        <directionalLight position={[-5, -2, -4]} intensity={1.4} color="#6ea8ff" />
        <pointLight position={[0, 0, 5]} intensity={1.2} color="#ffffff" />
        <CubeModel {...props} />
        <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={5} maxDistance={10} rotateSpeed={0.65} />
      </Canvas>
    </div>
  );
}

"use client";

import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { CanvasTexture, Euler, Group, MathUtils, Quaternion, SRGBColorSpace, Vector3 } from "three";
import type { CubeFaceId } from "@/data/site";
import type { CubeDemoCommand, CubeDemoCommandType } from "./types";

interface SceneProps {
  selectedFace: CubeFaceId | null;
  command: CubeDemoCommand;
  paused: boolean;
  speed: number;
  loop: boolean;
  onSelect: (face: CubeFaceId) => void;
}

type Axis = "x" | "y" | "z";
type Layer = -1 | 0 | 1;
type QuarterTurns = -1 | 1 | 2;
type Vec3 = [number, number, number];
type Coord = [Layer, Layer, Layer];

interface Move {
  axis: Axis;
  layer: Layer;
  turns: QuarterTurns;
}

interface CubieDefinition {
  id: string;
  coord: Coord;
  position: Vec3;
}

interface CubieState {
  id: string;
  coord: Coord;
  orientation: Quaternion;
}

interface ActiveCubie {
  state: CubieState;
  object: Group;
  startPosition: Vector3;
  startQuaternion: Quaternion;
}

interface ActiveMove {
  move: Move;
  elapsed: number;
  duration: number;
  cubies: ActiveCubie[];
}

interface WaitingStep {
  remaining: number;
  scaleWithSpeed: boolean;
  next: () => void;
}

const SPACING = 0.96;
const CAMERA_CONFIG = { position: [5.2, 4.25, 6.4] as Vec3, fov: 35 };
const DPR_RANGE: [number, number] = [1, 1.65];
const SHADOW_MAP_SIZE: [number, number] = [1024, 1024];
const GRID: Layer[] = [-1, 0, 1];
const AXES: Axis[] = ["x", "y", "z"];
const TURN_OPTIONS: QuarterTurns[] = [-1, 1, 2];
const AXIS_VECTORS: Record<Axis, Vector3> = {
  x: new Vector3(1, 0, 0),
  y: new Vector3(0, 1, 0),
  z: new Vector3(0, 0, 1),
};

const faces: {
  id: CubeFaceId;
  numeral: string;
  color: string;
  normal: Vec3;
  rotation: Vec3;
  visible: (x: number, y: number, z: number) => boolean;
}[] = [
  { id: "school", numeral: "壹", color: "#9ec9b0", normal: [0, 0, 1], rotation: [0, 0, 0], visible: (_x, _y, z) => z === 1 },
  { id: "history", numeral: "貳", color: "#86b89f", normal: [0, 0, -1], rotation: [0, Math.PI, 0], visible: (_x, _y, z) => z === -1 },
  { id: "leadership", numeral: "參", color: "#c8d9b8", normal: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0], visible: (_x, y) => y === 1 },
  { id: "teachers", numeral: "肆", color: "#70a990", normal: [1, 0, 0], rotation: [0, Math.PI / 2, 0], visible: (x) => x === 1 },
  { id: "internat", numeral: "伍", color: "#edf2e2", normal: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], visible: (x) => x === -1 },
  { id: "contact", numeral: "陸", color: "#b7cb9b", normal: [0, -1, 0], rotation: [Math.PI / 2, 0, 0], visible: (_x, y) => y === -1 },
];

const jadeTextureCache = new Map<string, { color: CanvasTexture; bump: CanvasTexture }>();

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function getEngravedJadeTextures(face: (typeof faces)[number]) {
  const cached = jadeTextureCache.get(face.id);
  if (cached) return cached;

  const size = 256;
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const context = colorCanvas.getContext("2d");
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpContext = bumpCanvas.getContext("2d");
  if (!context || !bumpContext) throw new Error("Canvas 2D is unavailable");

  const glow = context.createRadialGradient(78, 58, 8, 128, 128, 205);
  glow.addColorStop(0, "rgba(255,255,238,.62)");
  glow.addColorStop(0.38, face.color);
  glow.addColorStop(0.78, face.color);
  glow.addColorStop(1, "#4d7965");
  context.fillStyle = glow;
  context.fillRect(0, 0, size, size);

  const random = seededRandom(face.numeral.charCodeAt(0));
  for (let line = 0; line < 7; line += 1) {
    context.beginPath();
    context.moveTo(-20, random() * size);
    context.bezierCurveTo(58, random() * size, 158, random() * size, size + 20, random() * size);
    context.strokeStyle = line % 2 === 0 ? "rgba(247,249,226,.15)" : "rgba(33,91,67,.11)";
    context.lineWidth = 0.8 + random() * 2.2;
    context.stroke();
  }

  context.save();
  context.beginPath();
  context.arc(40, 204, 19, Math.PI, Math.PI * 2);
  context.arc(78, 204, 19, Math.PI, Math.PI * 2);
  context.arc(116, 204, 19, Math.PI, Math.PI * 2);
  context.arc(191, 48, 17, 0, Math.PI);
  context.arc(223, 48, 17, 0, Math.PI);
  context.strokeStyle = "rgba(245,239,203,.17)";
  context.lineWidth = 2;
  context.stroke();
  context.restore();

  const font = '700 142px "STKaiti", "KaiTi", "Noto Serif SC", serif';
  context.save();
  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";
  context.shadowColor = "rgba(0,31,21,.78)";
  context.shadowBlur = 6;
  context.shadowOffsetX = 3;
  context.shadowOffsetY = 4;
  context.strokeStyle = "rgba(10,58,40,.94)";
  context.lineWidth = 8;
  context.strokeText(face.numeral, 130, 132);
  context.fillStyle = "rgba(6,51,35,.9)";
  context.fillText(face.numeral, 129, 131);
  context.shadowColor = "transparent";
  context.strokeStyle = "rgba(255,245,202,.48)";
  context.lineWidth = 1.7;
  context.strokeText(face.numeral, 126.5, 127.5);
  context.restore();

  bumpContext.fillStyle = "#f2f2f2";
  bumpContext.fillRect(0, 0, size, size);
  bumpContext.font = font;
  bumpContext.textAlign = "center";
  bumpContext.textBaseline = "middle";
  bumpContext.lineJoin = "round";
  bumpContext.strokeStyle = "#222222";
  bumpContext.lineWidth = 10;
  bumpContext.strokeText(face.numeral, 129, 131);
  bumpContext.fillStyle = "#080808";
  bumpContext.fillText(face.numeral, 129, 131);

  const colorTexture = new CanvasTexture(colorCanvas);
  colorTexture.colorSpace = SRGBColorSpace;
  colorTexture.anisotropy = 4;
  const bumpTexture = new CanvasTexture(bumpCanvas);
  bumpTexture.anisotropy = 4;
  const textures = { color: colorTexture, bump: bumpTexture };
  jadeTextureCache.set(face.id, textures);
  return textures;
}

const cubieDefinitions: CubieDefinition[] = [];
for (const x of GRID) {
  for (const y of GRID) {
    for (const z of GRID) {
      cubieDefinitions.push({
        id: `${x}:${y}:${z}`,
        coord: [x, y, z],
        position: [x * SPACING, y * SPACING, z * SPACING],
      });
    }
  }
}

const targetRotations: Record<CubeFaceId, Vec3> = {
  school: [0.12, 0, 0],
  history: [0.12, Math.PI, 0],
  leadership: [Math.PI / 2, 0, 0],
  teachers: [0.08, -Math.PI / 2, 0],
  internat: [0.08, Math.PI / 2, 0],
  contact: [-Math.PI / 2, 0, 0],
};

const cubeOrientations = (() => {
  const orientations: Quaternion[] = [];
  for (let x = 0; x < 4; x += 1) {
    for (let y = 0; y < 4; y += 1) {
      for (let z = 0; z < 4; z += 1) {
        const candidate = new Quaternion().setFromEuler(new Euler(x * Math.PI / 2, y * Math.PI / 2, z * Math.PI / 2, "XYZ"));
        if (!orientations.some((orientation) => Math.abs(orientation.dot(candidate)) > 0.999999)) {
          orientations.push(candidate);
        }
      }
    }
  }
  return orientations;
})();

function snapQuaternion(quaternion: Quaternion) {
  let closest = cubeOrientations[0];
  let closestDot = -1;
  for (const orientation of cubeOrientations) {
    const dot = Math.abs(orientation.dot(quaternion));
    if (dot > closestDot) {
      closest = orientation;
      closestDot = dot;
    }
  }
  return closest.clone();
}

function rotateCoordinate(coord: Coord, axis: Axis, turns: QuarterTurns): Coord {
  let [x, y, z] = coord;
  const steps = ((turns % 4) + 4) % 4;
  for (let step = 0; step < steps; step += 1) {
    if (axis === "x") [y, z] = [-z as Layer, y];
    if (axis === "y") [x, z] = [z, -x as Layer];
    if (axis === "z") [x, y] = [-y as Layer, x];
  }
  return [x, y, z];
}

function invertMove(move: Move): Move {
  return { ...move, turns: move.turns === 2 ? 2 : move.turns === 1 ? -1 : 1 };
}

function generateScramble(): Move[] {
  const length = 20 + Math.floor(Math.random() * 11);
  const moves: Move[] = [];
  while (moves.length < length) {
    const move: Move = {
      axis: AXES[Math.floor(Math.random() * AXES.length)],
      layer: GRID[Math.floor(Math.random() * GRID.length)],
      turns: TURN_OPTIONS[Math.floor(Math.random() * TURN_OPTIONS.length)],
    };
    const previous = moves.at(-1);
    if (previous?.axis === move.axis) continue;
    moves.push(move);
  }
  return moves;
}

function Sticker({ face, onSelect }: { face: (typeof faces)[number]; onSelect: (face: CubeFaceId) => void }) {
  const [hovered, setHovered] = useState(false);
  const textures = useMemo(() => getEngravedJadeTextures(face), [face]);
  const position = face.normal.map((value) => value * 0.456) as Vec3;

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(face.id);
  };

  return (
    <mesh
      position={position}
      rotation={face.rotation}
      scale={hovered ? 1.045 : 1}
      onClick={handleClick}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <planeGeometry args={[0.76, 0.76]} />
      <meshPhysicalMaterial
        color="#ffffff"
        map={textures.color}
        bumpMap={textures.bump}
        bumpScale={0.068}
        roughness={0.16}
        metalness={0.02}
        clearcoat={1}
        clearcoatRoughness={0.07}
        sheen={0.48}
        sheenColor="#f4f1cf"
        sheenRoughness={0.3}
        iridescence={0.1}
        iridescenceIOR={1.3}
        emissive="#123d2d"
        emissiveIntensity={hovered ? 0.2 : 0.025}
      />
    </mesh>
  );
}

function Cubie({ definition, register, onSelect }: {
  definition: CubieDefinition;
  register: (id: string, object: Group | null) => void;
  onSelect: (face: CubeFaceId) => void;
}) {
  const group = useRef<Group>(null);

  useEffect(() => {
    register(definition.id, group.current);
    return () => register(definition.id, null);
  }, [definition.id, register]);

  return (
    <group ref={group} position={definition.position}>
      <RoundedBox args={[0.89, 0.89, 0.89]} radius={0.065} smoothness={3} castShadow receiveShadow>
        <meshPhysicalMaterial color="#817447" roughness={0.24} metalness={0.2} clearcoat={0.82} clearcoatRoughness={0.16} emissive="#392f16" emissiveIntensity={0.06} />
      </RoundedBox>
      {faces
        .filter((face) => face.visible(...definition.coord))
        .map((face) => <Sticker key={face.id} face={face} onSelect={onSelect} />)}
    </group>
  );
}

function CelestialPedestal() {
  return (
    <group position={[0, -1.82, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[2.25, 2.48, 0.18, 8]} />
        <meshPhysicalMaterial color="#b9d0bb" roughness={0.24} metalness={0.02} clearcoat={0.9} clearcoatRoughness={0.12} />
      </mesh>
      <mesh position={[0, 0.095, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.76, 2.18, 8]} />
        <meshStandardMaterial color="#bca96b" roughness={0.34} metalness={0.28} />
      </mesh>
    </group>
  );
}

function CubeModel({ selectedFace, command, paused, speed, loop, onSelect }: SceneProps) {
  const presentation = useRef<Group>(null);
  const cubieObjects = useRef(new Map<string, Group>());
  const cubieStates = useRef(new Map(cubieDefinitions.map((definition) => [
    definition.id,
    { id: definition.id, coord: [...definition.coord] as Coord, orientation: new Quaternion() },
  ])));
  const activeMove = useRef<ActiveMove | null>(null);
  const waitingStep = useRef<WaitingStep | null>(null);
  const queuedMoves = useRef<Move[]>([]);
  const queueComplete = useRef<() => void>(() => undefined);
  const scramble = useRef<Move[]>([]);
  const loopEnabled = useRef(loop);
  const lastCommandId = useRef(-1);
  const motionTime = useRef(0);
  const rotationQuaternion = useRef(new Quaternion());

  useEffect(() => {
    loopEnabled.current = loop;
  }, [loop]);

  const registerCubie = useCallback((id: string, object: Group | null) => {
    if (object) cubieObjects.current.set(id, object);
    else cubieObjects.current.delete(id);
  }, []);

  const schedule = (seconds: number, next: () => void, scaleWithSpeed = true) => {
    waitingStep.current = { remaining: seconds, next, scaleWithSpeed };
  };

  const resetSolved = () => {
    activeMove.current = null;
    waitingStep.current = null;
    queuedMoves.current = [];
    for (const definition of cubieDefinitions) {
      const state = cubieStates.current.get(definition.id);
      const object = cubieObjects.current.get(definition.id);
      if (!state || !object) continue;
      state.coord = [...definition.coord] as Coord;
      state.orientation.identity();
      object.position.set(...definition.position);
      object.quaternion.identity();
    }
  };

  const runNextMove = () => {
    const move = queuedMoves.current.shift();
    if (!move) {
      queueComplete.current();
      return;
    }

    schedule(0.14, () => {
      const cubies: ActiveCubie[] = [];
      for (const state of cubieStates.current.values()) {
        const axisIndex = move.axis === "x" ? 0 : move.axis === "y" ? 1 : 2;
        if (state.coord[axisIndex] !== move.layer) continue;
        const object = cubieObjects.current.get(state.id);
        if (!object) continue;
        cubies.push({
          state,
          object,
          startPosition: object.position.clone(),
          startQuaternion: object.quaternion.clone(),
        });
      }

      activeMove.current = {
        move,
        elapsed: 0,
        duration: Math.abs(move.turns) === 2 ? 0.7 : 0.48,
        cubies,
      };
    });
  };

  const runQueue = (moves: Move[], onComplete: () => void) => {
    queuedMoves.current = [...moves];
    queueComplete.current = onComplete;
    runNextMove();
  };

  const startCycle = (moves: Move[], initialPause = 0.85) => {
    resetSolved();
    scramble.current = moves;
    schedule(initialPause, () => {
      runQueue(moves, () => {
        schedule(1, () => {
          const solution = [...moves].reverse().map(invertMove);
          runQueue(solution, () => {
            schedule(2, () => {
              if (loopEnabled.current) startCycle(generateScramble(), 0.65);
            }, false);
          });
        }, false);
      });
    }, false);
  };

  const handleCommand = useEffectEvent((type: CubeDemoCommandType) => {
    if (type === "restart") {
      startCycle(scramble.current.length > 0 ? scramble.current : generateScramble(), 0.65);
      return;
    }
    startCycle(generateScramble(), type === "start" ? 0.85 : 0.45);
  });

  useEffect(() => {
    if (command.id === lastCommandId.current) return;
    lastCommandId.current = command.id;
    handleCommand(command.type);
  }, [command]);

  const finishMove = (finished: ActiveMove) => {
    const angle = finished.move.turns * Math.PI / 2;
    const exactRotation = new Quaternion().setFromAxisAngle(AXIS_VECTORS[finished.move.axis], angle);

    for (const cubie of finished.cubies) {
      cubie.state.coord = rotateCoordinate(cubie.state.coord, finished.move.axis, finished.move.turns);
      cubie.state.orientation.copy(snapQuaternion(exactRotation.clone().multiply(cubie.state.orientation)));
      cubie.object.position.set(
        cubie.state.coord[0] * SPACING,
        cubie.state.coord[1] * SPACING,
        cubie.state.coord[2] * SPACING,
      );
      cubie.object.quaternion.copy(cubie.state.orientation);
    }

    activeMove.current = null;
    schedule(0.11, runNextMove);
  };

  useFrame((_state, delta) => {
    const playbackSpeed = MathUtils.clamp(speed, 0.5, 1.8);

    if (!paused) {
      const waiting = waitingStep.current;
      if (waiting) {
        waiting.remaining -= delta * (waiting.scaleWithSpeed ? playbackSpeed : 1);
        if (waiting.remaining <= 0) {
          waitingStep.current = null;
          waiting.next();
        }
      }

      const current = activeMove.current;
      if (current) {
        current.elapsed = Math.min(current.duration, current.elapsed + delta * playbackSpeed);
        const progress = current.elapsed / current.duration;
        const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10);
        const angle = current.move.turns * Math.PI / 2 * eased;
        rotationQuaternion.current.setFromAxisAngle(AXIS_VECTORS[current.move.axis], angle);

        for (const cubie of current.cubies) {
          cubie.object.position.copy(cubie.startPosition).applyQuaternion(rotationQuaternion.current);
          cubie.object.quaternion.copy(rotationQuaternion.current).multiply(cubie.startQuaternion);
        }

        if (progress >= 1) finishMove(current);
      }
    }

    if (!presentation.current || paused) return;
    motionTime.current += delta;
    if (selectedFace) {
      const target = targetRotations[selectedFace];
      presentation.current.rotation.x = MathUtils.damp(presentation.current.rotation.x, target[0], 4.2, delta);
      presentation.current.rotation.y = MathUtils.damp(presentation.current.rotation.y, target[1], 4.2, delta);
      presentation.current.rotation.z = MathUtils.damp(presentation.current.rotation.z, target[2], 4.2, delta);
    } else {
      const time = motionTime.current;
      presentation.current.rotation.x = MathUtils.damp(presentation.current.rotation.x, 0.42 + Math.sin(time * 0.42) * 0.025, 2.2, delta);
      presentation.current.rotation.y = MathUtils.damp(presentation.current.rotation.y, -0.58 + Math.sin(time * 0.31) * 0.05, 2.2, delta);
      presentation.current.rotation.z = MathUtils.damp(presentation.current.rotation.z, 0.05 + Math.sin(time * 0.37) * 0.018, 2.2, delta);
    }
  });

  return (
    <group ref={presentation} rotation={[0.42, -0.58, 0.05]}>
      {cubieDefinitions.map((definition) => (
        <Cubie key={definition.id} definition={definition} register={registerCubie} onSelect={onSelect} />
      ))}
    </group>
  );
}

export function RubiksCubeScene(props: SceneProps) {
  return (
    <div className="h-full min-h-[600px] touch-none sm:min-h-[640px]">
      <Canvas shadows="percentage" camera={CAMERA_CONFIG} dpr={DPR_RANGE} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.82} />
        <hemisphereLight args={["#f4f5dd", "#0a3026", 1.55]} />
        <spotLight position={[5.5, 8, 5]} intensity={78} angle={0.44} penumbra={0.82} color="#fffbe3" castShadow shadow-mapSize={SHADOW_MAP_SIZE} />
        <directionalLight position={[-5, 1, -4]} intensity={2.05} color="#9ed8b7" />
        <pointLight position={[0, -1, 5]} intensity={11} color="#f4dca0" />
        <pointLight position={[-4, 3, 1]} intensity={7} color="#d9f0dd" />
        <CelestialPedestal />
        <CubeModel {...props} />
        <ContactShadows position={[0, -1.71, 0]} opacity={0.34} scale={5.2} blur={2.1} far={2.8} color="#173d2e" />
        <OrbitControls enablePan={false} enableZoom enableDamping dampingFactor={0.075} minDistance={5} maxDistance={10} rotateSpeed={0.62} zoomSpeed={0.72} />
      </Canvas>
    </div>
  );
}

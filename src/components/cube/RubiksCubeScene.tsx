"use client";

import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import { Euler, Group, MathUtils, Quaternion, Vector3 } from "three";
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
  color: string;
  normal: Vec3;
  rotation: Vec3;
  visible: (x: number, y: number, z: number) => boolean;
}[] = [
  { id: "school", color: "#2563eb", normal: [0, 0, 1], rotation: [0, 0, 0], visible: (_x, _y, z) => z === 1 },
  { id: "history", color: "#ef4444", normal: [0, 0, -1], rotation: [0, Math.PI, 0], visible: (_x, _y, z) => z === -1 },
  { id: "leadership", color: "#facc15", normal: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0], visible: (_x, y) => y === 1 },
  { id: "teachers", color: "#22c55e", normal: [1, 0, 0], rotation: [0, Math.PI / 2, 0], visible: (x) => x === 1 },
  { id: "internat", color: "#f8fafc", normal: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], visible: (x) => x === -1 },
  { id: "contact", color: "#f97316", normal: [0, -1, 0], rotation: [Math.PI / 2, 0, 0], visible: (_x, y) => y === -1 },
];

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
        color={face.color}
        roughness={0.28}
        metalness={0.03}
        clearcoat={0.7}
        clearcoatRoughness={0.22}
        emissive={face.color}
        emissiveIntensity={hovered ? 0.16 : 0.025}
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
        <meshPhysicalMaterial color="#07090d" roughness={0.38} metalness={0.26} clearcoat={0.28} clearcoatRoughness={0.35} />
      </RoundedBox>
      {faces
        .filter((face) => face.visible(...definition.coord))
        .map((face) => <Sticker key={face.id} face={face} onSelect={onSelect} />)}
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
        <ambientLight intensity={0.72} />
        <hemisphereLight args={["#dbeafe", "#090b12", 1.35]} />
        <spotLight position={[5.5, 8, 5]} intensity={70} angle={0.42} penumbra={0.78} castShadow shadow-mapSize={SHADOW_MAP_SIZE} />
        <directionalLight position={[-5, 1, -4]} intensity={1.7} color="#79a7ff" />
        <pointLight position={[0, -1, 5]} intensity={9} color="#ffffff" />
        <CubeModel {...props} />
        <ContactShadows position={[0, -2.05, 0]} opacity={0.38} scale={9} blur={2.3} far={4.5} />
        <OrbitControls enablePan={false} enableZoom enableDamping dampingFactor={0.075} minDistance={5} maxDistance={10} rotateSpeed={0.62} zoomSpeed={0.72} />
      </Canvas>
    </div>
  );
}

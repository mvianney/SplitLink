"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { halfOutline, SPLIT_DIR } from "@/lib/splitMark";

const GREEN = "#39FF14";
const THICKNESS = 0.27; // coin thickness, as a fraction of its radius
const LINE_WIDTH = 1.75; // px, the thin black line where the face meets the edge

/**
 * Where each coin sits, measured from gumroad.com's hero.
 * x, y: centre of the coin's front face, in % of the hero width (y from the hero top,
 *       or from the hero bottom when `fromBottom` is set).
 * r: radius, % of the hero width.
 * tilt: 0 = facing you, 90 = edge-on.
 * dir: screen direction the face points (deg; 0 = right, 90 = down, 180 = left, 270 = up).
 * spin: rotation of the bolt on the face (deg).
 */
type CoinDef = {
  x: number;
  y: number;
  r: number;
  tilt: number;
  dir: number;
  spin: number;
  fromBottom?: boolean;
};

const DESKTOP: CoinDef[] = [
  { x: 8.47, y: 8.45, r: 6.46, tilt: 71.1, dir: 232.2, spin: 0 }, // top left
  { x: 89.21, y: 3.69, r: 4.52, tilt: 49.8, dir: 221.6, spin: -38 }, // top right, tucked under the nav
  { x: 6.21, y: 28.58, r: 8.29, tilt: 26.0, dir: 331.5, spin: 52 }, // bottom left, big
  { x: 98.47, y: 27.47, r: 7.85, tilt: 70.9, dir: 316.7, spin: 20 }, // right edge, steep
  { x: 76.2, y: 38.63, r: 6.77, tilt: 45.7, dir: 151.0, spin: -150 }, // bottom right, cut off
];

const MOBILE: CoinDef[] = [
  { x: 7, y: 8, r: 11, tilt: 68, dir: 232, spin: 0 },
  { x: 95, y: 5, r: 9, tilt: 50, dir: 222, spin: -38 },
  { x: 5, y: 7, r: 15, tilt: 26, dir: 331, spin: 52, fromBottom: true },
  { x: 93, y: 3, r: 12, tilt: 46, dir: 151, spin: -150, fromBottom: true },
];

const SPLIT_GAP = 0.1; // how far each half moves out on hover (fraction of radius)

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Re-group an extruded half so the walls along the bolt cut get material 1 (black)
 * while the faces and the round rim keep material 0 (green). That makes the ⚡ read
 * as one solid black bolt from any angle, like the letter on Gumroad's coins.
 */
function paintBoltWalls(geo: THREE.ExtrudeGeometry) {
  const pos = geo.getAttribute("position");
  const face: number[] = [];
  const rim: number[] = [];
  const bolt: number[] = [];
  const copy = (to: number[], i: number) => to.push(pos.getX(i), pos.getY(i), pos.getZ(i));
  for (const g of geo.groups) {
    for (let i = g.start; i < g.start + g.count; i += 3) {
      if (g.materialIndex === 0) {
        for (let k = 0; k < 3; k++) copy(face, i + k);
        continue;
      }
      const onRim = [0, 1, 2].every(
        (k) => Math.hypot(pos.getX(i + k), pos.getY(i + k)) > 0.999,
      );
      for (let k = 0; k < 3; k++) copy(onRim ? rim : bolt, i + k);
    }
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([...face, ...rim, ...bolt], 3),
  );
  const green = (face.length + rim.length) / 3;
  out.addGroup(0, green, 0);
  out.addGroup(green, bolt.length / 3, 1);
  geo.dispose();
  return out;
}

function useHalfGeometries() {
  const geos = useMemo(() => {
    const make = (side: "left" | "right") => {
      const shape = new THREE.Shape(
        halfOutline(side, 20).map(([x, y]) => new THREE.Vector2(x, y)),
      );
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: THICKNESS,
        bevelEnabled: false,
        steps: 1,
      });
      geo.translate(0, 0, -THICKNESS / 2);
      return paintBoltWalls(geo);
    };
    return { left: make("left"), right: make("right") };
  }, []);
  useEffect(
    () => () => {
      geos.left.dispose();
      geos.right.dispose();
    },
    [geos],
  );
  return geos;
}

type Geos = ReturnType<typeof useHalfGeometries>;

function Half({ geometry }: { geometry: THREE.BufferGeometry }) {
  return (
    <>
      <meshBasicMaterial
        attach="material-0"
        color={GREEN}
        toneMapped={false}
        polygonOffset
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
      <meshBasicMaterial
        attach="material-1"
        color="#000"
        toneMapped={false}
        polygonOffset
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
      <Edges geometry={geometry} threshold={20} lineWidth={LINE_WIDTH} color="#000" />
    </>
  );
}

function Coin({ def, geos, reduced }: { def: CoinDef; geos: Geos; reduced: boolean }) {
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const anim = useRef({ hover: false, until: 0, amt: 0, t: 0 });

  const W = size.width;
  const H = size.height;
  const R = (def.r / 100) * W;
  const tilt = THREE.MathUtils.degToRad(def.tilt);
  const dir = THREE.MathUtils.degToRad(def.dir);

  // Front-face centre in hero pixels, then step back half the thickness to the coin's middle.
  const fx = (def.x / 100) * W;
  const fy = def.fromBottom ? H - (def.y / 100) * W : (def.y / 100) * W;
  const back = ((THICKNESS * R) / 2) * Math.sin(tilt);
  const cx = fx - back * Math.cos(dir);
  const cy = fy - back * Math.sin(dir);
  // Turn the "tilted back" coin so its face points along `dir` on screen.
  const turn = Math.atan2(-Math.cos(dir), -Math.sin(dir));

  useFrame((_, delta) => {
    const a = anim.current;
    const dt = Math.min(delta, 1 / 30);
    const active = a.hover || performance.now() < a.until;
    const target = active ? 1 : 0;
    a.amt = reduced ? target : THREE.MathUtils.damp(a.amt, target, 7, dt);
    if (a.amt < 0.001 && !active) a.amt = 0;
    const s = a.amt;
    const w = reduced ? 0 : s; // gentle drift only while split
    if (w > 0) a.t += dt;
    const t = a.t;
    const gap = SPLIT_GAP * s;

    const l = left.current;
    const r = right.current;
    if (l && r) {
      l.position.set(
        -SPLIT_DIR[0] * gap + 0.035 * w * Math.sin(t * 2.1),
        -SPLIT_DIR[1] * gap + 0.035 * w * Math.sin(t * 1.7 + 1),
        0.05 * w * Math.sin(t * 1.3),
      );
      l.rotation.set(
        0.07 * w * Math.sin(t * 1.5),
        0.09 * w * Math.sin(t * 1.2 + 0.5),
        0.04 * w * Math.sin(t * 1.9),
      );
      r.position.set(
        SPLIT_DIR[0] * gap + 0.035 * w * Math.sin(t * 2.3 + 2),
        SPLIT_DIR[1] * gap - 0.035 * w * Math.sin(t * 1.6 + 0.3),
        0.05 * w * Math.sin(t * 1.4 + 1),
      );
      r.rotation.set(
        0.07 * w * Math.sin(t * 1.4 + 2),
        -0.09 * w * Math.sin(t * 1.1 + 1.5),
        -0.04 * w * Math.sin(t * 2 + 1),
      );
    }
    if (active || s > 0) invalidate();
    else a.t = 0;
  });

  const start = () => {
    anim.current.hover = true;
    invalidate();
  };
  const stop = () => {
    anim.current.hover = false;
    invalidate();
  };
  // Touch screens have no hover: a tap splits the coin for a moment.
  const tap = () => {
    anim.current.until = performance.now() + 1600;
    invalidate();
  };

  return (
    <group position={[cx - W / 2, H / 2 - cy, 0]} rotation-z={turn}>
      <group rotation-x={-tilt}>
        <group rotation-z={THREE.MathUtils.degToRad(def.spin)} scale={R}>
          <mesh ref={left} geometry={geos.left}>
            <Half geometry={geos.left} />
          </mesh>
          <mesh ref={right} geometry={geos.right}>
            <Half geometry={geos.right} />
          </mesh>
          {/* Invisible hit area so hover doesn't flicker over the gap between the halves */}
          <mesh
            rotation-x={Math.PI / 2}
            onPointerOver={start}
            onPointerOut={stop}
            onClick={tap}
          >
            <cylinderGeometry args={[1.08, 1.08, THICKNESS * 1.6, 40]} />
            <meshBasicMaterial colorWrite={false} depthWrite={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Coins({ reduced }: { reduced: boolean }) {
  const geos = useHalfGeometries();
  const width = useThree((s) => s.size.width);
  const defs = width < 768 ? MOBILE : DESKTOP;
  return (
    <>
      {defs.map((def, i) => (
        <Coin key={`${width < 768 ? "m" : "d"}${i}`} def={def} geos={geos} reduced={reduced} />
      ))}
    </>
  );
}

export default function HeroCoins3D() {
  const webgl = useMemo(hasWebGL, []);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!webgl) return null;

  return (
    <div className="absolute inset-0 animate-[fade-in_600ms_ease-out]" aria-hidden="true">
      <Canvas
        orthographic
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1000], near: 1, far: 4000, zoom: 1 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Coins reduced={reduced} />
      </Canvas>
    </div>
  );
}

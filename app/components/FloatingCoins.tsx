"use client";

import { useEffect, useRef, useState } from "react";

const GREEN = "#39FF14";
const EDGE = "#1E9E0A";
const STROKE = "#000";

type CoinDef = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  tiltZ: number; // 2D rotation
  tiltX: number; // 3D flattening ratio 0..1 (1 = face-on, 0.2 = edge-heavy)
  dur: number;
  delay: number;
};

const coins: CoinDef[] = [
  { top: "4%", left: "-6%", size: 220, tiltZ: -14, tiltX: 0.95, dur: 7.5, delay: 0 },
  { top: "18%", right: "-7%", size: 240, tiltZ: 18, tiltX: 0.5, dur: 8.5, delay: 0.6 },
  { bottom: "8%", left: "4%", size: 110, tiltZ: 10, tiltX: 0.9, dur: 6, delay: 1.2 },
  { bottom: "16%", right: "6%", size: 130, tiltZ: -22, tiltX: 0.35, dur: 7, delay: 0.3 },
  { top: "58%", left: "-3%", size: 90, tiltZ: 28, tiltX: 0.7, dur: 5.5, delay: 1.8 },
  { top: "70%", right: "-2%", size: 100, tiltZ: -8, tiltX: 0.55, dur: 6.5, delay: 0.9 },
  { top: "34%", left: "28%", size: 60, tiltZ: 40, tiltX: 0.3, dur: 5, delay: 1.5 },
];

export default function FloatingCoins() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [reduce, setReduce] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mm.matches);
    update();
    mm.addEventListener("change", update);
    return () => mm.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const host = hostRef.current;
    if (!host) return;
    let raf = 0;
    let last = { x: 0, y: 0, active: false };

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      last = { x, y, active: inside };
      if (!raf)
        raf = window.requestAnimationFrame(() => {
          setMouse(last);
          raf = 0;
        });
    };

    const onLeave = () => {
      last = { x: 0, y: 0, active: false };
      if (!raf)
        raf = window.requestAnimationFrame(() => {
          setMouse(last);
          raf = 0;
        });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const maxSize = Math.max(...coins.map((c) => c.size));

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "900px" }}
    >
      {coins.map((c, i) => (
        <Coin
          key={i}
          def={c}
          mouse={mouse}
          reduce={reduce}
          maxSize={maxSize}
        />
      ))}
    </div>
  );
}

function Coin({
  def,
  mouse,
  reduce,
  maxSize,
}: {
  def: CoinDef;
  mouse: { x: number; y: number; active: boolean };
  reduce: boolean;
  maxSize: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);

  // bigger coins move less
  const depth = 1 - def.size / (maxSize * 1.1); // 0 (big) .. ~0.9 (small)
  const strength = (mouse.active ? 28 : 0) * depth;
  const dx = -mouse.x * strength;
  const dy = -mouse.y * strength;
  const extraRot = -mouse.x * 10 * depth;
  const extraTiltY = mouse.x * 20 * depth; // rotateY feel
  const extraTiltX = -mouse.y * 14 * depth;

  const activeSpin = hovered || tapped;
  const split = hovered || tapped;

  const idleAnim = reduce
    ? undefined
    : `coin-bob ${def.dur}s ease-in-out ${def.delay}s infinite`;

  const faceScaleY = Math.max(0.2, def.tiltX);
  const bandHeight = Math.round(def.size * (1 - faceScaleY) * 0.55 + def.size * 0.08);

  const handleTap = () => {
    setTapped(true);
    window.setTimeout(() => setTapped(false), 650);
  };

  return (
    <div
      className="absolute"
      style={{
        top: def.top,
        bottom: def.bottom,
        left: def.left,
        right: def.right,
        width: def.size,
        height: def.size,
      }}
    >
      {/* idle animation wrapper */}
      <div
        style={{
          width: "100%",
          height: "100%",
          animation: idleAnim,
          ["--tilt" as string]: `${def.tiltZ}deg`,
        }}
      >
        {/* parallax wrapper */}
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: reduce
              ? undefined
              : `translate3d(${dx}px, ${dy}px, 0) rotate(${extraRot}deg)`,
            transition: "transform 350ms ease-out",
          }}
        >
          {/* 3D wrapper for Y-axis spin and tilt */}
          <div
            onMouseEnter={() => !reduce && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={reduce ? undefined : handleTap}
            className="pointer-events-auto"
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: reduce
                ? undefined
                : `rotateX(${extraTiltX}deg) rotateY(${extraTiltY}deg)`,
              transition: "transform 350ms ease-out",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                transformOrigin: "center",
                transformStyle: "preserve-3d",
                animation: activeSpin && !reduce ? "coin-spin 0.9s linear infinite" : undefined,
              }}
            >
              <CoinArt
                size={def.size}
                faceScaleY={faceScaleY}
                bandHeight={bandHeight}
                tiltZ={def.tiltZ}
                split={split}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes coin-bob {
          0%, 100% { transform: translate3d(0,0,0) rotate(var(--tilt, 0deg)); }
          50% { transform: translate3d(0,-5px,0) rotate(calc(var(--tilt, 0deg) + 3deg)); }
        }
        @keyframes coin-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="coin-bob"], [style*="coin-spin"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function CoinArt({
  size,
  faceScaleY,
  bandHeight,
  tiltZ,
  split,
}: {
  size: number;
  faceScaleY: number;
  bandHeight: number;
  tiltZ: number;
  split: boolean;
}) {
  const topCy = 50 - bandHeight / 2;
  const bottomCy = 50 + bandHeight / 2;
  const ry = 46 * faceScaleY;
  const sx = 46 / 30;
  const sy = ry / 30;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{
        transform: `rotate(${tiltZ}deg)`,
        overflow: "visible",
      }}
    >
      {/* Back face (edge color) */}
      <ellipse
        cx="50"
        cy={bottomCy}
        rx="46"
        ry={ry}
        fill={EDGE}
        stroke={STROKE}
        strokeWidth={3.5}
      />
      {/* Side band outlines connecting back and front rims */}
      <line x1="4" y1={topCy} x2="4" y2={bottomCy} stroke={STROKE} strokeWidth={3.5} />
      <line x1="96" y1={topCy} x2="96" y2={bottomCy} stroke={STROKE} strokeWidth={3.5} />
      {/* Side band fill */}
      <path
        d={`M 4 ${topCy} L 4 ${bottomCy} L 96 ${bottomCy} L 96 ${topCy} Z`}
        fill={EDGE}
      />

      {/* Front face with split lightning-S */}
      <g transform={`translate(50 ${topCy}) scale(${sx} ${sy}) translate(-32 -32)`}>
        <CoinFace split={split} />
      </g>
    </svg>
  );
}

function CoinFace({ split }: { split: boolean }) {
  const shift = split ? 4 : 1.5;

  const S = {
    top: [32, 2],
    p1: [44, 22],
    p2: [24, 34],
    p3: [40, 42],
    bottom: [32, 62],
  };
  const leftHalfD = `M ${S.top[0]} ${S.top[1]} L ${S.p1[0]} ${S.p1[1]} L ${S.p2[0]} ${S.p2[1]} L ${S.p3[0]} ${S.p3[1]} L ${S.bottom[0]} ${S.bottom[1]} A 30 30 0 0 0 ${S.top[0]} ${S.top[1]} Z`;
  const rightHalfD = `M ${S.top[0]} ${S.top[1]} L ${S.p1[0]} ${S.p1[1]} L ${S.p2[0]} ${S.p2[1]} L ${S.p3[0]} ${S.p3[1]} L ${S.bottom[0]} ${S.bottom[1]} A 30 30 0 0 1 ${S.top[0]} ${S.top[1]} Z`;
  const leftRim = `M 32 6 A 26 26 0 0 0 32 58`;
  const rightRim = `M 32 6 A 26 26 0 0 1 32 58`;

  return (
    <>
      <g transform={`translate(${-shift} ${-shift})`}>
        <path
          d={leftHalfD}
          fill={GREEN}
          stroke={STROKE}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <path d={leftRim} fill="none" stroke={EDGE} strokeWidth={1.5} strokeLinecap="round" />
      </g>
      <g transform={`translate(${shift} ${shift})`}>
        <path
          d={rightHalfD}
          fill={GREEN}
          stroke={STROKE}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <path d={rightRim} fill="none" stroke={EDGE} strokeWidth={1.5} strokeLinecap="round" />
      </g>
    </>
  );
}

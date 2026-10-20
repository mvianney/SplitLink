import type { ReactNode } from "react";
import { halfPath } from "@/lib/splitMark";

type Pose = "worried" | "excited";

type Props = {
  pose: Pose;
  className?: string;
};

// Flat, thick-outline cartoon, framed in a big circle (the way gumroad.com fits its
// characters into the page). Coin head, white tee, green hands. Upper body only:
// the circle crops the bottom.

const INK = "#000";
const SW = 4;
const GREEN = "#39FF14";
const WHITE = "#fff";
const RED = "#FF4D4D";
const SCREEN = "#141414";

const CX = 200; // scene circle
const CY = 212;
const CR = 178;

const MARK_L = halfPath("left", 20, 1);
const MARK_R = halfPath("right", 20, 1);

export default function Mascot({ pose, className = "" }: Props) {
  const worried = pose === "worried";
  const clipId = `sl-mascot-clip-${pose}`;

  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={
        worried
          ? "SplitLink mascot, worried, reading “I'll send it later…” on their phone"
          : "SplitLink mascot celebrating a payout on their phone"
      }
    >
      <defs>
        {/* Bottom half is cropped by the circle; the top can spill over it. */}
        <clipPath id={clipId}>
          <circle cx={CX} cy={CY} r={CR - 2} />
          <rect x="0" y="0" width="400" height={CY} />
        </clipPath>
      </defs>

      <circle cx={CX} cy={CY} r={CR} fill={worried ? RED : GREEN} />

      {worried ? <Worried clipId={clipId} /> : <Excited clipId={clipId} />}

      <style>{STYLES}</style>
    </svg>
  );
}

/* ---------------------------------------------------------------- parts */

/** Outlined tube for arms: black under-stroke, coloured over-stroke. */
function Arm({ d, hand }: { d: string; hand?: [number, number] }) {
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={d} stroke={INK} strokeWidth={22} />
      <path d={d} stroke={WHITE} strokeWidth={14} />
      {hand && <Hand x={hand[0]} y={hand[1]} />}
    </g>
  );
}

function Hand({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={11} fill={GREEN} stroke={INK} strokeWidth={SW} />;
}

function Torso() {
  return (
    <g stroke={INK} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M146 430 L146 304 Q146 268 182 266 L218 266 Q254 268 254 304 L254 430 Z"
        fill={WHITE}
      />
      <path d="M182 268 Q200 288 218 268" fill="none" />
      {/* tiny split-coin badge on the chest */}
      <g transform="translate(214 312)">
        <path d={MARK_L} fill={GREEN} strokeWidth={2} />
        <path d={MARK_R} fill={GREEN} strokeWidth={2} />
      </g>
    </g>
  );
}

/** The head is a coin: a back copy offset down-right shows its thickness. */
function CoinHead({ children }: { children: ReactNode }) {
  return (
    <g>
      <circle cx={207} cy={197} r={72} fill={GREEN} stroke={INK} strokeWidth={SW} />
      <circle cx={200} cy={188} r={72} fill={GREEN} stroke={INK} strokeWidth={SW} />
      {children}
    </g>
  );
}

/** Speech bubble with a lightning-bolt tail, like a comic shout. */
function Bubble({
  x,
  y,
  w,
  h,
  lines,
  tail,
  size = 22,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  tail: string;
  size?: number;
}) {
  const lh = size * 1.1;
  const top = y + h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  return (
    <g>
      <path d={tail} fill={WHITE} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <rect x={x} y={y} width={w} height={h} rx={16} fill={WHITE} stroke={INK} strokeWidth={SW} />
      <text
        x={x + w / 2}
        textAnchor="middle"
        fontSize={size}
        fontWeight={900}
        letterSpacing="0.04em"
        fill={INK}
        style={{ fontFamily: "inherit" }}
      >
        {lines.map((l, i) => (
          <tspan key={l} x={x + w / 2} y={top + i * lh}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect x={-30} y={-44} width={60} height={88} rx={10} fill={INK} stroke={INK} strokeWidth={SW} />
      <rect x={-24} y={-36} width={48} height={70} rx={5} fill={SCREEN} />
      {children}
    </g>
  );
}

function MiniCoin({ x, y, r, className }: { x: number; y: number; r: number; className: string }) {
  const s = r / 9;
  return (
    <g className={className}>
      <g transform={`translate(${x - 10 * s} ${y - 10 * s}) scale(${s})`}>
        <path d={MARK_L} fill={GREEN} stroke={INK} strokeWidth={2.4 / s} strokeLinejoin="round" />
        <path d={MARK_R} fill={GREEN} stroke={INK} strokeWidth={2.4 / s} strokeLinejoin="round" />
      </g>
    </g>
  );
}

/* ---------------------------------------------------------------- poses */

function Worried({ clipId }: { clipId: string }) {
  return (
    <>
      <g clipPath={`url(#${clipId})`}>
        <Torso />

        {/* Left arm: hangs, then scratches the head (two drawings swapped) */}
        <g className="slm-arm-rest">
          <Arm d="M158 292 Q134 340 150 392" hand={[150, 392]} />
        </g>
        <g className="slm-arm-scratch">
          <g className="slm-scratch-wiggle">
            <Arm d="M158 292 Q96 262 122 184" hand={[122, 184]} />
          </g>
        </g>

        <CoinHead>
          <g className="slm-glance">
            {/* brows raised in the middle */}
            <g stroke={INK} strokeWidth={SW} strokeLinecap="round" fill="none">
              <path d="M184 166 L203 158" />
              <path d="M241 166 L222 158" />
              {/* wobbly mouth */}
              <path d="M196 224 q7 -7 14 0 t14 0" />
            </g>
            <circle cx={198} cy={186} r={5.5} fill={INK} />
            <circle cx={228} cy={186} r={5.5} fill={INK} />
          </g>
          {/* sweat drop */}
          <path
            className="slm-sweat"
            d="M146 140 q-9 13 0 19 q9 -6 0 -19 z"
            fill={WHITE}
            stroke={INK}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </CoinHead>

        {/* Right arm holds the phone out to read it */}
        <Arm d="M242 292 Q272 346 276 298" />
      </g>

      <g transform="translate(298 262) rotate(9)">
        <g className="slm-buzz">
          <Phone>
            <text
              y={2}
              textAnchor="middle"
              fontSize={17}
              fontWeight={900}
              fill={RED}
              style={{ fontFamily: "inherit" }}
            >
              $0.00
            </text>
            <text
              y={20}
              textAnchor="middle"
              fontSize={8}
              fontWeight={700}
              fill="#9a9a9a"
              style={{ fontFamily: "inherit" }}
            >
              pending…
            </text>
          </Phone>
        </g>
      </g>
      {/* hand gripping the phone edge */}
      <Hand x={276} y={298} />

      <g className="slm-bob">
        <Bubble
          x={196}
          y={30}
          w={196}
          h={74}
          size={20}
          lines={["I'LL SEND IT", "LATER…"]}
          tail="M318 98 L304 150 L318 148 L300 214 L334 140 L320 142 L336 98 Z"
        />
      </g>
    </>
  );
}

function Excited({ clipId }: { clipId: string }) {
  return (
    <>
      <MiniCoin x={340} y={92} r={17} className="slm-coin slm-coin-1" />
      <MiniCoin x={364} y={166} r={12} className="slm-coin slm-coin-2" />
      <MiniCoin x={290} y={40} r={11} className="slm-coin slm-coin-3" />

      <g clipPath={`url(#${clipId})`}>
        <g className="slm-bounce">
          <Torso />

          {/* Right arm: fist pump */}
          <g className="slm-pump">
            <Arm d="M244 294 Q326 284 306 160" hand={[306, 160]} />
          </g>

          <CoinHead>
            <g stroke={INK} strokeWidth={SW} strokeLinecap="round" fill="none">
              {/* happy closed eyes */}
              <path d="M172 186 q10 -12 20 0" />
              <path d="M210 186 q10 -12 20 0" />
            </g>
            {/* big open smile */}
            <path
              d="M174 208 Q201 250 228 208 Z"
              fill={INK}
              stroke={INK}
              strokeWidth={SW}
              strokeLinejoin="round"
            />
            <path d="M190 228 Q201 238 212 228 Q206 222 201 224 Q196 222 190 228 Z" fill={RED} />
          </CoinHead>

          {/* Left arm holds the phone up */}
          <Arm d="M158 292 Q110 336 110 290" />
        </g>
      </g>

      <g transform="translate(96 248) rotate(-10)">
        <g className="slm-bounce">
          <Phone>
            <circle cx={0} cy={-14} r={10} fill={GREEN} />
            <path
              d="M-5 -14 l3.5 3.5 l6.5 -7"
              stroke={INK}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              y={14}
              textAnchor="middle"
              fontSize={15}
              fontWeight={900}
              fill={GREEN}
              style={{ fontFamily: "inherit" }}
            >
              +$30
            </text>
            <text
              y={27}
              textAnchor="middle"
              fontSize={7.5}
              fontWeight={700}
              fill="#9a9a9a"
              style={{ fontFamily: "inherit" }}
            >
              claimed
            </text>
          </Phone>
        </g>
      </g>
      <g className="slm-bounce">
        <Hand x={110} y={290} />
      </g>

      <g className="slm-pulse">
        <Bubble
          x={14}
          y={30}
          w={150}
          h={66}
          size={30}
          lines={["PAID!"]}
          tail="M84 90 L74 132 L86 130 L74 186 L104 122 L92 124 L102 90 Z"
        />
      </g>
    </>
  );
}

/* ---------------------------------------------------------------- motion */

const STYLES = `
.slm-arm-rest { animation: slm-arm-rest 4.8s steps(1, end) infinite; }
.slm-arm-scratch { opacity: 0; animation: slm-arm-scratch 4.8s steps(1, end) infinite; }
@keyframes slm-arm-rest { 0%, 46% { opacity: 1 } 48%, 84% { opacity: 0 } 86%, 100% { opacity: 1 } }
@keyframes slm-arm-scratch { 0%, 46% { opacity: 0 } 48%, 84% { opacity: 1 } 86%, 100% { opacity: 0 } }
.slm-scratch-wiggle { animation: slm-wiggle 0.32s ease-in-out infinite; }
@keyframes slm-wiggle { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(3px, -3px) } }

.slm-glance { animation: slm-glance 4.8s ease-in-out infinite; }
@keyframes slm-glance {
  0%, 40%, 100% { transform: translate(0, 0) }
  50%, 82% { transform: translate(-16px, -4px) }
}
.slm-sweat { animation: slm-sweat 2.4s ease-in-out infinite; }
@keyframes slm-sweat { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(6px) } }

.slm-buzz { transform-box: fill-box; transform-origin: center; animation: slm-buzz 3.2s ease-in-out infinite; }
@keyframes slm-buzz {
  0%, 78%, 100% { transform: rotate(0deg) }
  82% { transform: rotate(-5deg) } 86% { transform: rotate(5deg) }
  90% { transform: rotate(-4deg) } 94% { transform: rotate(3deg) }
}
.slm-bob { animation: slm-bob 2.6s ease-in-out infinite; }
@keyframes slm-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-5px) } }

.slm-bounce { animation: slm-bounce 0.9s ease-in-out infinite; }
@keyframes slm-bounce { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
.slm-pump { transform-origin: 244px 294px; animation: slm-pump 0.9s ease-in-out infinite; }
@keyframes slm-pump { 0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-14deg) } }
.slm-pulse { transform-box: fill-box; transform-origin: center; animation: slm-pulse 0.9s ease-in-out infinite; }
@keyframes slm-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.06) } }
.slm-coin { transform-box: fill-box; transform-origin: center; animation: slm-coin 2.4s ease-in-out infinite; }
.slm-coin-2 { animation-delay: -0.8s; }
.slm-coin-3 { animation-delay: -1.6s; }
@keyframes slm-coin { 0%, 100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-10px) rotate(14deg) } }
`;

type Pose = "worried" | "excited";

type Props = {
  pose: Pose;
  className?: string;
};

const STROKE = "#000";
const SW = 3.75;
const GREEN = "#39FF14";
const EDGE = "#1E9E0A";
const SHADOW = "#0f6b05";
const WHITE = "#ffffff";
const CARD = "#1A1A1A";

export default function Mascot({ pose, className = "" }: Props) {
  const bodyAnim =
    pose === "worried"
      ? "mascot-shake 2.6s ease-in-out infinite"
      : "mascot-bounce 1.8s ease-in-out infinite";

  return (
    <svg
      viewBox="0 0 420 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={pose === "worried" ? "Worried SplitLink mascot" : "Excited SplitLink mascot"}
    >
      {/* Big backdrop circle */}
      <circle cx="210" cy="240" r="200" fill={CARD} />

      {/* Doodles behind */}
      <Doodles pose={pose} />

      {/* Hard offset shadow of the body — down-left */}
      <g transform="translate(-14 10)" opacity="0.9">
        <Body pose={pose} shadow />
      </g>

      {/* Body */}
      <g style={{ transformOrigin: "210px 320px", animation: bodyAnim }}>
        <Body pose={pose} />
      </g>

      <style>{`
        @keyframes mascot-shake {
          0%, 100% { transform: translate(0,0) rotate(-1.5deg); }
          25% { transform: translate(-2px,0) rotate(1.5deg); }
          50% { transform: translate(0,-2px) rotate(-1deg); }
          75% { transform: translate(2px,0) rotate(1deg); }
        }
        @keyframes mascot-bounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes mascot-wave {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          svg [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function Body({ pose, shadow = false }: { pose: Pose; shadow?: boolean }) {
  // Shadow silhouette: everything a solid dark green, same shapes.
  // Otherwise: coloured.
  const fillBody = shadow ? SHADOW : WHITE;
  const fillAccent = shadow ? SHADOW : GREEN;
  const fillHead = shadow ? SHADOW : GREEN;
  const fillShoe = shadow ? SHADOW : GREEN;
  const strokeC = shadow ? SHADOW : STROKE;

  return (
    <g
      fill={fillBody}
      stroke={strokeC}
      strokeWidth={SW}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* ----- Legs & sneakers ----- */}
      {/* Pants */}
      <path d="M172 318 L172 418 L202 418 L204 318 Z" />
      <path d="M216 318 L218 418 L248 418 L248 318 Z" />
      {/* Outer stripes */}
      <rect x="170" y="325" width="5" height="80" fill={fillAccent} stroke="none" />
      <rect x="245" y="325" width="5" height="80" fill={fillAccent} stroke="none" />
      {/* Ankle cuffs */}
      <rect x="167" y="408" width="38" height="12" fill={fillAccent} />
      <rect x="215" y="408" width="38" height="12" fill={fillAccent} />
      {/* Knee patches */}
      <circle cx="188" cy="365" r="7" fill={fillAccent} stroke={strokeC} strokeWidth={SW * 0.6} />
      <circle cx="232" cy="365" r="7" fill={fillAccent} stroke={strokeC} strokeWidth={SW * 0.6} />

      {/* High-top sneakers */}
      <g>
        {/* Left sneaker */}
        <path
          d="M160 420 Q152 428 154 442 L160 452 L212 452 L212 420 Z"
          fill={fillShoe}
        />
        {/* Right sneaker */}
        <path
          d="M208 420 L208 452 L260 452 L266 442 Q268 428 260 420 Z"
          fill={fillShoe}
        />
        {!shadow && (
          <>
            {/* Laces */}
            <path d="M172 434 L204 434 M174 442 L206 442" stroke={STROKE} strokeWidth={2.5} fill="none" />
            <path d="M216 434 L248 434 M218 442 L250 442" stroke={STROKE} strokeWidth={2.5} fill="none" />
            {/* Sole stripe */}
            <path d="M154 450 L212 450 M208 450 L266 450" stroke={STROKE} strokeWidth={2.5} fill="none" />
          </>
        )}
      </g>

      {/* ----- Torso ----- */}
      {/* Rounded rectangle, broad shoulders, no flare */}
      <path
        d="M158 212
           Q158 198 172 198
           L248 198
           Q262 198 262 212
           L262 316
           Q262 322 256 322
           L164 322
           Q158 322 158 316
           Z"
      />
      {/* Trim: horizontal belt */}
      <rect x="158" y="300" width="104" height="7" fill={fillAccent} stroke="none" />
      {/* Trim: V-chest straps */}
      <path
        d="M186 198 L210 240 L234 198"
        fill="none"
        stroke={fillAccent}
        strokeWidth={5}
      />

      {/* ----- Chest badge (split logo) ----- */}
      {!shadow && <ChestBadge cx={210} cy={275} r={16} />}

      {/* ----- Arms (behind torso) ----- */}
      {pose === "worried" ? <WorriedArms shadow={shadow} /> : <ExcitedArms shadow={shadow} />}

      {/* ----- Neck ----- */}
      <rect x="200" y="178" width="20" height="24" fill={fillBody} />

      {/* ----- Head ----- */}
      <g>
        {/* Shoulder caps (patches on top of torso where arms meet) */}
        <circle cx="165" cy="210" r="12" fill={fillAccent} stroke={strokeC} strokeWidth={SW * 0.8} />
        <circle cx="255" cy="210" r="12" fill={fillAccent} stroke={strokeC} strokeWidth={SW * 0.8} />

        {/* Head coin */}
        <circle cx="210" cy="130" r="60" fill={fillHead} />
        <circle cx="210" cy="130" r="52" fill="none" stroke={strokeC} strokeWidth={2.5} />
        {!shadow && <Face pose={pose} />}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */

function WorriedArms({ shadow }: { shadow: boolean }) {
  const fillBody = shadow ? SHADOW : WHITE;
  const fillAccent = shadow ? SHADOW : GREEN;
  const strokeC = shadow ? SHADOW : STROKE;
  return (
    <g fill={fillBody} stroke={strokeC} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
      {/* Left arm — bent elbow, slight hunch */}
      <g>
        {/* Upper arm shoulder → elbow */}
        <path d="M158 215 L138 266 L156 274 L178 220 Z" />
        {/* Elbow patch */}
        <circle cx="148" cy="266" r="8" fill={fillAccent} stroke={strokeC} strokeWidth={SW * 0.6} />
        {/* Forearm elbow → hand */}
        <path d="M138 266 L140 320 L160 320 L156 274 Z" />
        {/* Mitten hand */}
        <circle cx="150" cy="330" r="18" fill={fillBody} />
        {!shadow && <path d="M138 334 Q150 342 162 334" stroke={STROKE} strokeWidth={2} fill="none" />}
        {/* Tiny broken coin piece */}
        {!shadow && (
          <path
            d="M140 335 L160 335 L164 348 L136 348 Z"
            fill={GREEN}
            stroke={STROKE}
            strokeWidth={2}
          />
        )}
      </g>

      {/* Right arm — bent elbow */}
      <g>
        <path d="M262 215 L282 266 L264 274 L242 220 Z" />
        <circle cx="272" cy="266" r="8" fill={fillAccent} stroke={strokeC} strokeWidth={SW * 0.6} />
        <path d="M282 266 L280 320 L260 320 L264 274 Z" />
        <circle cx="270" cy="330" r="18" fill={fillBody} />
        {!shadow && <path d="M258 334 Q270 342 282 334" stroke={STROKE} strokeWidth={2} fill="none" />}
      </g>
    </g>
  );
}

function ExcitedArms({ shadow }: { shadow: boolean }) {
  const fillBody = shadow ? SHADOW : WHITE;
  const fillAccent = shadow ? SHADOW : GREEN;
  const strokeC = shadow ? SHADOW : STROKE;
  return (
    <g fill={fillBody} stroke={strokeC} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
      {/* Left arm — down, bent at elbow */}
      <g>
        <path d="M158 215 L138 266 L156 274 L178 220 Z" />
        <circle cx="148" cy="266" r="8" fill={fillAccent} stroke={strokeC} strokeWidth={SW * 0.6} />
        <path d="M138 266 L140 324 L160 324 L156 274 Z" />
        <circle cx="150" cy="334" r="18" fill={fillBody} />
        {!shadow && <path d="M138 338 Q150 346 162 338" stroke={STROKE} strokeWidth={2} fill="none" />}
      </g>

      {/* Right arm raised — upper up and out, forearm bent up, holding phone */}
      <g
        style={
          shadow
            ? undefined
            : {
                transformOrigin: "262px 215px",
                animation: "mascot-wave 1.8s ease-in-out infinite",
              }
        }
      >
        {/* Upper arm shoulder → elbow (raised up-right) */}
        <path d="M262 215 L298 180 L312 196 L278 230 Z" />
        <circle cx="305" cy="188" r="8" fill={fillAccent} stroke={strokeC} strokeWidth={SW * 0.6} />
        {/* Forearm elbow → hand (up) */}
        <path d="M298 180 L286 120 L304 112 L314 176 Z" />
        {/* Mitten hand */}
        <circle cx="295" cy="106" r="18" fill={fillBody} />
        {!shadow && <path d="M283 110 Q295 118 307 110" stroke={STROKE} strokeWidth={2} fill="none" />}
        {/* Phone in hand */}
        {!shadow && <MiniPhone cx={295} cy={82} />}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */

function Face({ pose }: { pose: Pose }) {
  if (pose === "worried") {
    return (
      <g stroke="#000" strokeLinecap="round" strokeLinejoin="round" fill="#000">
        {/* Brows up (worried) */}
        <path d="M184 108 L198 100" strokeWidth={4} fill="none" />
        <path d="M236 100 L222 108" strokeWidth={4} fill="none" />
        {/* Eyes */}
        <circle cx="193" cy="124" r="4" />
        <circle cx="227" cy="124" r="4" />
        {/* Wobbly mouth */}
        <path
          d="M190 152 Q198 142 206 152 T222 152 T232 150"
          fill="none"
          strokeWidth={4}
        />
        {/* Sweat drop */}
        <path
          d="M250 118 Q258 130 250 140 Q242 130 250 118 Z"
          fill="#9ad8ff"
          stroke="#000"
          strokeWidth={2.5}
        />
      </g>
    );
  }
  return (
    <g stroke="#000" strokeLinecap="round" strokeLinejoin="round" fill="#000">
      {/* Confident angled brows */}
      <path d="M184 112 L202 118" strokeWidth={4} fill="none" />
      <path d="M218 118 L236 112" strokeWidth={4} fill="none" />
      {/* Eyes */}
      <circle cx="194" cy="128" r="4.5" />
      <circle cx="226" cy="128" r="4.5" />
      {/* Big grin */}
      <path
        d="M188 150 Q210 176 232 150 Q220 158 210 158 Q200 158 188 150 Z"
        fill="#000"
        strokeWidth={3}
      />
      {/* Teeth highlight */}
      <path d="M196 155 Q210 160 224 155" stroke={GREEN} strokeWidth={2} fill="none" />
    </g>
  );
}

function ChestBadge({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  // Mini split-coin logo
  const S = {
    top: [cx, cy - r],
    p1: [cx + r * 0.4, cy - r * 0.35],
    p2: [cx - r * 0.3, cy - r * 0.05],
    p3: [cx + r * 0.25, cy + r * 0.2],
    bottom: [cx, cy + r],
  } as const;
  const leftD = `M ${S.top[0]} ${S.top[1]} L ${S.p1[0]} ${S.p1[1]} L ${S.p2[0]} ${S.p2[1]} L ${S.p3[0]} ${S.p3[1]} L ${S.bottom[0]} ${S.bottom[1]} A ${r} ${r} 0 0 0 ${S.top[0]} ${S.top[1]} Z`;
  const rightD = `M ${S.top[0]} ${S.top[1]} L ${S.p1[0]} ${S.p1[1]} L ${S.p2[0]} ${S.p2[1]} L ${S.p3[0]} ${S.p3[1]} L ${S.bottom[0]} ${S.bottom[1]} A ${r} ${r} 0 0 1 ${S.top[0]} ${S.top[1]} Z`;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 3} fill={WHITE} stroke={STROKE} strokeWidth={2.5} />
      <path d={leftD} fill={GREEN} stroke={STROKE} strokeWidth={1.5} />
      <path d={rightD} fill={GREEN} stroke={STROKE} strokeWidth={1.5} />
    </g>
  );
}

function MiniPhone({ cx, cy }: { cx: number; cy: number }) {
  const w = 26;
  const h = 38;
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={5} fill="#000" stroke={STROKE} strokeWidth={2.5} />
      <rect x={x + 2} y={y + 4} width={w - 4} height={h - 8} rx={3} fill="#111" />
      <circle cx={cx} cy={cy} r={5} fill={GREEN} stroke={STROKE} strokeWidth={1.2} />
      <path
        d={`M${cx + 1} ${cy - 3} L${cx - 2} ${cy - 0.5} L${cx + 1} ${cy - 0.5} L${cx - 1} ${cy + 3} L${cx + 2} ${cy + 0.5} L${cx - 1} ${cy + 0.5} Z`}
        fill="#000"
      />
    </g>
  );
}

/* ------------------------------------------------------------------ */

function Doodles({ pose }: { pose: Pose }) {
  const items =
    pose === "excited"
      ? [
          { x: 90, y: 110, kind: "spark" },
          { x: 340, y: 90, kind: "spark" },
          { x: 70, y: 230, kind: "coin" },
          { x: 350, y: 240, kind: "spark" },
          { x: 100, y: 310, kind: "diamond" },
          { x: 320, y: 320, kind: "coin" },
          { x: 50, y: 170, kind: "diamond" },
          { x: 360, y: 170, kind: "spark" },
        ]
      : [
          { x: 330, y: 130, kind: "spark" },
          { x: 90, y: 190, kind: "diamond" },
          { x: 340, y: 260, kind: "coin" },
          { x: 70, y: 310, kind: "spark" },
        ];
  return (
    <g>
      {items.map((d, i) => (
        <Doodle key={i} {...d} />
      ))}
    </g>
  );
}

function Doodle({ x, y, kind }: { x: number; y: number; kind: string }) {
  if (kind === "spark") {
    return (
      <g transform={`translate(${x} ${y})`} stroke="#000" strokeWidth={2.5} strokeLinecap="round" fill="none">
        <path d="M0 -8 L0 8 M-8 0 L8 0" />
      </g>
    );
  }
  if (kind === "diamond") {
    return (
      <g transform={`translate(${x} ${y}) rotate(45)`} stroke="#000" strokeWidth={2} fill={GREEN}>
        <rect x="-5" y="-5" width="10" height="10" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="10" ry="4" fill={GREEN} stroke="#000" strokeWidth={2} />
      <path d="M-10 0 L-10 3 Q0 7 10 3 L10 0" fill={EDGE} stroke="#000" strokeWidth={2} />
    </g>
  );
}

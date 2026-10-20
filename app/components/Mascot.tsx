type Pose = "worried" | "excited";

type Props = {
  pose: Pose;
  className?: string;
};

const STROKE = "#000";
const SHADOW = "#0f6b05";
const GREEN = "#39FF14";
const WHITE = "#ffffff";
const CARD = "#1a1a1a";

export default function Mascot({ pose, className = "" }: Props) {
  const bodyAnim =
    pose === "worried"
      ? "mascot-shake 2.6s ease-in-out infinite"
      : "mascot-bounce 1.8s ease-in-out infinite";

  return (
    <svg
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={pose === "worried" ? "Worried SplitLink mascot" : "Excited SplitLink mascot"}
    >
      {/* Backdrop circle */}
      <circle cx="200" cy="220" r="170" fill={CARD} />

      {/* Doodles */}
      <Doodles pose={pose} />

      {/* Offset shadow of body */}
      <g transform="translate(14 10)" opacity="0.85">
        <Body pose={pose} fill={SHADOW} stroke={SHADOW} shadow />
      </g>

      {/* Body */}
      <g style={{ transformOrigin: "200px 300px", animation: bodyAnim }}>
        <Body pose={pose} fill={WHITE} stroke={STROKE} />
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

function Body({
  pose,
  fill,
  stroke,
  shadow = false,
}: {
  pose: Pose;
  fill: string;
  stroke: string;
  shadow?: boolean;
}) {
  const sw = 5;
  const accentFill = shadow ? fill : GREEN;
  const skinFill = shadow ? fill : fill; // jumpsuit
  const headColor = shadow ? fill : GREEN;

  return (
    <g fill={skinFill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round">
      {/* Legs */}
      <g>
        {/* Left leg */}
        <path d="M172 320 L166 410 L188 410 L194 320 Z" />
        {/* Right leg */}
        <path d="M206 320 L212 410 L234 410 L228 320 Z" />
        {/* Knee patches */}
        <circle cx="180" cy="360" r="7" fill={accentFill} stroke={stroke} strokeWidth={sw * 0.6} />
        <circle cx="220" cy="360" r="7" fill={accentFill} stroke={stroke} strokeWidth={sw * 0.6} />
      </g>

      {/* Sneakers */}
      <g>
        <path
          d="M158 408 Q152 418 158 428 L198 428 L198 408 Z"
          fill={shadow ? fill : GREEN}
        />
        <path
          d="M202 408 L202 428 L242 428 Q248 418 242 408 Z"
          fill={shadow ? fill : GREEN}
        />
        {/* Laces */}
        <path d="M166 416 L190 416 M170 422 L194 422" stroke={stroke} strokeWidth={2.5} fill="none" />
        <path d="M210 416 L234 416 M214 422 L238 422" stroke={stroke} strokeWidth={2.5} fill="none" />
      </g>

      {/* Torso / jumpsuit */}
      <path d="M170 215 L155 320 L245 320 L230 215 Z" />
      {/* Stripe trim */}
      <path
        d="M170 240 L230 240"
        stroke={shadow ? fill : GREEN}
        strokeWidth={6}
        fill="none"
      />
      {/* Suspender hints */}
      <path d="M186 215 L192 240" stroke={stroke} strokeWidth={3} fill="none" />
      <path d="M214 215 L208 240" stroke={stroke} strokeWidth={3} fill="none" />

      {/* Arms */}
      {pose === "worried" ? (
        <>
          {/* Left arm (slightly hunched, down) */}
          <path d="M170 225 L146 288 L158 300 L182 240 Z" />
          <circle cx="162" cy="238" r="8" fill={accentFill} stroke={stroke} strokeWidth={sw * 0.6} />
          {/* Hand with tiny broken coin piece */}
          <circle cx="152" cy="294" r="10" fill={shadow ? fill : WHITE} />
          {!shadow && (
            <path
              d="M144 300 L158 300 L160 310 L146 310 Z"
              fill={GREEN}
              stroke={stroke}
              strokeWidth={2}
            />
          )}
          {/* Right arm (down, hand on hip-ish) */}
          <path d="M230 225 L254 280 L244 292 L220 240 Z" />
          <circle cx="238" cy="238" r="8" fill={accentFill} stroke={stroke} strokeWidth={sw * 0.6} />
          <circle cx="248" cy="286" r="10" fill={shadow ? fill : WHITE} />
        </>
      ) : (
        <>
          {/* Left arm (down) */}
          <path d="M170 225 L150 290 L162 300 L182 240 Z" />
          <circle cx="162" cy="238" r="8" fill={accentFill} stroke={stroke} strokeWidth={sw * 0.6} />
          <circle cx="156" cy="294" r="10" fill={shadow ? fill : WHITE} />
          {/* Right arm raised holding phone - animated wave */}
          <g
            style={
              shadow
                ? undefined
                : { transformOrigin: "230px 225px", animation: "mascot-wave 1.6s ease-in-out infinite" }
            }
          >
            <path d="M230 225 L256 170 L270 176 L242 232 Z" />
            <circle cx="246" cy="200" r="8" fill={accentFill} stroke={stroke} strokeWidth={sw * 0.6} />
            <circle cx="262" cy="172" r="11" fill={shadow ? fill : WHITE} />
            {!shadow && <MiniPhone cx={266} cy={154} />}
          </g>
        </>
      )}

      {/* Neck */}
      <rect x="193" y="195" width="14" height="24" />

      {/* Head: SplitLink coin */}
      <g>
        <circle cx="200" cy="160" r="52" fill={headColor} />
        {/* Rim */}
        <circle cx="200" cy="160" r="46" fill="none" stroke={stroke} strokeWidth={2.5} />
        {!shadow && <Face pose={pose} />}
      </g>
    </g>
  );
}

function Face({ pose }: { pose: Pose }) {
  if (pose === "worried") {
    return (
      <g stroke="#000" strokeLinecap="round" strokeLinejoin="round" fill="#000">
        {/* Brows up */}
        <path d="M178 142 L190 136" strokeWidth={4} fill="none" />
        <path d="M222 136 L210 142" strokeWidth={4} fill="none" />
        {/* Eyes */}
        <circle cx="186" cy="154" r="3.5" />
        <circle cx="214" cy="154" r="3.5" />
        {/* Wobbly mouth */}
        <path
          d="M184 180 Q190 172 196 180 T208 180 T220 180"
          fill="none"
          strokeWidth={3.5}
        />
        {/* Sweat drop */}
        <path d="M236 150 Q242 160 236 168 Q230 160 236 150 Z" fill="#9ad8ff" stroke="#000" strokeWidth={2} />
      </g>
    );
  }
  return (
    <g stroke="#000" strokeLinecap="round" strokeLinejoin="round" fill="#000">
      {/* Brows */}
      <path d="M178 142 L192 144" strokeWidth={4} fill="none" />
      <path d="M208 144 L222 142" strokeWidth={4} fill="none" />
      {/* Eyes */}
      <circle cx="186" cy="154" r="3.5" />
      <circle cx="214" cy="154" r="3.5" />
      {/* Big grin */}
      <path
        d="M180 174 Q200 196 220 174 Z"
        fill="#000"
        strokeWidth={3}
      />
      <path d="M186 180 Q200 184 214 180" stroke="#39FF14" strokeWidth={2} fill="none" />
    </g>
  );
}

function MiniPhone({ cx, cy }: { cx: number; cy: number }) {
  const w = 22;
  const h = 32;
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="#000" stroke="#000" strokeWidth={2} />
      <rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} rx={3} fill="#111" />
      {/* Mini logo */}
      <circle cx={cx} cy={cy} r={5} fill={GREEN} stroke="#000" strokeWidth={1} />
      <path d={`M${cx + 1} ${cy - 3} L${cx - 2} ${cy} L${cx + 1} ${cy} L${cx - 1} ${cy + 3} L${cx + 2} ${cy} L${cx - 1} ${cy} Z`} fill="#000" />
    </g>
  );
}

function Doodles({ pose }: { pose: Pose }) {
  const items =
    pose === "excited"
      ? [
          { x: 90, y: 110, kind: "spark" },
          { x: 320, y: 90, kind: "spark" },
          { x: 70, y: 220, kind: "coin" },
          { x: 330, y: 240, kind: "spark" },
          { x: 100, y: 300, kind: "diamond" },
          { x: 310, y: 320, kind: "coin" },
          { x: 50, y: 160, kind: "diamond" },
        ]
      : [
          { x: 320, y: 130, kind: "spark" },
          { x: 90, y: 180, kind: "diamond" },
          { x: 330, y: 260, kind: "coin" },
          { x: 70, y: 300, kind: "spark" },
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
      <g transform={`translate(${x} ${y}) rotate(45)`} stroke="#000" strokeWidth={2} fill="#39FF14">
        <rect x="-5" y="-5" width="10" height="10" />
      </g>
    );
  }
  // coin
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="10" ry="4" fill="#39FF14" stroke="#000" strokeWidth={2} />
      <path d="M-10 0 L-10 3 Q0 7 10 3 L10 0" fill="#0f6b05" stroke="#000" strokeWidth={2} />
    </g>
  );
}

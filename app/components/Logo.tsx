type Props = {
  size?: number;
  split?: boolean;
  className?: string;
  animate?: boolean;
};

const GREEN = "#39FF14";
const EDGE = "#1E9E0A";

// Lightning-S cut points — shared by both halves.
const S = {
  top: [32, 2] as const,
  p1: [44, 22] as const,
  p2: [24, 34] as const,
  p3: [40, 42] as const,
  bottom: [32, 62] as const,
};

const leftHalfD = `
  M ${S.top[0]} ${S.top[1]}
  L ${S.p1[0]} ${S.p1[1]}
  L ${S.p2[0]} ${S.p2[1]}
  L ${S.p3[0]} ${S.p3[1]}
  L ${S.bottom[0]} ${S.bottom[1]}
  A 30 30 0 0 0 ${S.top[0]} ${S.top[1]}
  Z
`;

const rightHalfD = `
  M ${S.top[0]} ${S.top[1]}
  L ${S.p1[0]} ${S.p1[1]}
  L ${S.p2[0]} ${S.p2[1]}
  L ${S.p3[0]} ${S.p3[1]}
  L ${S.bottom[0]} ${S.bottom[1]}
  A 30 30 0 0 1 ${S.top[0]} ${S.top[1]}
  Z
`;

const leftRimD = `M 32 6 A 26 26 0 0 0 32 58`;
const rightRimD = `M 32 6 A 26 26 0 0 1 32 58`;

export default function Logo({
  size = 32,
  split = false,
  className = "",
  animate = true,
}: Props) {
  const shift = split ? 4 : 1.5;
  const trans = animate ? "transition-transform duration-200 ease-out" : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left half */}
      <g
        className={trans}
        style={{ transform: `translate(${-shift}px, ${-shift}px)` }}
      >
        <path
          d={leftHalfD}
          fill={GREEN}
          stroke="#000"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <path
          d={leftRimD}
          fill="none"
          stroke={EDGE}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </g>
      {/* Right half */}
      <g
        className={trans}
        style={{ transform: `translate(${shift}px, ${shift}px)` }}
      >
        <path
          d={rightHalfD}
          fill={GREEN}
          stroke="#000"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <path
          d={rightRimD}
          fill="none"
          stroke={EDGE}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

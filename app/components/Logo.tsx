type Props = {
  size?: number;
  split?: boolean;
  className?: string;
  animate?: boolean;
};

export default function Logo({
  size = 32,
  split = false,
  className = "",
  animate = true,
}: Props) {
  const shift = split ? 4 : 0;
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
      {/* Left half of coin */}
      <g className={trans} style={{ transform: `translateX(${-shift}px)` }}>
        <path
          d="M32 6 A26 26 0 0 0 32 58 L28 46 L22 42 L24 36 L18 32 L24 28 L22 22 L28 18 Z"
          fill="#39FF14"
          stroke="#000"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      {/* Right half of coin */}
      <g className={trans} style={{ transform: `translateX(${shift}px)` }}>
        <path
          d="M32 6 A26 26 0 0 1 32 58 L36 46 L42 42 L40 36 L46 32 L40 28 L42 22 L36 18 Z"
          fill="#39FF14"
          stroke="#000"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      {/* Lightning S cut */}
      <path
        d="M34 14 L24 32 L31 32 L26 50 L40 30 L33 30 Z"
        fill="#000"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

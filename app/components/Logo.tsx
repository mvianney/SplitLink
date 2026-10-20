import { halfPath, SPLIT_DIR } from "@/lib/splitMark";

type Props = {
  size?: number;
  split?: boolean;
  className?: string;
  animate?: boolean;
};

const GREEN = "#39FF14";

// A coin split in two by a lightning bolt (⚡). Same shape as the 3D hero coins.
const LEFT_D = halfPath("left", 64, 2);
const RIGHT_D = halfPath("right", 64, 2);

export default function Logo({
  size = 32,
  split = false,
  className = "",
  animate = true,
}: Props) {
  // Halves sit together at rest; `split` pushes them apart along the bolt.
  const shift = split ? 4 : 0;
  const dx = SPLIT_DIR[0] * shift;
  const dy = -SPLIT_DIR[1] * shift; // SVG y points down
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
      <path
        d={LEFT_D}
        fill={GREEN}
        className={trans}
        style={{ transform: `translate(${-dx}px, ${-dy}px)` }}
      />
      <path
        d={RIGHT_D}
        fill={GREEN}
        className={trans}
        style={{ transform: `translate(${dx}px, ${dy}px)` }}
      />
    </svg>
  );
}

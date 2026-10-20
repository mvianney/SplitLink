import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  tilt?: number;
};

export default function Chip({ children, className = "", tilt = 0 }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1.5 text-xs font-semibold text-black ${className}`}
      style={{
        boxShadow: "4px 4px 0 0 #000",
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {children}
    </span>
  );
}

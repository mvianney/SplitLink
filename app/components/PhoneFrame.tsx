import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tilt?: number;
  className?: string;
  width?: number;
};

export default function PhoneFrame({
  children,
  tilt = 0,
  className = "",
  width = 280,
}: Props) {
  const height = Math.round(width * 2.05);
  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {/* Hard neon offset shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--color-accent)]"
        style={{ transform: "translate(10px, 10px)", borderRadius: 36 }}
      />
      {/* Phone body */}
      <div
        className="relative h-full w-full overflow-hidden border-[4px] border-black bg-black"
        style={{ borderRadius: 36 }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-1 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-black" />
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-2 text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          </span>
        </div>
        {/* Screen content */}
        <div className="flex h-[calc(100%-28px)] flex-col overflow-hidden px-4 pb-4 pt-3 text-white">
          {children}
        </div>
      </div>
    </div>
  );
}

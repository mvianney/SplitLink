import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Highlight({ children, className = "" }: Props) {
  return (
    <span
      className={`relative inline-block bg-[var(--color-accent)] px-[0.2em] text-black ${className}`}
      style={{ boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}
    >
      {children}
    </span>
  );
}

"use client";

import Link from "next/link";
import { useState, type ReactNode, type MouseEvent } from "react";
import { halfPath } from "@/lib/splitMark";

type Variant = "primary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
};

type AsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type AsButton = CommonProps & {
  href?: undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
};

type Props = AsLink | AsButton;

const base =
  "group relative inline-flex items-center gap-2.5 px-5 py-3 text-[15px] font-medium tracking-tight select-none " +
  "transition-transform duration-150 ease-out will-change-transform " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-black shadow-[4px_4px_0_0_#fff] " +
    "hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_#fff] " +
    "active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_#fff]",
  ghost:
    "bg-transparent text-white border border-white/60 shadow-[4px_4px_0_0_#39FF14] " +
    "hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_#39FF14] " +
    "active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_#39FF14]",
};

export default function SplitButton(props: Props) {
  const {
    children,
    variant = "primary",
    className = "",
    icon = true,
  } = props;
  const [pulsing, setPulsing] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPulsing(true);
    window.setTimeout(() => setPulsing(false), 260);
    if ("onClick" in props && props.onClick) props.onClick(e);
  };

  const content = (
    <>
      {icon && (
        <span
          className="relative inline-flex h-5 w-5 items-center justify-center overflow-visible"
          aria-hidden="true"
        >
          <span
            className="absolute inset-0 flex items-center justify-center transition-transform duration-200 group-hover:-translate-x-[3px]"
            style={pulsing ? { animation: "split-pulse 260ms ease-out" } : undefined}
          >
            <HalfCoin side="left" color={variant === "primary" ? "#000" : "#39FF14"} />
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-[3px]"
            style={pulsing ? { animation: "split-pulse-r 260ms ease-out" } : undefined}
          >
            <HalfCoin side="right" color={variant === "primary" ? "#000" : "#39FF14"} />
          </span>
        </span>
      )}
      <span>{children}</span>
    </>
  );

  const cls = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={handleClick}
      className={cls}
    >
      {content}
    </button>
  );
}

// Halves of the ⚡ split coin (same shape as the logo).
const HALF_D = { left: halfPath("left", 20, 1), right: halfPath("right", 20, 1) };

function HalfCoin({ side, color }: { side: "left" | "right"; color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d={HALF_D[side]} fill={color} />
    </svg>
  );
}

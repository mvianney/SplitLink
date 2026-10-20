import { siSolana, siNextdotjs, siSupabase } from "simple-icons";
import type { ReactNode } from "react";

type Tech = {
  name: string;
  brand: string;
  icon: ReactNode;
};

function SiIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

function AnchorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="4" r="2" />
      <line x1="12" y1="6" x2="12" y2="22" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <path d="M3 16 a9 9 0 0 0 18 0" />
      <line x1="3" y1="16" x2="6" y2="14" />
      <line x1="21" y1="16" x2="18" y2="14" />
    </svg>
  );
}

function UsdcIcon() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="currentColor"
      >
        $
      </text>
    </svg>
  );
}

const techs: Tech[] = [
  { name: "Solana", brand: `#${siSolana.hex}`, icon: <SiIcon path={siSolana.path} /> },
  { name: "Anchor (Rust)", brand: "#B07333", icon: <AnchorIcon /> },
  { name: "USDC", brand: "#2775CA", icon: <UsdcIcon /> },
  // Next.js brand hex is #000 — unreadable on dark bg, use white
  { name: "Next.js", brand: "#ffffff", icon: <SiIcon path={siNextdotjs.path} /> },
  { name: "Supabase", brand: `#${siSupabase.hex}`, icon: <SiIcon path={siSupabase.path} /> },
];

export default function BuiltWith() {
  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
      <div className="text-xs uppercase tracking-widest text-white/50">
        Built with
      </div>
      <ul className="mt-4 flex flex-wrap gap-3">
        {techs.map((t) => (
          <li
            key={t.name}
            className="group relative inline-flex items-center gap-2.5 border-2 border-black bg-black px-3 py-2 text-sm text-white transition-transform duration-200 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_var(--color-accent)]"
            style={{ ["--brand" as string]: t.brand }}
          >
            <span className="relative inline-flex h-4 w-4 items-center justify-center">
              <span
                className="pointer-events-none absolute inset-[-5px] rounded-full border-2 border-dashed border-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  animation: "tech-spin 3s linear infinite",
                  animationPlayState: "paused",
                }}
                data-ring
              />
              <span className="relative h-full w-full text-white transition-colors duration-200 group-hover:[color:var(--brand)]">
                {t.icon}
              </span>
            </span>
            <span>{t.name}</span>
            <style>{`
              @keyframes tech-spin { to { transform: rotate(360deg); } }
              .group:hover [data-ring] { animation-play-state: running; }
              @media (prefers-reduced-motion: reduce) {
                [data-ring] { animation: none !important; }
              }
            `}</style>
          </li>
        ))}
      </ul>
    </div>
  );
}

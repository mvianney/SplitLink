type Props = {
  className?: string;
  tilt?: number;
};

const WORDS = [
  "NO MIDDLEMAN",
  "EQUAL SPLITS",
  "INSTANT PAYOUTS",
  "BUILT ON SOLANA",
];

export default function Ribbon({ className = "", tilt = -2 }: Props) {
  const items = Array.from({ length: 2 }).flatMap(() => WORDS);
  return (
    <div
      className={`relative overflow-hidden border-y-2 border-black bg-[var(--color-accent)] py-3 ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      <div className="ribbon-track flex min-w-full gap-10 whitespace-nowrap">
        {items.concat(items).map((w, i) => (
          <span
            key={i}
            className="text-base font-black tracking-widest text-black sm:text-lg"
          >
            {w} <span className="mx-6">·</span>
          </span>
        ))}
      </div>
      <style>{`
        .ribbon-track {
          width: max-content;
          animation: ribbon-scroll 22s linear infinite;
        }
        @keyframes ribbon-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ribbon-track { animation: none; }
        }
      `}</style>
    </div>
  );
}

import Logo from "./Logo";

type Coin = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  tilt: number;
  dur: number;
  delay: number;
  slow?: boolean;
};

const coins: Coin[] = [
  { top: "8%", left: "-3%", size: 120, tilt: -18, dur: 7, delay: 0 },
  { top: "22%", right: "-4%", size: 160, tilt: 22, dur: 9, delay: 1, slow: true },
  { bottom: "12%", left: "6%", size: 90, tilt: 14, dur: 6, delay: 2 },
  { bottom: "18%", right: "8%", size: 110, tilt: -10, dur: 8, delay: 0.5, slow: true },
  { top: "55%", left: "-5%", size: 70, tilt: 32, dur: 5, delay: 1.4 },
  { top: "70%", right: "-3%", size: 80, tilt: -24, dur: 7, delay: 2.2 },
];

export default function FloatingCoins() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {coins.map((c, i) => (
        <div
          key={i}
          className="absolute opacity-80"
          style={{
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
            width: c.size,
            height: c.size,
            // CSS vars + animation
            ["--tilt" as string]: `${c.tilt}deg`,
            animation: `${c.slow ? "drift-slow" : "drift"} ${c.dur}s ease-in-out ${c.delay}s infinite`,
            filter: "drop-shadow(0 10px 24px rgba(57,255,20,0.25))",
          }}
        >
          <Logo size={c.size} animate={false} />
        </div>
      ))}
    </div>
  );
}

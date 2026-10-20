import Reveal from "@/components/Reveal";

type Step = {
  n: number;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    n: 1,
    title: "Create a split",
    body: "Name it, set the total, and give each person their share.",
  },
  {
    n: 2,
    title: "Send requests",
    body: "Invite your crew by username. One link each.",
  },
  {
    n: 3,
    title: "Everyone accepts",
    body: "Each person signs with their wallet. Fair shares, locked in.",
  },
  {
    n: 4,
    title: "Client pays once",
    body: "One link or QR code. Money sits in a vault nobody controls.",
  },
];

const finalStep: Step = {
  n: 5,
  title: "Everyone claims their cut",
  body: "Each member withdraws their own share, instantly, to their own wallet.",
};

function StepCard({ step, tilt }: { step: Step; tilt: number }) {
  return (
    <div
      className="relative border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[6px_6px_0_0_rgba(57,255,20,0.12)]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="mb-3 inline-flex h-8 min-w-8 items-center justify-center bg-[var(--color-accent)] px-2 text-sm font-semibold text-black">
        Step {step.n}
      </div>
      <div className="text-xl font-semibold tracking-tight">{step.title}</div>
      <p className="mt-2 text-white/80">{step.body}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-5xl px-5 py-24">
      <Reveal>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          How it works.
        </h2>
      </Reveal>

      {/* Desktop: zigzag with dotted line */}
      <div className="relative mt-16 hidden md:block">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-10 bottom-32 border-l-2 border-dotted border-[var(--color-accent)]"
          style={{ left: "50%" }}
        />
        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          <Reveal>
            <div className="pr-8">
              <StepCard step={steps[0]} tilt={-3} />
            </div>
          </Reveal>
          <div />

          <div />
          <Reveal delay={80}>
            <div className="pl-8 pt-14">
              <StepCard step={steps[1]} tilt={3} />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="pr-8 pt-14">
              <StepCard step={steps[2]} tilt={-2} />
            </div>
          </Reveal>
          <div />

          <div />
          <Reveal delay={240}>
            <div className="pl-8 pt-14">
              <StepCard step={steps[3]} tilt={2} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <div className="mt-16 border border-[var(--color-accent)] bg-[var(--color-card)] p-8 shadow-[8px_8px_0_0_var(--color-accent)]">
            <div className="mb-3 inline-flex h-8 min-w-8 items-center justify-center bg-[var(--color-accent)] px-2 text-sm font-semibold text-black">
              Step {finalStep.n}
            </div>
            <div className="text-2xl font-semibold tracking-tight">
              {finalStep.title}
            </div>
            <p className="mt-2 max-w-2xl text-white/80">{finalStep.body}</p>
          </div>
        </Reveal>
      </div>

      {/* Mobile: single column with dotted line on side */}
      <div className="relative mt-12 md:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-4 bottom-24 border-l-2 border-dotted border-[var(--color-accent)]"
        />
        <ol className="flex flex-col gap-8 pl-10">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <StepCard step={s} tilt={0} />
            </Reveal>
          ))}
        </ol>
        <Reveal delay={240}>
          <div className="mt-8 border border-[var(--color-accent)] bg-[var(--color-card)] p-6 shadow-[6px_6px_0_0_var(--color-accent)]">
            <div className="mb-3 inline-flex h-8 min-w-8 items-center justify-center bg-[var(--color-accent)] px-2 text-sm font-semibold text-black">
              Step {finalStep.n}
            </div>
            <div className="text-xl font-semibold tracking-tight">
              {finalStep.title}
            </div>
            <p className="mt-2 text-white/80">{finalStep.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

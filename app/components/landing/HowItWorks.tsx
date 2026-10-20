import Chip from "@/components/Chip";
import Highlight from "@/components/Highlight";
import PhoneFrame from "@/components/PhoneFrame";
import Reveal from "@/components/Reveal";
import {
  AcceptScreen,
  ClaimScreen,
  CreateScreen,
  PayScreen,
  RequestsScreen,
} from "@/components/screens/screens";
import type { ReactNode } from "react";

type Step = {
  n: number;
  title: string;
  body: string;
  screen: ReactNode;
  tilt: number;
  chip: string;
};

const steps: Step[] = [
  {
    n: 1,
    title: "Create a split",
    body: "Name it, set the total, give each person their share.",
    screen: <CreateScreen />,
    tilt: -5,
    chip: "Request sent",
  },
  {
    n: 2,
    title: "Send requests",
    body: "Invite your crew by username. One link each.",
    screen: <RequestsScreen />,
    tilt: 5,
    chip: "@ada accepted",
  },
  {
    n: 3,
    title: "Everyone accepts",
    body: "Each person signs with their wallet. Fair shares, locked in.",
    screen: <AcceptScreen />,
    tilt: -4,
    chip: "@tobi accepted",
  },
  {
    n: 4,
    title: "Client pays once",
    body: "One link or QR code. The money sits in a vault nobody controls.",
    screen: <PayScreen />,
    tilt: 4,
    chip: "$100 in vault",
  },
];

const finalStep = {
  n: 5,
  title: "Everyone claims their cut",
  body: "Each member withdraws their own share, instantly, to their own wallet.",
  chip: "$30 claimed",
};

function StepText({
  step,
  align = "left",
}: {
  step: Pick<Step, "n" | "title" | "body">;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div className="inline-flex items-center bg-[var(--color-accent)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-black">
        Step {step.n}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">
        {step.title}
      </div>
      <p className="mt-2 max-w-xs text-white/80">{step.body}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          How it <Highlight>works</Highlight>.
        </h2>
      </Reveal>

      {/* Desktop: zigzag */}
      <div className="relative mt-20 hidden md:block">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 3100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 350 266 C 350 520, 650 640, 650 895 C 650 1150, 350 1270, 350 1524 C 350 1778, 650 1900, 650 2153 C 650 2420, 280 2560, 280 2810"
            stroke="var(--color-accent)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray="1 18"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Step 1 — phone left, text right */}
        <Reveal>
          <div className="grid grid-cols-2 items-center gap-x-10">
            <div className="flex justify-end">
              <div className="relative">
                <PhoneFrame tilt={steps[0].tilt} width={260}>
                  {steps[0].screen}
                </PhoneFrame>
                <Chip tilt={-6} className="absolute -right-10 top-16">
                  {steps[0].chip}
                </Chip>
              </div>
            </div>
            <div className="pl-10">
              <StepText step={steps[0]} />
            </div>
          </div>
        </Reveal>

        {/* Step 2 — text left, phone right (half-lower) */}
        <Reveal delay={80}>
          <div className="mt-24 grid grid-cols-2 items-center gap-x-10">
            <div className="pr-10 text-right">
              <StepText step={steps[1]} align="right" />
            </div>
            <div className="flex justify-start">
              <div className="relative">
                <PhoneFrame tilt={steps[1].tilt} width={260}>
                  {steps[1].screen}
                </PhoneFrame>
                <Chip tilt={4} className="absolute -left-10 top-20">
                  {steps[1].chip}
                </Chip>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Step 3 — phone left */}
        <Reveal delay={160}>
          <div className="mt-24 grid grid-cols-2 items-center gap-x-10">
            <div className="flex justify-end">
              <div className="relative">
                <PhoneFrame tilt={steps[2].tilt} width={260}>
                  {steps[2].screen}
                </PhoneFrame>
                <Chip tilt={-5} className="absolute -right-12 top-32">
                  {steps[2].chip}
                </Chip>
              </div>
            </div>
            <div className="pl-10">
              <StepText step={steps[2]} />
            </div>
          </div>
        </Reveal>

        {/* Step 4 — phone right */}
        <Reveal delay={240}>
          <div className="mt-24 grid grid-cols-2 items-center gap-x-10">
            <div className="pr-10 text-right">
              <StepText step={steps[3]} align="right" />
            </div>
            <div className="flex justify-start">
              <div className="relative">
                <PhoneFrame tilt={steps[3].tilt} width={260}>
                  {steps[3].screen}
                </PhoneFrame>
                <Chip tilt={6} className="absolute -left-12 top-28">
                  {steps[3].chip}
                </Chip>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Step 5 — full width */}
        <Reveal delay={320}>
          <div className="mt-28 border border-[var(--color-accent)] bg-[var(--color-card)] p-8 shadow-[10px_10px_0_0_var(--color-accent)]">
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center">
              <div className="relative">
                <PhoneFrame tilt={-3} width={240}>
                  <ClaimScreen />
                </PhoneFrame>
                <Chip tilt={-4} className="absolute -right-10 top-24">
                  {finalStep.chip}
                </Chip>
              </div>
              <div className="max-w-md">
                <div className="inline-flex items-center bg-[var(--color-accent)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-black">
                  Step {finalStep.n}
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-tight">
                  {finalStep.title}
                </div>
                <p className="mt-2 text-white/80">{finalStep.body}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Mobile */}
      <div className="relative mt-12 md:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-6 bottom-24 border-l-2 border-dotted border-[var(--color-accent)]"
        />
        <ol className="flex flex-col gap-14 pl-10">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="flex flex-col gap-5">
                <StepText step={s} />
                <div className="relative mx-auto">
                  <PhoneFrame tilt={0} width={220}>
                    {s.screen}
                  </PhoneFrame>
                  <Chip tilt={-3} className="absolute -right-6 top-16">
                    {s.chip}
                  </Chip>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={240}>
          <div className="mt-14 border border-[var(--color-accent)] bg-[var(--color-card)] p-6 shadow-[6px_6px_0_0_var(--color-accent)]">
            <div className="inline-flex items-center bg-[var(--color-accent)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-black">
              Step {finalStep.n}
            </div>
            <div className="mt-3 text-xl font-semibold tracking-tight">
              {finalStep.title}
            </div>
            <p className="mt-2 text-white/80">{finalStep.body}</p>
            <div className="mt-5 flex justify-center">
              <PhoneFrame tilt={0} width={220}>
                <ClaimScreen />
              </PhoneFrame>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

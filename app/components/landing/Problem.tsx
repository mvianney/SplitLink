import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";

export default function Problem() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <div className="mx-auto w-full max-w-sm">
            <Mascot pose="worried" className="h-auto w-full" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-8">
            <div className="text-xs uppercase tracking-widest text-white/50">
              The problem
            </div>
            <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-white">
              One person gets paid for the whole crew. They decide who gets
              what, and when. Some get shorted. Some wait weeks.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

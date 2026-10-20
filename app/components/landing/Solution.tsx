import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";

export default function Solution() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <div className="order-2 border border-[var(--color-border)] bg-[var(--color-card)] p-8 md:order-1">
            <div className="text-xs uppercase tracking-widest text-[var(--color-accent)]">
              The fix
            </div>
            <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-white">
              With SplitLink, everyone agrees on their share before the job is
              paid. The money lands in a vault nobody controls, and each person
              claims their own cut.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="order-1 mx-auto w-full max-w-sm md:order-2">
            <Mascot pose="excited" className="h-auto w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

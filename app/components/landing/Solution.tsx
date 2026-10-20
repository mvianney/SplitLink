import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";

export default function Solution() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-6 pb-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <div className="relative order-2 pt-5 md:order-1">
            <div
              className="absolute left-5 top-0 inline-flex items-center border-[3px] border-black bg-[var(--color-accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black"
              style={{ boxShadow: "3px 3px 0 0 #000" }}
            >
              The fix
            </div>
            <div
              className="border-[3px] border-black bg-[var(--color-card)] p-8"
              style={{ boxShadow: "10px 10px 0 0 var(--color-accent)" }}
            >
              <p className="text-2xl font-medium leading-snug tracking-tight text-white">
                With SplitLink, everyone agrees on their share before the job
                is paid. The money lands in a vault nobody controls, and each
                person claims their own cut.
              </p>
            </div>
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

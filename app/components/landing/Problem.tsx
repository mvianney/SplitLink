import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";

export default function Problem() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-20 pb-6">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <div className="mx-auto w-full max-w-sm">
            <Mascot pose="worried" className="h-auto w-full" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative pt-5">
            <div
              className="absolute left-5 top-0 inline-flex items-center border-[3px] border-black bg-[#FF4D4D] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black"
              style={{ boxShadow: "3px 3px 0 0 #000" }}
            >
              The problem
            </div>
            <div
              className="border-[3px] border-black bg-[var(--color-card)] p-8"
              style={{ boxShadow: "10px 10px 0 0 #FF4D4D" }}
            >
              <p className="text-2xl font-medium leading-snug tracking-tight text-white">
                One person gets paid for the whole crew. They decide who gets
                what, and when. Some get shorted. Some wait weeks.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import BuiltWith from "@/components/BuiltWith";
import Highlight from "@/components/Highlight";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-24">
      <Reveal>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          What <Highlight>SplitLink</Highlight> is.
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-6 max-w-3xl text-lg text-white/80 sm:text-xl">
          SplitLink is a payment-splitting app for crews paid as one group:
          dance groups, event crews, small dev teams. Everyone agrees on their
          share up front. The money lands in a vault nobody controls. Each
          person claims their own cut, straight to their own wallet.
        </p>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-10">
          <BuiltWith />
        </div>
      </Reveal>
    </section>
  );
}

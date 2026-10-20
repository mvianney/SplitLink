import Highlight from "@/components/Highlight";
import Reveal from "@/components/Reveal";

export default function Future() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center">
      <Reveal>
        <p className="text-balance text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
          Group payouts should be <Highlight>fair</Highlight> by default.
          <br />
          <span className="text-white/60">
            No favours, no excuses, no &ldquo;I&rsquo;ll send it later.&rdquo;
          </span>
        </p>
      </Reveal>
    </section>
  );
}

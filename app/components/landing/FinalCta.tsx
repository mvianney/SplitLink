import Reveal from "@/components/Reveal";
import SplitButton from "@/components/SplitButton";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center">
      <Reveal>
        <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Your crew did the work.{" "}
          <span className="text-[var(--color-accent)]">
            Make sure everyone gets paid.
          </span>
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-10 flex justify-center">
          <SplitButton href="/signup" variant="primary">
            Sign up
          </SplitButton>
        </div>
      </Reveal>
    </section>
  );
}

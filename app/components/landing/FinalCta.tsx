import Highlight from "@/components/Highlight";
import Reveal from "@/components/Reveal";
import SplitButton from "@/components/SplitButton";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center">
      <Reveal>
        <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Your crew did the work.
          <br />
          Make sure <Highlight>everyone</Highlight> gets paid.
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-8 text-lg text-white/80">
          Sign up on SplitLink to get paid fairly.
        </p>
        <div className="mt-5 flex justify-center">
          <SplitButton href="/signup" variant="primary">
            Sign up
          </SplitButton>
        </div>
      </Reveal>
    </section>
  );
}

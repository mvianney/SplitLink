import FloatingCoins from "@/components/FloatingCoins";
import SplitButton from "@/components/SplitButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <FloatingCoins />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-24 pt-20 text-center sm:pt-28">
        <span className="mb-6 inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 bg-[var(--color-accent)]" />
          Finance without intermediaries · Solana devnet
        </span>
        <h1 className="text-[clamp(56px,12vw,160px)] font-semibold leading-[0.9] tracking-[-0.04em]">
          SplitLink
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-white/80 sm:text-xl">
          Split payments with your crew. Fairly, instantly, and without anyone
          holding the money.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <SplitButton href="/signup" variant="primary">
            Sign up
          </SplitButton>
          <SplitButton href="#how" variant="ghost">
            How it works
          </SplitButton>
        </div>
      </div>
    </section>
  );
}

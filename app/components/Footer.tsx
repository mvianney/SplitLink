import Logo from "./Logo";
import { links } from "@/config/links";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo size={24} />
          <span className="text-sm text-white/70">
            SplitLink · built on Solana
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a
            className="text-white/80 hover:text-white"
            href={links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-white/80 hover:text-white"
            href={links.devX}
            target="_blank"
            rel="noreferrer"
          >
            Dev on X
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Logo from "./Logo";
import SplitButton from "./SplitButton";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-black/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo size={28} />
          <span className="text-lg font-semibold tracking-tight">SplitLink</span>
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#about"
            className="hidden text-sm text-white/80 hover:text-white sm:inline"
          >
            About
          </a>
          <a
            href="#how"
            className="hidden text-sm text-white/80 hover:text-white sm:inline"
          >
            How it works
          </a>
          <SplitButton href="/signup" variant="primary" icon={false}>
            Sign up
          </SplitButton>
        </div>
      </nav>
    </header>
  );
}

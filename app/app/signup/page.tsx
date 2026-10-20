import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sign up · SplitLink",
};

export default function SignupStub() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
        <h1 className="text-5xl font-semibold tracking-tight">Sign up</h1>
        <p className="mt-4 text-white/70">
          Coming soon. Username + password, with wallet connect after login.
        </p>
        <Link
          href="/"
          className="mt-8 text-sm text-[var(--color-accent)] underline underline-offset-4"
        >
          ← Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}

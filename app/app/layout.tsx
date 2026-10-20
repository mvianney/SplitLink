import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const display = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SplitLink · Fair group payouts on Solana",
  description:
    "Split payments with your crew. Fairly, instantly, and without anyone holding the money.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-fg)]">
        {children}
      </body>
    </html>
  );
}

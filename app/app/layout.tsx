import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
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

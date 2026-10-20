"use client";

import dynamic from "next/dynamic";

// Three.js only runs in the browser; loaded after the page so the hero text shows first.
const HeroCoins3D = dynamic(() => import("./HeroCoins3D"), { ssr: false });

export default function HeroCoins() {
  return <HeroCoins3D />;
}

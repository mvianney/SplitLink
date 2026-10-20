import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Ribbon from "@/components/Ribbon";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import Future from "@/components/landing/Future";
import FinalCta from "@/components/landing/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ribbon tilt={-2} />
        <About />
        <Problem />
        <Solution />
        <Ribbon tilt={1.5} />
        <HowItWorks />
        <Future />
        <Ribbon tilt={-1.5} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

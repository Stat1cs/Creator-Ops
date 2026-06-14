import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import Channels from "@/components/Channels";
import Founding from "@/components/Founding";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Stats />
        <Problem />
        <HowItWorks />
        <Demo />
        <Channels />
        <Founding />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

/* Core */
import Loader from "./components/Loader";
import GridScan from "./components/GridScan";

/* Background components */

/* Sections */
import TopMarquee from "./components/TopMarquee";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Prize from "./components/Prize";
import About from "./components/About";
import Register from "./components/Register";
import Countdown from "./components/Countdown";
import Domains from "./components/Domains";
import Rules from "./components/Rules";
import Agenda from "./components/Agenda";
import Arena from "./components/Arena";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import VideoSection from "./components/VideoSection";

// Wrapper for scroll reveals
import SectionReveal from "./components/SectionReveal";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  /* REMOVED loading guard to allow AnimatePresence to work */
  /* if (loading) return <Loader />; */

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* GLOBAL BACKGROUND GRID SCAN */}
        <div className="fixed inset-0 z-[1] opacity-40 pointer-events-none">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#392e4e"
            gridScale={0.1}
            scanColor="#FF9FFC"
            scanOpacity={0.35}
            enablePost
            bloomIntensity={0.5}
            chromaticAberration={0.002}
            noiseIntensity={0.005}
          />
        </div>

        {/* CONTENT */}
        <div className="app-content relative z-10">
          <TopMarquee />
          <Navbar />
          <SectionReveal effect="animate-fadeIn"><Hero /></SectionReveal>
          <VideoSection />
          <SectionReveal effect="animate-slideUp"><Prize /></SectionReveal>
          <SectionReveal effect="animate-slideUp"><About /></SectionReveal>
          <SectionReveal effect="animate-slideUp"><Register /></SectionReveal>
          <SectionReveal effect="animate-slideUp"><Countdown /></SectionReveal>
          <SectionReveal effect="animate-slideUp"><Domains /></SectionReveal>
          <SectionReveal effect="animate-slideUp"><Rules /></SectionReveal>
          <SectionReveal effect="animate-slideUp"><Agenda /></SectionReveal>
          <SectionReveal effect="animate-slideUp"><Arena /></SectionReveal>
          <SectionReveal effect="animate-slideUp"><Contact /></SectionReveal>
          <Footer />
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { initSmoothScroll } from "./lib/smoothScroll";
import "./App.css";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Calculator from "./components/Calculator";
import Checklist from "./components/Checklist";
import Reviews from "./components/Reviews";
import Tips from "./components/Tips";
import Faq from "./components/Faq";
import CtaBanner from "./components/CtaBanner";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ScrollProgress, FloatingCall, BackToTop } from "./components/Widgets";

// Preloader ukazujeme jen při první návštěvě v rámci session.
function shouldShowPreloader() {
  try {
    return !window.sessionStorage.getItem("stk-visited");
  } catch {
    return true;
  }
}

export default function App() {
  const [loading, setLoading] = useState(shouldShowPreloader);

  // Lenis smooth scroll pro celý web.
  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => {
      setLoading(false);
      try {
        window.sessionStorage.setItem("stk-visited", "1");
      } catch {
        // soukromý režim apod. – preloader se prostě ukáže znovu
      }
    }, 1700);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      <div className="app">
        <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>

        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <Services />
          <Process />
          <Gallery />
          <Pricing />
          <Calculator />
          <Checklist />
          <Reviews />
          <Tips />
          <Faq />
          <CtaBanner />
          <Booking />
          <Contact />
        </main>

        <Footer />
        <FloatingCall />
        <BackToTop />
      </div>
    </>
  );
}

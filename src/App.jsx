import { useState, useEffect } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import "./App.css";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Checklist from "./components/Checklist";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
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
    <MotionConfig reducedMotion="user">
      <div className="app">
        <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>

        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <Services />
          <Process />
          <Pricing />
          <Checklist />
          <Reviews />
          <Faq />
          <Contact />
        </main>

        <Footer />
        <FloatingCall />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}

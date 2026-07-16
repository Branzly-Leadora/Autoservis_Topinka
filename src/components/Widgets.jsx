import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { PhoneIcon, ArrowIcon } from "./icons";
import { CONTACT } from "../data";
import { scrollToTop } from "../lib/smoothScroll";

/** Zelený progress bar u horní hrany, roste se scrollem. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/** Plovoucí tlačítko volání – jen na mobilu, objeví se po odscrollování hera. */
export function FloatingCall() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={CONTACT.phoneHref}
          className="floating-call"
          initial={{ x: "-50%", y: 90, opacity: 0 }}
          animate={{ x: "-50%", y: 0, opacity: 1 }}
          exit={{ x: "-50%", y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          aria-label={`Zavolat ${CONTACT.phone}`}
        >
          <span className="floating-call-pulse" aria-hidden="true" />
          <PhoneIcon size={18} />
          <span>Objednat termín</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Šipka zpět nahoru. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ y: -3 }}
          aria-label="Zpět nahoru"
        >
          <ArrowIcon dir="up" size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

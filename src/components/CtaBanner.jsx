import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "./ui";
import { PhoneIcon } from "./icons";
import SmartImage from "./SmartImage";
import { CONTACT, IMAGES } from "../data";

/** Celoplošný foto banner s parallaxem a hlavní výzvou k akci. */
export default function CtaBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section className="cta-banner" ref={ref}>
      <motion.div className="cta-banner-bg" style={{ y }} aria-hidden="true">
        <SmartImage src={IMAGES.banner} alt="" loading="lazy" />
      </motion.div>
      <div className="cta-banner-overlay" aria-hidden="true" />
      <div className="container cta-banner-content">
        <motion.h2
          className="cta-banner-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Termín STK vyřídíte
          <br />
          <span className="accent">jedním telefonátem.</span>
        </motion.h2>
        <motion.p
          className="cta-banner-sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Zavolejte, domluvíme čas, který vám sedne – a o zbytek se postaráme.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Magnetic>
            <motion.a
              href={CONTACT.phoneHref}
              className="btn btn--primary btn--lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <PhoneIcon size={17} /> {CONTACT.phone}
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

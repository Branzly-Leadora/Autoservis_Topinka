import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHead, Reveal } from "./ui";
import { PROCESS_STEPS } from "../data";

/** Časová osa průběhu kontroly – linka se dokresluje se scrollem. */
export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="section section--process" id="prubeh">
      <div className="container">
        <SectionHead
          label="Jak to probíhá"
          title={
            <>
              Pět kroků <span className="accent">a máte hotovo.</span>
            </>
          }
          perex="Žádná byrokracie ani hodiny čekání. Celý průběh kontroly vám vysvětlíme lidsky a srozumitelně."
        />

        <div className="process-timeline" ref={ref}>
          <div className="process-line" aria-hidden="true">
            <motion.div className="process-line-fill" style={{ scaleY }} />
          </div>
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} className="process-step" delay={i * 0.05}>
              <div className="process-step-num">
                <span>{step.num}</span>
              </div>
              <div className="process-step-body">
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

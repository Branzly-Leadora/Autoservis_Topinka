import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, Stagger, fadeUp, EASE } from "./ui";
import { FAQ } from "../data";

/** Akordeon častých dotazů s plynulou výškovou animací. */
export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section--faq" id="faq">
      <div className="container container--narrow">
        <SectionHead
          label="Časté dotazy"
          title={
            <>
              Na co se řidiči <span className="accent">ptají nejčastěji</span>
            </>
          }
          center
        />

        <Stagger className="faq-list" gap={0.07}>
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                className={`faq-item${isOpen ? " is-open" : ""}`}
                variants={fadeUp}
                key={item.q}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className="faq-plus"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p className="faq-answer">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

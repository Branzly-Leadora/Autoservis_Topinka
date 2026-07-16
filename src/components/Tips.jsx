import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, Stagger, fadeUp, EASE } from "./ui";
import { TIPS } from "../data";

/** Rádce – rozbalovací karty s praktickými radami kolem STK. */
export default function Tips() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="section section--tips" id="radce">
      <div className="container">
        <SectionHead
          label="Rádce"
          title={
            <>
              Projeďte napoprvé. <span className="accent">Poradíme jak.</span>
            </>
          }
          perex="Pár minut čtení, které vám může ušetřit opakovanou kontrolu. Sepsali jsme, na co si dát pozor."
        />

        <Stagger className="tips-grid" gap={0.1}>
          {TIPS.map((tip, i) => {
            const isOpen = open === i;
            return (
              <motion.article
                key={tip.title}
                variants={fadeUp}
                className={`tip-card${isOpen ? " is-open" : ""}`}
              >
                <button
                  className="tip-head"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="tip-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="tip-title">{tip.title}</span>
                  <motion.span
                    className="tip-plus"
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
                      className="tip-body-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <div className="tip-body">
                        <p className="tip-perex">{tip.perex}</p>
                        <ul className="tip-list">
                          {tip.items.map((item) => (
                            <li key={item}>
                              <span className="tip-check" aria-hidden="true">
                                ✓
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

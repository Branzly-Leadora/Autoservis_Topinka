import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, EASE } from "./ui";
import { PhoneIcon } from "./icons";
import { PRICING_TABS, PRICING_NOTE, CONTACT } from "../data";

/** Ceník s přepínatelnými záložkami a animovanými řádky. */
export default function Pricing() {
  const [active, setActive] = useState(PRICING_TABS[0].id);
  const tab = PRICING_TABS.find((t) => t.id === active);

  return (
    <section className="section section--pricing" id="cenik">
      <div className="container">
        <SectionHead
          label="Ceník"
          title={
            <>
              Férové ceny. <span className="accent">Žádná překvapení.</span>
            </>
          }
          perex={PRICING_NOTE}
        />

        <div className="pricing-tabs" aria-label="Kategorie vozidel">
          {PRICING_TABS.map((t) => (
            <button
              key={t.id}
              aria-pressed={active === t.id}
              className={`pricing-tab${active === t.id ? " is-active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {active === t.id && (
                <motion.span
                  className="pricing-tab-pill"
                  layoutId="pricing-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="pricing-tab-label">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="pricing-table-wrap">
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab.id}
              className="pricing-table"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -14, transition: { duration: 0.2 } }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {tab.rows.map((row) => (
                <motion.li
                  key={row.name}
                  className={`pricing-row${row.highlight ? " pricing-row--highlight" : ""}`}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
                  }}
                >
                  <div className="pricing-row-name">
                    {row.name}
                    {row.highlight && <span className="pricing-row-badge">Výhodné</span>}
                    <span className="pricing-row-note">{row.note}</span>
                  </div>
                  <div className="pricing-row-dots" aria-hidden="true" />
                  <div className="pricing-row-price">{row.price}</div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <motion.div
          className="section-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p>Chcete přesnou cenu pro své vozidlo?</p>
          <motion.a
            href={CONTACT.phoneHref}
            className="btn btn--primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <PhoneIcon size={16} /> Zavolat pro cenu
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

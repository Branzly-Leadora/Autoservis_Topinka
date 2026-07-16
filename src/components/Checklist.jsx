import { motion } from "framer-motion";
import { SectionHead, Stagger, fadeUp, DrawnCheck } from "./ui";
import { PhoneIcon } from "./icons";
import { CHECKLIST, CONTACT } from "../data";

/** „Co vzít s sebou" – seznam dokladů s dokreslovanými fajfkami. */
export default function Checklist() {
  return (
    <section className="section section--checklist" id="doklady">
      <div className="container checklist-layout">
        <div className="checklist-head">
          <SectionHead
            label="Než vyrazíte"
            title={
              <>
                Co vzít <span className="accent">s sebou?</span>
              </>
            }
            perex="Stačí pár dokladů. Když si nejste jistí, zavolejte nám předem – projdeme to spolu za minutu."
          />
          <motion.div
            className="checklist-callout"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="checklist-callout-title">Nemáte doklady kompletní?</div>
            <p>Nevadí. Zavolejte a domluvíme se, jak to vyřešit.</p>
            <a href={CONTACT.phoneHref} className="checklist-callout-link">
              <PhoneIcon size={14} /> {CONTACT.phone}
            </a>
          </motion.div>
        </div>

        <Stagger className="checklist-items" gap={0.09}>
          {CHECKLIST.map((item, i) => (
            <motion.div className="checklist-item" variants={fadeUp} key={item.title}>
              <div className="checklist-check">
                <DrawnCheck size={26} delay={0.15 + i * 0.08} />
              </div>
              <div>
                <div className="checklist-item-title">{item.title}</div>
                <div className="checklist-item-desc">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

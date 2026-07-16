import { motion } from "framer-motion";
import { SectionHead, Stagger, TiltCard, fadeUp } from "./ui";
import { ServiceIcon, PhoneIcon } from "./icons";
import { SERVICES, CONTACT } from "../data";

/** Mřížka služeb – 3D tilt karty se svítícím okrajem sledujícím kurzor. */
export default function Services() {
  return (
    <section className="section section--services" id="sluzby">
      <div className="container">
        <SectionHead
          label="Naše služby"
          title={
            <>
              Vše, co na STK
              <br />
              potřebujete. <span className="accent">Na jednom místě.</span>
            </>
          }
          perex="Od pravidelné technické kontroly přes emise až po evidenční kontrolu při přepisu. Přijedete jednou – odjedete s hotovou STK."
        />

        <Stagger className="services-grid" gap={0.08}>
          {SERVICES.map((s) => (
            <motion.div variants={fadeUp} key={s.title}>
              <TiltCard className="service-card">
                <div className="service-card-glow" aria-hidden="true" />
                <div className="service-card-inner">
                  <div className="service-icon">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <div className="service-tag">{s.tag}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <ul className="service-points">
                    {s.points.map((p) => (
                      <li key={p}>
                        <span className="service-point-check" aria-hidden="true">
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </Stagger>

        <motion.div
          className="section-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Nevíte, kterou kontrolu potřebujete? Zavolejte – poradíme zdarma.</p>
          <motion.a
            href={CONTACT.phoneHref}
            className="btn btn--primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <PhoneIcon size={16} /> {CONTACT.phone}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

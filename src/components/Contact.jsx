import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHead, Reveal, Magnetic } from "./ui";
import { PhoneIcon, PinIcon, ClockIcon } from "./icons";
import { CONTACT } from "../data";

/** Zjistí, zda je právě otevřeno (Po–Pá 7:30–16:00, čas v Praze). */
function isOpenNow() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("cs-CZ", {
    timeZone: "Europe/Prague",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hour12: false,
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday").toLowerCase();
  const minutes = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
  const isWorkday = !["so", "ne"].includes(weekday.slice(0, 2));
  return isWorkday && minutes >= 7 * 60 + 30 && minutes < 16 * 60;
}

export default function Contact() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(isOpenNow());
    const t = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section section--contact" id="kontakt">
      <div className="container">
        <SectionHead
          label="Kontakt"
          title={
            <>
              Přijeďte, nebo <span className="accent">zavolejte.</span>
            </>
          }
          perex="Najdete nás v Plzni-Skvrňanech, kousek od hlavního tahu. Parkování přímo u stanice."
        />

        <div className="contact-grid">
          <Reveal className="contact-info" delay={0.05}>
            <div className="contact-status">
              <span className={`contact-status-dot${open ? " is-open" : ""}`} aria-hidden="true" />
              {open ? "Právě máme otevřeno" : "Momentálně zavřeno"}
            </div>

            <ul className="contact-list">
              <li className="contact-item">
                <span className="contact-item-icon">
                  <PinIcon size={17} />
                </span>
                <div>
                  <div className="contact-item-label">Adresa</div>
                  <div className="contact-item-value">
                    {CONTACT.addressLine1}
                    <br />
                    {CONTACT.addressLine2}
                  </div>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-item-icon">
                  <PhoneIcon size={17} />
                </span>
                <div>
                  <div className="contact-item-label">Telefon</div>
                  <a className="contact-item-value contact-item-value--link" href={CONTACT.phoneHref}>
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-item-icon">
                  <ClockIcon size={17} />
                </span>
                <div>
                  <div className="contact-item-label">Otevírací doba</div>
                  <div className="contact-item-value">
                    {CONTACT.hours.map((h) => (
                      <div className="contact-hours-row" key={h.day}>
                        <span>{h.day}</span>
                        <span className={h.open ? "hours-open" : "hours-closed"}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            <div className="contact-ctas">
              <Magnetic strength={0.15}>
                <motion.a
                  href={CONTACT.phoneHref}
                  className="btn btn--primary btn--block"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <PhoneIcon size={16} /> Zavolat a objednat se
                </motion.a>
              </Magnetic>
              <motion.a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost btn--block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <PinIcon size={16} /> Navigovat v Google Maps
              </motion.a>
            </div>
          </Reveal>

          <Reveal className="contact-map" delay={0.15}>
            <iframe
              title="Mapa – STK Topinka, Nade Mží 1108/15, Plzeň"
              src={CONTACT.mapsEmbed}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

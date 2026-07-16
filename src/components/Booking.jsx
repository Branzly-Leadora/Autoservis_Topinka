import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, EASE } from "./ui";
import { PhoneIcon } from "./icons";
import { CONTACT, SERVICES } from "../data";

// DEMO režim: odeslání se zatím nikam neposílá, jen ukáže potvrzení.
// Před spuštěním napojte na e-mail stanice / rezervační systém
// (např. Formspree, Netlify Forms nebo vlastní backend) v handleSubmit.
const DEMO_MODE = true;

const TIME_SLOTS = ["7:30 – 9:00", "9:00 – 11:00", "11:00 – 13:00", "13:00 – 16:00"];

const initialForm = {
  name: "",
  phone: "",
  vehicle: "",
  service: SERVICES[0].title,
  date: "",
  slot: TIME_SLOTS[0],
  note: "",
};

export default function Booking() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const err = {};
    if (form.name.trim().length < 3) err.name = "Vyplňte prosím jméno.";
    if (!/^[+\d][\d\s]{8,}$/.test(form.phone.trim())) err.phone = "Vyplňte platné telefonní číslo.";
    if (!form.date) err.date = "Vyberte preferovaný den.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    // Zde napojit skutečné odeslání (fetch na backend / formulářovou službu).
    setSent(true);
  };

  return (
    <section className="section section--booking" id="objednani">
      <div className="container">
        <SectionHead
          label="Objednání online"
          title={
            <>
              Rezervujte si termín <span className="accent">z pohodlí domova.</span>
            </>
          }
          perex="Vyplňte pár údajů a my se vám obratem ozveme s potvrzením termínu. Nebo prostě zavolejte – obojí funguje."
        />

        <div className="booking-card">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                className="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <svg width="76" height="76" viewBox="0 0 76 76" fill="none" aria-hidden="true">
                  <motion.circle
                    cx="38"
                    cy="38"
                    r="33"
                    stroke="var(--green)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M24 39.5l10 10L52 28"
                    stroke="var(--green)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: 0.75 }}
                  />
                </svg>
                <h3 className="booking-success-title">Poptávka termínu odeslána!</h3>
                <p className="booking-success-text">
                  Děkujeme, {form.name.split(" ")[0]}. Ozveme se vám na {form.phone} s potvrzením
                  termínu {form.date && new Date(form.date).toLocaleDateString("cs-CZ")} ({form.slot}).
                </p>
                {DEMO_MODE && (
                  <p className="booking-demo-note">
                    Ukázkový režim – odeslání se napojí na e-mail či rezervační systém stanice.
                  </p>
                )}
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setSent(false);
                    setForm(initialForm);
                  }}
                >
                  Odeslat další poptávku
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="booking-form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="booking-grid">
                  <label className="form-field">
                    <span className="form-label">Jméno a příjmení *</span>
                    <input
                      className={`input${errors.name ? " input--error" : ""}`}
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Jan Novák"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </label>

                  <label className="form-field">
                    <span className="form-label">Telefon *</span>
                    <input
                      className={`input${errors.phone ? " input--error" : ""}`}
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+420 777 123 456"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </label>

                  <label className="form-field">
                    <span className="form-label">Vozidlo / SPZ</span>
                    <input
                      className="input"
                      type="text"
                      value={form.vehicle}
                      onChange={set("vehicle")}
                      placeholder="Škoda Octavia · 1P2 3456"
                    />
                  </label>

                  <label className="form-field">
                    <span className="form-label">Služba</span>
                    <select className="input" value={form.service} onChange={set("service")}>
                      {SERVICES.map((s) => (
                        <option key={s.title} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="form-field">
                    <span className="form-label">Preferovaný den *</span>
                    <input
                      className={`input${errors.date ? " input--error" : ""}`}
                      type="date"
                      value={form.date}
                      onChange={set("date")}
                      min={new Date().toISOString().slice(0, 10)}
                    />
                    {errors.date && <span className="form-error">{errors.date}</span>}
                  </label>

                  <div className="form-field">
                    <span className="form-label">Preferovaný čas</span>
                    <div className="booking-slots">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          className={`booking-slot${form.slot === slot ? " is-active" : ""}`}
                          onClick={() => setForm((f) => ({ ...f, slot }))}
                          aria-pressed={form.slot === slot}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="form-field form-field--full">
                    <span className="form-label">Poznámka</span>
                    <textarea
                      className="input"
                      rows="3"
                      value={form.note}
                      onChange={set("note")}
                      placeholder="Např. vůz na LPG, spěchá to…"
                    />
                  </label>
                </div>

                <div className="booking-actions">
                  <motion.button
                    type="submit"
                    className="btn btn--primary btn--lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Odeslat poptávku termínu
                  </motion.button>
                  <span className="booking-alt">
                    …nebo rovnou zavolejte:{" "}
                    <a href={CONTACT.phoneHref} className="booking-alt-phone">
                      <PhoneIcon size={13} /> {CONTACT.phone}
                    </a>
                  </span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

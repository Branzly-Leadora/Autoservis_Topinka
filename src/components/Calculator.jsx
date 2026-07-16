import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, EASE } from "./ui";
import { PhoneIcon } from "./icons";
import { CONTACT } from "../data";
import { scrollToId } from "../lib/smoothScroll";

// Lhůty dle zákona č. 56/2001 Sb. – první kontrola / další kontroly (v letech).
const VEHICLE_TYPES = [
  { id: "osobni", label: "Osobní / dodávka", note: "M1, N1 do 3,5 t", first: 4, next: 2 },
  { id: "moto", label: "Motocykl", note: "nad 50 cm³", first: 4, next: 2 },
  { id: "privesO2", label: "Přívěs nad 750 kg", note: "kategorie O2", first: 4, next: 2 },
  { id: "privesO1", label: "Přívěs do 750 kg", note: "kategorie O1", first: 6, next: 4 },
  { id: "moped", label: "Moped / malý motocykl", note: "do 50 cm³", first: 6, next: 4 },
  { id: "taxi", label: "Taxi / autoškola", note: "zvláštní režim", first: 1, next: 1 },
];

function addYears(date, years) {
  const d = new Date(date.getTime());
  d.setFullYear(d.getFullYear() + years);
  return d;
}

function daysBetween(a, b) {
  return Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

/** Spočítá další termín STK z registrace / poslední kontroly. */
function computeDeadline(type, regDate, lastDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (lastDate) {
    return addYears(lastDate, type.next);
  }
  if (!regDate) return null;
  // bez data poslední kontroly předpokládáme, že kontroly probíhaly včas
  let next = addYears(regDate, type.first);
  while (next < today) next = addYears(next, type.next);
  return next;
}

const fmt = new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "long", year: "numeric" });

export default function Calculator() {
  const [typeId, setTypeId] = useState("osobni");
  const [reg, setReg] = useState("");
  const [last, setLast] = useState("");

  const type = VEHICLE_TYPES.find((t) => t.id === typeId);

  const result = useMemo(() => {
    const regDate = reg ? new Date(reg) : null;
    const lastDate = last ? new Date(last) : null;
    if (!regDate && !lastDate) return null;
    const deadline = computeDeadline(type, regDate, lastDate);
    if (!deadline || Number.isNaN(deadline.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = daysBetween(today, deadline);
    const status = days < 0 ? "expired" : days <= 90 ? "soon" : "ok";
    return { deadline, days, status };
  }, [type, reg, last]);

  return (
    <section className="section section--calculator" id="kalkulacka">
      <div className="container">
        <SectionHead
          label="Kalkulačka"
          title={
            <>
              Kdy musíte <span className="accent">na STK?</span>
            </>
          }
          perex="Vyberte typ vozidla a zadejte datum – spočítáme vám orientační termín příští technické kontroly."
        />

        <div className="calc-layout">
          <div className="calc-form">
            <div className="calc-field">
              <span className="calc-label">Typ vozidla</span>
              <div className="calc-types">
                {VEHICLE_TYPES.map((t) => (
                  <button
                    key={t.id}
                    className={`calc-type${t.id === typeId ? " is-active" : ""}`}
                    onClick={() => setTypeId(t.id)}
                    aria-pressed={t.id === typeId}
                  >
                    <span className="calc-type-label">{t.label}</span>
                    <span className="calc-type-note">{t.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-dates">
              <label className="calc-field">
                <span className="calc-label">Datum první registrace</span>
                <input
                  type="date"
                  className="input"
                  value={reg}
                  onChange={(e) => setReg(e.target.value)}
                  max={new Date().toISOString().slice(0, 10)}
                />
              </label>
              <label className="calc-field">
                <span className="calc-label">
                  Poslední STK <em>(pokud znáte – zpřesní výpočet)</em>
                </span>
                <input
                  type="date"
                  className="input"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  max={new Date().toISOString().slice(0, 10)}
                />
              </label>
            </div>

            <p className="calc-note">
              Výpočet je orientační ({type.first} roky od registrace, poté každé{" "}
              {type.next === 1 ? "1 rok" : `${type.next} roky`}). Rozhodující je datum na
              kontrolní nálepce a v protokolu.
            </p>
          </div>

          <div className="calc-result-wrap" aria-live="polite">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key={`${result.deadline.getTime()}-${result.status}`}
                  className={`calc-result calc-result--${result.status}`}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <div className="calc-result-label">
                    {result.status === "expired"
                      ? "Platnost STK pravděpodobně vypršela"
                      : "Příští STK nejpozději do"}
                  </div>
                  <div className="calc-result-date">{fmt.format(result.deadline)}</div>
                  <div className="calc-result-days">
                    {result.status === "expired"
                      ? `– termín uplynul před ${Math.abs(result.days)} dny. Objednejte se co nejdříve.`
                      : `zbývá ${result.days} dnů`}
                  </div>
                  <div className="calc-result-ctas">
                    <motion.a
                      href={CONTACT.phoneHref}
                      className="btn btn--primary"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <PhoneIcon size={15} /> Objednat termín
                    </motion.a>
                    <button className="btn btn--ghost" onClick={() => scrollToId("objednani")}>
                      Objednat online
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="calc-result calc-result--empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 3v4M16 3v4" />
                    <path d="M9 14.5l2 2 4-4.5" strokeWidth="1.8" />
                  </svg>
                  <p>Zadejte datum registrace nebo poslední kontroly a termín se objeví tady.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { PhoneIcon } from "./icons";
import { CONTACT } from "../data";
import { scrollToId, scrollToTop, setScrollPaused } from "../lib/smoothScroll";

const LINKS = [
  { id: "sluzby", label: "Služby" },
  { id: "prubeh", label: "Průběh" },
  { id: "cenik", label: "Ceník" },
  { id: "kalkulacka", label: "Kalkulačka" },
  { id: "recenze", label: "Recenze" },
  { id: "objednani", label: "Objednání" },
  { id: "kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();
  const burgerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 50)), [scrollY]);

  // Scrollspy – zvýrazní odkaz sekce, která je právě ve viewportu.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Zámek scrollu (nativního i Lenis), dokud je otevřené mobilní menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    setScrollPaused(open);
    return () => {
      document.body.style.overflow = "";
      setScrollPaused(false);
    };
  }, [open]);

  // Menu zavřeme, když viewport přeroste breakpoint (rotace tabletu apod.).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 881px)");
    const onChange = (e) => {
      if (e.matches) setOpen(false);
    };
    // starší Safari zná jen addListener/removeListener
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  // Základní správa fokusu dialogu: Escape zavírá, fokus jde do menu a zpět.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    menuRef.current?.querySelector("a, button")?.focus();
    const burger = burgerRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  const goMobile = (id) => {
    setOpen(false);
    // Počkáme na zavření overlaye a odemčení scrollu, pak posuneme.
    setTimeout(() => scrollToId(id), 380);
  };

  return (
    <>
      <motion.nav
        className={`nav${scrolled ? " nav--scrolled" : ""}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <button
          className="nav-logo"
          onClick={scrollToTop}
          aria-label="Autoservis Topinka – zpět na začátek stránky"
        >
          <span className="nav-logo-badge" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="nav-logo-text">
            Autoservis <em>Topinka</em>
            <small>STK & Emise · Plzeň</small>
          </span>
        </button>

        <div className="nav-links">
          {LINKS.map((l) => (
            <a
              key={l.id}
              className={`nav-link${active === l.id ? " nav-link--active" : ""}`}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <motion.a
            href={CONTACT.phoneHref}
            className="btn btn--primary btn--nav"
            aria-label={`Zavolat ${CONTACT.phone}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <PhoneIcon size={15} />
            <span className="nav-phone-num">{CONTACT.phone}</span>
          </motion.a>
          <button
            ref={burgerRef}
            className={`nav-burger${open ? " is-open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Hlavní menu"
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 34px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 34px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 34px)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu-links">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  className="mobile-menu-link"
                  onClick={() => goMobile(l.id)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mobile-menu-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.button>
              ))}
            </div>
            <motion.a
              href={CONTACT.phoneHref}
              className="btn btn--primary mobile-menu-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <PhoneIcon size={16} /> {CONTACT.phone}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

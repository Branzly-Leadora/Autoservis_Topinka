import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Magnetic, CountUp, EASE } from "./ui";
import { PhoneIcon, ArrowIcon, StarIcon } from "./icons";
import SmartImage from "./SmartImage";
import { CONTACT, ROTATING_WORDS, HERO_STATS, IMAGES } from "../data";

/** Síť částic na pozadí – jemně driftuje a reaguje na kurzor. */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf = null;
    let visible = true;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // na malých (typicky slabších) zařízeních méně částic kvůli plynulosti
      const cap = w < 700 ? 45 : 90;
      const count = Math.min(cap, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const step = () => {
      if (!visible) {
        raf = null;
        return;
      }
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // odpuzování od kurzoru
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const d = Math.sqrt(d2) || 1;
          p.x += (dx / d) * 0.6;
          p.y += (dy / d) * 0.6;
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(48,229,130,0.35)";
        ctx.fill();
      }

      // propojovací linky
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            const alpha = (1 - Math.sqrt(d2) / 110) * 0.14;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(48,229,130,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Kurzor sledujeme na celé hero sekci (obsah leží nad canvasem),
    // a smyčku pozastavíme, když hero odscrolluje z viewportu.
    const host = canvas.closest(".hero") || canvas.parentElement;
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && raf === null) raf = requestAnimationFrame(step);
      });
      io.observe(host);
    }

    resize();
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}

/** Rotující slovo v podtitulku. Čtečkám nabídne statický výčet. */
function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      if (document.hidden) return;
      setI((v) => (v + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <span className="sr-only">{ROTATING_WORDS.join(", ")}.</span>
      <span className="rotating-word" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {ROTATING_WORDS[i]}.
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const titleLine = (words, delayBase) =>
    words.map((w, i) => (
      <span className="word-mask" key={w + i}>
        <motion.span
          className="word"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.8, ease: EASE, delay: delayBase + i * 0.08 }}
        >
          {w}
        </motion.span>
      </span>
    ));

  return (
    <section className="hero" id="hero" ref={ref}>
      <motion.div className="hero-bg" style={{ y: bgY }} aria-hidden="true">
        <SmartImage className="hero-bg-photo" src={IMAGES.hero} alt="" fetchPriority="high" />
        <div className="hero-grid-lines" />
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
        <ParticleField />
        <div className="hero-scanline" />
        <div className="hero-vignette" />
      </motion.div>

      <motion.div className="hero-content" style={{ y: contentY, opacity }}>
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55, ease: EASE }}
        >
          <span className="hero-badge-dot" aria-hidden="true" />
          Stanice technické kontroly · Plzeň-Skvrňany
        </motion.div>

        <h1 className="hero-title">
          <span className="hero-title-line">{titleLine(["STK", "&", "EMISE"], 0.4)}</span>
          <span className="hero-title-line hero-title-line--accent">
            {titleLine(["BEZ", "STAROSTÍ."], 0.62)}
          </span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6, ease: EASE }}
        >
          Technická kontrola a měření emisí na jednom místě. Rychle, férově
          a s lidským přístupem – pro <RotatingWord />
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
        >
          <Magnetic>
            <motion.a
              href={CONTACT.phoneHref}
              className="btn btn--primary btn--lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <PhoneIcon size={17} /> Objednat termín
            </motion.a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <motion.a
              className="btn btn--ghost btn--lg"
              href="#cenik"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Prohlédnout ceník <ArrowIcon size={15} dir="down" />
            </motion.a>
          </Magnetic>
        </motion.div>

        <motion.div
          className="hero-trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <span className="hero-trust-item">
            <span className="stars" role="img" aria-label="5 hvězdiček">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} size={12} />
              ))}
            </span>
            4,9/5 Firmy.cz
          </span>
          <span className="hero-trust-sep" aria-hidden="true" />
          <span className="hero-trust-item">4,7/5 Google · 113 recenzí</span>
          <span className="hero-trust-sep" aria-hidden="true" />
          <span className="hero-trust-item">STK + emise při jedné návštěvě</span>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.7, ease: EASE }}
        >
          {HERO_STATS.map((s) => (
            <div className="hero-stat" key={s.label}>
              <div className="hero-stat-value">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        className="hero-scroll"
        href="#sluzby"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-label="Posunout na služby"
      >
        <motion.span
          className="hero-scroll-dot"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}

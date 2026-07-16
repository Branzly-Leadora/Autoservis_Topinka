import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 42, filter: "blur(6px)" },
  // custom = zpoždění v sekundách
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

/** Blok, který se animovaně odhalí při najetí do viewportu. */
export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Kontejner, jehož potomci (variants=fadeUp) nabíhají postupně. */
export function Stagger({ children, className = "", gap = 0.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: gap } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Jednotná hlavička sekce: štítek + titulek + perex. */
export function SectionHead({ label, title, perex, center = false }) {
  return (
    <Reveal className={`section-head${center ? " section-head--center" : ""}`}>
      <div className="section-label">
        <span className="section-label-line" />
        {label}
      </div>
      <h2 className="section-title">{title}</h2>
      {perex && <p className="section-perex">{perex}</p>}
    </Reveal>
  );
}

/** Tlačítko, které se magneticky přitahuje ke kurzoru. */
export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}

/** 3D karta natáčející se za kurzorem, s posuvným odleskem. */
export function TiltCard({ children, className = "", max = 8 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Číslo, které se napočítá při vjezdu do viewportu. */
export function CountUp({ value, decimals = 0, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value.toLocaleString("cs-CZ", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) =>
        setDisplay(
          v.toLocaleString("cs-CZ", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        ),
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration, reduced]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/** Zaškrtávací fajfka kreslená tahem (SVG stroke). */
export function DrawnCheck({ size = 22, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="drawn-check"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10.5"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.6"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay }}
      />
      <motion.path
        d="M7 12.4l3.2 3.2L17 9"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.35 }}
      />
    </svg>
  );
}

/** Parallax obal – posouvá obsah podle scrollu (jemný efekt hloubky). */
export function Parallax({ children, range = 40, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const reduced = useReducedMotion();
  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

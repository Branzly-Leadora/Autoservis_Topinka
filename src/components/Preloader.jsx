import { motion } from "framer-motion";

/** Úvodní obrazovka: nakreslí fajfku v kolečku, odhalí logo a odjede nahoru. */
export default function Preloader() {
  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      aria-hidden="true"
    >
      <div className="preloader-inner">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <motion.circle
            cx="36"
            cy="36"
            r="31"
            stroke="var(--green)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          <motion.path
            d="M22 37.5l9.5 9.5L50 26"
            stroke="var(--green)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.85 }}
          />
        </svg>
        <div className="preloader-brand">
          {"AUTOSERVIS TOPINKA".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.035, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="preloader-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        >
          STK & Emise · Plzeň
        </motion.div>
      </div>
    </motion.div>
  );
}

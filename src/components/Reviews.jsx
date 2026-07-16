import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, Reveal, EASE } from "./ui";
import { StarIcon, ArrowIcon } from "./icons";
import { REVIEWS, RATINGS, CONTACT } from "../data";

const AUTOPLAY_MS = 5200;

// Směr průjezdu slidu řídí `custom` – díky variantám platí i pro exit.
const slideVariants = {
  enter: (d) => ({ opacity: 0, x: d * 70 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d * -70 }),
};

/** Karusel recenzí – automaticky rotuje, dá se přetahovat i klikat. */
export default function Reviews() {
  const [[index, dir], setIndex] = useState([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((delta) => {
    setIndex(([i]) => [(i + delta + REVIEWS.length) % REVIEWS.length, delta > 0 ? 1 : -1]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      go(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  const review = REVIEWS[index];

  return (
    <section className="section section--reviews" id="recenze">
      <div className="container">
        <SectionHead
          label="Recenze"
          title={
            <>
              Řidiči nám <span className="accent">věří.</span>
            </>
          }
        />

        <Reveal className="ratings-row">
          {RATINGS.map((r) => (
            <div className="rating-block" key={r.source}>
              <div className="rating-score">{r.score}</div>
              <div>
                <div className="rating-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} size={13} />
                  ))}
                </div>
                <div className="rating-source">{r.source}</div>
              </div>
            </div>
          ))}
        </Reveal>

        <div
          className="reviews-carousel"
          role="group"
          aria-roledescription="karusel"
          aria-label="Recenze zákazníků"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="reviews-quote-mark" aria-hidden="true">
            „
          </div>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              className="review-slide"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <div className="review-stars" role="img" aria-label={`${review.stars} z 5 hvězdiček`}>
                {Array.from({ length: review.stars }, (_, i) => (
                  <StarIcon key={i} size={15} />
                ))}
              </div>
              <blockquote className="review-text">{review.text}</blockquote>
              <figcaption className="review-author">{review.name}</figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="reviews-nav">
            <button className="reviews-arrow" onClick={() => go(-1)} aria-label="Předchozí recenze">
              <ArrowIcon dir="left" size={16} />
            </button>
            <div className="reviews-dots">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  className={`reviews-dot${i === index ? " is-active" : ""}`}
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  aria-label={`Recenze ${i + 1} z ${REVIEWS.length}`}
                  aria-current={i === index ? "true" : undefined}
                />
              ))}
            </div>
            <button className="reviews-arrow" onClick={() => go(1)} aria-label="Další recenze">
              <ArrowIcon dir="right" size={16} />
            </button>
          </div>
        </div>

        <Reveal className="reviews-link" delay={0.1}>
          <a href={CONTACT.firmyUrl} target="_blank" rel="noreferrer">
            Přečíst všechny recenze na Firmy.cz <ArrowIcon size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

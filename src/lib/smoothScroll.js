import Lenis from "lenis";

// Jediná sdílená instance Lenis pro celý web.
let lenis = null;

const NAV_OFFSET = -84; // výška fixní navigace + rezerva

/**
 * Nastartuje Lenis smooth scroll a zachytávání kotevních odkazů.
 * Běží na všech zařízeních – kolečko myši, trackpad i dotyk (syncTouch).
 * Vrací cleanup funkci.
 */
export function initSmoothScroll() {
  if (lenis) return () => {};

  try {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // plynulý scroll i na dotykových zařízeních (mobil, tablet)
      syncTouch: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      gestureOrientation: "vertical",
    });
  } catch {
    lenis = null;
    return () => {};
  }

  let rafId = requestAnimationFrame(function raf(time) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  });

  // Kotevní odkazy (#sekce) posouváme přes Lenis místo nativního skoku.
  const onClick = (e) => {
    const anchor = e.target.closest?.('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute("href").slice(1);
    const el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    lenis?.scrollTo(el, { offset: NAV_OFFSET });
  };
  document.addEventListener("click", onClick);

  return () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener("click", onClick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Plynulý posun na sekci podle id (s fallbackem bez Lenis). */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
  else el.scrollIntoView({ behavior: "smooth" });
}

/** Plynulý posun na začátek stránky. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Pozastavení scrollu (otevřené mobilní menu apod.). */
export function setScrollPaused(paused) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}

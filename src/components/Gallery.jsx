import { motion } from "framer-motion";
import { SectionHead, Stagger, Parallax, fadeUp } from "./ui";
import { GALLERY } from "../data";

/** Fotogalerie stanice – parallax posuny a zoom s popiskem na hover. */
export default function Gallery() {
  return (
    <section className="section section--gallery" id="galerie">
      <div className="container">
        <SectionHead
          label="Nahlédněte k nám"
          title={
            <>
              Poznejte prostředí, <span className="accent">kterému můžete věřit.</span>
            </>
          }
          perex="Žádná anonymní hala. Přehledné zázemí, moderní technika a lidé, kteří vám všechno rádi ukážou a vysvětlí."
        />

        <Stagger className="gallery-grid" gap={0.12}>
          {GALLERY.map((photo, i) => (
            <motion.div variants={fadeUp} key={photo.src} className={`gallery-cell gallery-cell--${i}`}>
              <Parallax range={i === 1 ? 30 : 16}>
                <figure className="gallery-item">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption className="gallery-caption">
                    <span className="gallery-caption-line" aria-hidden="true" />
                    {photo.caption}
                  </figcaption>
                </figure>
              </Parallax>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

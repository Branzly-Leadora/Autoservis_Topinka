import { MARQUEE_ITEMS } from "../data";

/** Nekonečný běžící pás s výčtem kontrolovaných vozidel. */
export default function Marquee() {
  const strip = (ariaHidden) => (
    <div className="marquee-strip" aria-hidden={ariaHidden}>
      {MARQUEE_ITEMS.map((item) => (
        <span className="marquee-item" key={item + ariaHidden}>
          {item}
          <span className="marquee-star" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" role="marquee" aria-label={MARQUEE_ITEMS.join(", ")}>
      <div className="marquee-track">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}

import { useState } from "react";

const FALLBACK = `${process.env.PUBLIC_URL || ""}/img/photo-fallback.svg`;

/**
 * Obrázek, který se nikdy „nerozbije": při chybě načítání se okamžitě
 * nahradí lokální grafikou ve stylu webu (žádná závislost na externí síti).
 */
export default function SmartImage({ src, alt = "", className = "", ...rest }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? FALLBACK : src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      decoding="async"
      {...rest}
    />
  );
}

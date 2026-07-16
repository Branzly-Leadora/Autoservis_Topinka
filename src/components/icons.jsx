// Jednoduché tahové ikony služeb – kreslené čárou, ladí s tmavým designem.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ServiceIcon({ name, size = 34 }) {
  const p = { ...base, width: size, height: size, viewBox: "0 0 48 48", "aria-hidden": true };
  switch (name) {
    case "car":
      return (
        <svg {...p}>
          <path d="M8 28l3-9c.6-1.8 2.3-3 4.2-3h17.6c1.9 0 3.6 1.2 4.2 3l3 9" />
          <path d="M6 28h36v8a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2H13v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-8z" />
          <circle cx="14" cy="32" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="34" cy="32" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "smoke":
      return (
        <svg {...p}>
          <path d="M10 38h20" />
          <path d="M14 38v-8a6 6 0 016-6h0a6 6 0 016 6v8" />
          <path d="M20 18c0-3 2-4 2-6s-2-3-2-5" />
          <path d="M27 20c0-2.4 1.6-3.2 1.6-4.8S27 12.6 27 11" />
          <path d="M34 30h6M34 34h6" />
        </svg>
      );
    case "moto":
      return (
        <svg {...p}>
          <circle cx="12" cy="32" r="6" />
          <circle cx="36" cy="32" r="6" />
          <path d="M12 32l6-12h8l4 6h-9" />
          <path d="M30 26l6 6" />
          <path d="M24 14h5l2 4" />
        </svg>
      );
    case "trailer":
      return (
        <svg {...p}>
          <rect x="8" y="16" width="24" height="14" rx="2" />
          <path d="M32 26h10" />
          <circle cx="42" cy="26" r="2" />
          <circle cx="20" cy="34" r="4" />
        </svg>
      );
    case "doc":
      return (
        <svg {...p}>
          <path d="M14 6h14l8 8v26a2 2 0 01-2 2H14a2 2 0 01-2-2V8a2 2 0 012-2z" />
          <path d="M28 6v8h8" />
          <path d="M18 24h12M18 30h12M18 36h7" />
        </svg>
      );
    case "redo":
      return (
        <svg {...p}>
          <path d="M38 20a15 15 0 10 2 10" />
          <path d="M40 10v10H30" />
          <path d="M19 25l4 4 7-8" />
        </svg>
      );
    default:
      return null;
  }
}

export function PhoneIcon({ size = 16 }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.13.96.36 1.9.7 2.8a2 2 0 01-.45 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0122 16.9z" />
    </svg>
  );
}

export function PinIcon({ size = 16 }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon({ size = 16 }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function StarIcon({ size = 14, filled = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
    </svg>
  );
}

export function ArrowIcon({ size = 16, dir = "right" }) {
  const rot = { right: 0, up: -90, down: 90, left: 180 }[dir] ?? 0;
  return (
    <svg
      {...base}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rot}deg)` }}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

import type { Shape } from "@/lib/products";

// Placeholder product illustration (SVG). Swap for real product photos before launch.
type Props = { shape: Shape; glass?: string; cap?: string; title?: string; className?: string };

export default function BottleArt({ shape, glass = "#e9dfd0", cap = "#1f1b16", title, className }: Props) {
  const id = `g-${shape}-${glass.replace("#", "")}-${cap.replace("#", "")}`;
  return (
    <svg
      viewBox="0 0 120 160"
      role="img"
      aria-label={title ?? "Product illustration"}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" x2="1">
          <stop offset="0" stopColor={glass} stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.6" stopColor={glass} stopOpacity="0.9" />
          <stop offset="1" stopColor={glass} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop offset="0" stopColor={cap} />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.55" stopColor={cap} />
          <stop offset="1" stopColor={cap} />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="150" rx="34" ry="4" fill="#000" opacity="0.08" />
      {renderShape(shape, `url(#${id}-glass)`, `url(#${id}-cap)`, glass)}
    </svg>
  );
}

function renderShape(shape: Shape, g: string, c: string, raw: string) {
  const stroke = { stroke: "#00000022", strokeWidth: 1 };
  const liquid = { fill: raw, opacity: 0.55 };
  switch (shape) {
    case "round":
      return (
        <>
          <rect x="50" y="22" width="20" height="26" rx="4" fill={c} />
          <rect x="54" y="46" width="12" height="10" fill="#bdbdbd" />
          <circle cx="60" cy="102" r="44" fill={g} {...stroke} />
          <path d="M20 112 a44 44 0 0 0 80 0 z" {...liquid} />
          <path d="M34 82 q6 -14 20 -18" stroke="#fff" strokeWidth="4" fill="none" opacity="0.7" strokeLinecap="round" />
        </>
      );
    case "square":
      return (
        <>
          <rect x="44" y="14" width="32" height="30" rx="3" fill={c} />
          <rect x="52" y="42" width="16" height="12" fill="#c9c9c9" />
          <rect x="22" y="54" width="76" height="92" rx="8" fill={g} {...stroke} />
          <rect x="22" y="96" width="76" height="50" rx="8" {...liquid} />
          <rect x="30" y="62" width="6" height="74" rx="3" fill="#fff" opacity="0.6" />
          <rect x="22" y="132" width="76" height="14" rx="6" fill="#fff" opacity="0.25" />
        </>
      );
    case "tall":
      return (
        <>
          <rect x="47" y="6" width="26" height="32" rx="3" fill={c} />
          <rect x="53" y="36" width="14" height="10" fill="#c9c9c9" />
          <rect x="36" y="46" width="48" height="100" rx="5" fill={g} {...stroke} />
          <rect x="36" y="84" width="48" height="62" rx="5" {...liquid} />
          <rect x="42" y="54" width="5" height="84" rx="2.5" fill="#fff" opacity="0.6" />
        </>
      );
    case "flask":
      return (
        <>
          <rect x="48" y="16" width="24" height="30" rx="6" fill={c} />
          <rect x="53" y="44" width="14" height="10" fill="#c9c9c9" />
          <path d="M30 60 q30 -12 60 0 l6 74 q-36 16 -72 0 z" fill={g} {...stroke} />
          <path d="M28 98 q32 -6 64 0 l4 36 q-36 16 -72 0 z" {...liquid} />
          <path d="M38 70 l-3 56" stroke="#fff" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
        </>
      );
    case "rollon":
      return (
        <>
          <rect x="44" y="18" width="32" height="44" rx="5" fill={c} />
          <rect x="44" y="56" width="32" height="6" fill="#000" opacity="0.15" />
          <path d="M42 64 h36 v74 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8 z" fill={g} {...stroke} />
          <path d="M42 96 h36 v42 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8 z" {...liquid} />
          <rect x="48" y="70" width="4" height="66" rx="2" fill="#fff" opacity="0.6" />
        </>
      );
    case "diffuser":
      return (
        <>
          {[-14, -6, 2, 10, 18].map((dx, i) => (
            <line key={i} x1={58 + dx / 3} y1="70" x2={60 + dx * 2} y2={8 + (i % 2) * 6} stroke="#8a6a3a" strokeWidth="2" strokeLinecap="round" />
          ))}
          <rect x="50" y="62" width="20" height="10" rx="2" fill={c} />
          <rect x="28" y="72" width="64" height="74" rx="10" fill={g} {...stroke} />
          <rect x="28" y="104" width="64" height="42" rx="10" {...liquid} />
          <rect x="35" y="80" width="5" height="58" rx="2.5" fill="#fff" opacity="0.6" />
        </>
      );
    case "atomizer":
      return (
        <>
          <rect x="50" y="10" width="20" height="18" rx="4" fill={c} />
          <rect x="44" y="28" width="32" height="118" rx="16" fill={c} />
          <rect x="44" y="28" width="32" height="118" rx="16" fill={g} opacity="0.45" />
          <rect x="52" y="60" width="16" height="50" rx="8" fill="#fff" opacity="0.5" />
          <rect x="49" y="36" width="4" height="100" rx="2" fill="#fff" opacity="0.5" />
        </>
      );
    case "cap":
      return (
        <>
          <rect x="34" y="40" width="52" height="56" rx="6" fill={c} {...stroke} />
          <rect x="40" y="46" width="6" height="44" rx="3" fill="#fff" opacity="0.5" />
          <rect x="46" y="96" width="28" height="14" fill="#c9c9c9" />
          <rect x="42" y="108" width="36" height="8" rx="2" fill="#a9a9a9" />
          <line x1="60" y1="116" x2="60" y2="146" stroke="#9a9a9a" strokeWidth="2" />
        </>
      );
    case "box":
      return (
        <>
          <path d="M20 54 l40 -18 l40 18 l-40 18 z" fill={raw} opacity="0.9" />
          <path d="M20 54 l40 18 v74 l-40 -18 z" fill={raw} />
          <path d="M100 54 l-40 18 v74 l40 -18 z" fill={raw} />
          <path d="M100 54 l-40 18 v74 l40 -18 z" fill="#000" opacity="0.18" />
          <path d="M20 54 l40 -18 l40 18 l-40 18 z" fill="#fff" opacity="0.15" />
          <path d="M28 82 l24 11" stroke={c.startsWith("url") ? "#c8a96a" : c} strokeWidth="3" />
          <text x="40" y="112" fontSize="9" fontFamily="serif" fill="#c8a96a" transform="skewY(24) translate(0,-44)">
            GITA
          </text>
        </>
      );
  }
}

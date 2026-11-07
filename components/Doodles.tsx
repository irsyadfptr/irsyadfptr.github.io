// Comic doodles as inline SVG. Stroked paths use pathLength=1 so `.draw` can animate them in.
type P = { className?: string };
const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

/* the comic "POW" burst; fill it with a [&_path]:fill-* class */
export const Burst = ({ className }: P) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <path pathLength={1} {...stroke} strokeWidth={4}
      d="M100 8l16 42 38-26-10 44 46-6-34 32 40 22-46 8 22 40-42-18-6 46-26-38-30 34-2-46-44 14 26-38-42-18 46-12-28-36 44 6-6-46 36 28z" />
  </svg>
);

export const Zap = ({ className }: P) => (
  <svg viewBox="0 0 48 64" className={className} aria-hidden="true">
    <path pathLength={1} {...stroke} strokeWidth={3.5} d="M30 3L6 36h16l-6 25 26-36H26z" />
  </svg>
);

/* speed lines that fan out from a corner */
export const ActionLines = ({ className }: P) => (
  <svg viewBox="0 0 100 80" className={className} aria-hidden="true">
    <path pathLength={1} {...stroke} strokeWidth={4} d="M8 72L44 44M4 46l38-6M24 76l26-30M60 6L50 34M86 12L58 38" />
  </svg>
);

export const Speech = ({ className, children }: P & { children?: React.ReactNode }) => (
  <span className={`relative inline-block ${className ?? ''}`}>
    <svg viewBox="0 0 200 110" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
      <path {...stroke} strokeWidth={3.5} fill="var(--color-paper)" vectorEffect="non-scaling-stroke"
        d="M20 6h160c8 0 14 6 14 14v50c0 8-6 14-14 14H70l-34 22 8-22H20c-8 0-14-6-14-14V20c0-8 6-14 14-14z" />
    </svg>
    <span className="relative block px-5 pt-2 pb-6">{children}</span>
  </span>
);

/* thick brush stroke under a word */
export const Underline = ({ className }: P) => (
  <svg viewBox="0 0 300 24" preserveAspectRatio="none" className={className} aria-hidden="true">
    <path pathLength={1} {...stroke} strokeWidth={12} strokeLinecap="square" d="M4 14c80-6 170-8 292-3" />
  </svg>
);

/* loose marker circle around a word */
export const Circle = ({ className }: P) => (
  <svg viewBox="0 0 220 90" preserveAspectRatio="none" className={className} aria-hidden="true">
    <path pathLength={1} {...stroke} strokeWidth={4} d="M150 8C95 2 25 10 9 38c-14 26 40 46 105 44 62-2 105-18 100-44-4-22-50-33-120-27" />
  </svg>
);

export const Arrow = ({ className }: P) => (
  <svg viewBox="0 0 120 90" className={className} aria-hidden="true">
    <path pathLength={1} {...stroke} strokeWidth={4} d="M6 10c30-6 70 2 88 30 7 11 9 24 7 38M88 66l13 14 12-17" />
  </svg>
);

/* a four-point comic sparkle; fill it with a [&_path]:fill-* class */
export const Spark = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path pathLength={1} {...stroke} strokeWidth={3} d="M24 3l5 15 16 6-16 6-5 15-5-15-16-6 16-6z" />
  </svg>
);

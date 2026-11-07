// A game-style "player stats" panel. Levels are self-rated out of 10; no client or project details.
const stats = [
  ['React / Next.js', 10, 'bg-blue'],
  ['TypeScript', 9, 'bg-cyan'],
  ['Testing · Playwright, Cypress', 8, 'bg-red'],
  ['3D & motion · Three.js, GSAP', 7, 'bg-yellow'],
  ['AI · LangChain, RAG', 6, 'bg-ink'],
] as const;

export function StatsCard({ className = '', open = true }: { className?: string; open?: boolean }) {
  return (
    <section data-open={open} aria-label="Skill levels, self-rated out of 10" className={`stats panel relative bg-paper p-4 shadow-sticker ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b-[3px] border-ink pb-3">
        <p className="font-comic text-2xl tracking-wide">Player stats</p>
        <p className="-rotate-2 bg-ink px-2 font-comic text-lg tracking-wide text-yellow">Lvl 5 · Senior frontend</p>
      </div>
      <dl className="mt-3 space-y-2">
        {stats.map(([label, level, color], row) => (
          <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 sm:grid-cols-[12rem_minmax(0,1fr)_auto]">
            <dt className="col-span-2 text-sm font-extrabold uppercase sm:col-span-1">{label}</dt>
            <dd className="flex gap-1" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} style={{ '--d': `${row * 90 + i * 40}ms` } as React.CSSProperties}
                  className={`seg h-3 flex-1 border-2 border-ink ${i < level ? color : 'bg-paper-2'}`} />
              ))}
            </dd>
            <dd className="w-10 text-right font-display text-sm">{level}/10</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// One line for recruiters, as a comic narration box: yellow caption, ink frame, lettering and a pulsing "on air" dot.
export function StatusTag({ className = '' }: { className?: string }) {
  return (
    <p className={`relative inline-flex -rotate-2 items-center gap-3 border-[3px] border-ink bg-yellow py-1.5 pr-4 pl-3 font-comic text-2xl leading-none tracking-wide shadow-sticker ${className}`}>
      <span className="relative flex size-3.5" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#22c55e] opacity-70" />
        <span className="relative size-3.5 rounded-full border-2 border-ink bg-[#22c55e]" />
      </span>
      <span>
        Available! <span className="text-red">&mdash;</span> remote &amp; relocation
      </span>
      <span aria-hidden="true" className="absolute -top-3 -right-3 rotate-12 border-2 border-ink bg-red px-1.5 font-display text-[10px] leading-4 tracking-wider text-paper">
        HIRE ME
      </span>
    </p>
  );
}

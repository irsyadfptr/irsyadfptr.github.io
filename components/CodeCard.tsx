'use client';

import { useEffect, useState } from 'react';

// A doodled editor window: the marker moves through the changed lines, the note names each change.
const lines: { code: React.ReactNode; note?: string }[] = [
  { code: <><K>export function</K> <F>lookAt</F>(eye, pointer) {'{'}</> },
  { code: <>  <K>const</K> dx = <F>clamp</F>((pointer.x - eye.x) / <N>260</N>);</>, note: 'How far the cursor is, capped' },
  { code: <>  <K>const</K> dy = <F>clamp</F>((pointer.y - eye.y) / <N>260</N>);</> },
  { code: <>  <K>const</K> facing = <F>cos</F>(avatar.turn) &gt; <N>0</N> ? <N>1</N> : <N>-1</N>;</>, note: 'Mirrored when he faces away' },
  { code: <>  <K>return</K> {'{'} x: dx * <N>5</N> * facing, y: dy * <N>3</N> {'}'};</>, note: 'Pupils slide, never leave the lid' },
  { code: <>{'}'}</> },
];
const marked = lines.flatMap((l, i) => (l.note ? [i] : []));

function K({ children }: { children: React.ReactNode }) { return <span className="text-blue">{children}</span>; }
function F({ children }: { children: React.ReactNode }) { return <span className="text-red">{children}</span>; }
function N({ children }: { children: React.ReactNode }) { return <span className="text-[#b45309]">{children}</span>; }

export function CodeCard() {
  const [step, setStep] = useState(marked.length - 1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setStep((s) => (s + 1) % marked.length), 2800);
    return () => clearInterval(t);
  }, [paused]);

  const active = marked[step];
  return (
    <div
      className="panel relative overflow-hidden bg-paper shadow-sticker-lg"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-2 border-b-[3px] border-ink px-4 py-3">
        <span className="size-3 rounded-full border-2 border-ink bg-red" />
        <span className="size-3 rounded-full border-2 border-ink bg-yellow" />
        <span className="size-3 rounded-full border-2 border-ink bg-cyan" />
        <span className="ml-3 font-mono text-sm">eyes.ts</span>
        <span className="ml-auto rotate-3 border-2 border-ink bg-yellow px-2 font-comic text-lg leading-6 tracking-wide">1 fix!</span>
      </div>
      <pre className="overflow-x-auto px-2 py-4 font-mono text-[13px] leading-7 sm:text-sm">
        <code>
          {lines.map((l, i) => (
            <span key={i} className={`relative block rounded px-2 transition-colors duration-300 ${i === active ? 'bg-yellow' : ''}`}>
              <span className="mr-4 inline-block w-5 text-right text-muted select-none">{i + 4}</span>
              {l.code}
            </span>
          ))}
        </code>
      </pre>
      <p className="flex items-center gap-2 border-t-[3px] border-ink px-5 py-3 font-comic text-2xl tracking-wide">
        <span aria-hidden="true">✎</span> {lines[active].note}
      </p>
    </div>
  );
}

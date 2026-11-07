import Image from 'next/image';
import { stack } from '@/lib/content';
import { ActionLines } from '../Doodles';

const ROT = [-6, 4, -3, 7, -5, 2, 6, -4];
const BG = ['bg-paper', 'bg-yellow', 'bg-paper', 'bg-cyan/40', 'bg-paper', 'bg-red/20', 'bg-paper', 'bg-blue/15'];

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-h" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div data-speed="-0.2" aria-hidden="true" className="halftone absolute top-0 right-0 size-[380px] text-cyan/70 [--at:100%_0%]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="-rotate-1 font-comic text-3xl tracking-wide text-red">My sticker collection!</p>
        <div className="flex items-end gap-4">
          <h2 id="stack-h" className="mt-1 font-display text-5xl tracking-tight uppercase sm:text-6xl">Tools I build with</h2>
          <ActionLines className="draw mb-2 hidden w-16 text-ink sm:block" />
        </div>

        <ul className="mt-14 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
          {stack.map(([icon, label], i) => (
            <li key={icon} data-speed={i % 2 ? '0.06' : '-0.06'} className="flex justify-center">
              <div data-reveal style={{ '--r': `${ROT[i % ROT.length]}deg` } as React.CSSProperties}
                className={`panel grid aspect-square w-full max-w-28 place-items-center gap-1 p-3 shadow-sticker [rotate:var(--r)] hover:animate-[wiggle_.45s_ease-in-out] ${BG[i % BG.length]}`}>
                <Image src={`/icons/${icon}.svg`} alt="" width={44} height={44} className="size-10 object-contain sm:size-11" />
                <span className="text-center text-xs leading-tight font-extrabold uppercase sm:text-[13px]">{label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

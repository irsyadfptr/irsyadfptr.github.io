import { work } from '@/lib/content';
import { CodeCard } from '../CodeCard';
import { Circle, Zap } from '../Doodles';

const tilt = ['-rotate-1', 'rotate-1', 'rotate-[1.5deg]', '-rotate-[1.5deg]', 'rotate-[0.5deg]'];

export function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div data-speed="-0.2" aria-hidden="true" className="halftone absolute top-10 right-0 size-[360px] text-blue/40 [--at:100%_0%]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="-rotate-2 font-comic text-3xl tracking-wide text-red">Stuff I&rsquo;ve shipped!</p>
        <h2 id="work-h" className="mt-1 font-display text-5xl tracking-tight uppercase sm:text-6xl">
          Selected{' '}
          <span className="relative inline-block px-2">
            work
            <Circle className="draw absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] text-red" />
          </span>
        </h2>
        <p className="mt-4 max-w-xl text-lg font-medium text-muted">Production React and Next.js work, from a retail loyalty back-office to an NFT marketplace and a browser game.</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            {work.map((w, i) => (
              <li key={w.title} data-reveal className={`panel relative sm:[&:last-child:nth-child(odd)]:col-span-2 bg-paper p-6 pt-9 shadow-sticker transition-[rotate,translate] duration-200 hover:-translate-y-1 hover:rotate-0 ${tilt[i]}`}>
                {/* the caption box, like a comic panel's narration */}
                <span className={`absolute -top-4 left-4 -rotate-2 border-[3px] border-ink px-3 font-comic text-xl leading-7 tracking-wide ${w.color}`}>
                  {w.note}
                </span>
                <h3 className="font-display text-xl leading-tight uppercase">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{w.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
                  {w.tags.map((t) => (
                    <li key={t} className="border-2 border-ink bg-paper-2 px-2 py-0.5 text-sm font-bold uppercase">{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="relative lg:col-span-5">
            <div data-speed="-0.08">
              <CodeCard />
              <p className="mt-6 rotate-1 text-center font-comic text-2xl tracking-wide">A bit of the avatar&rsquo;s eye tracking</p>
            </div>
            <Zap className="draw absolute -top-8 -right-3 h-14 w-10 text-ink [&_path]:fill-yellow" />
          </div>
        </div>
      </div>
    </section>
  );
}

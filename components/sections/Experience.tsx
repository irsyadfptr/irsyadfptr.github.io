import Image from 'next/image';
import { experience } from '@/lib/content';
import { Spark } from '../Doodles';

// a jagged line down the timeline; Motion draws it as you scroll through the section
const PATH = 'M20 0 L 32 90 L 8 180 L 32 270 L 8 360 L 32 450 L 8 540 L 32 630 L 8 720 L 32 810 L 8 900 L 20 1000';
const FILLS = ['[&_path]:fill-yellow', '[&_path]:fill-red', '[&_path]:fill-blue', '[&_path]:fill-cyan'];

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-h" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div data-speed="-0.25" aria-hidden="true" className="halftone absolute bottom-0 left-0 size-[420px] text-yellow [--at:0%_100%]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="rotate-1 font-comic text-3xl tracking-wide text-blue">Five years and counting!</p>
        <h2 id="experience-h" className="mt-1 font-display text-5xl tracking-tight uppercase sm:text-6xl">Experience since 2021</h2>

        <div className="relative mt-16">
          <svg viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true"
            className="absolute top-0 left-5 h-full w-10 -translate-x-1/2 text-ink lg:left-1/2">
            <path d={PATH} className="opacity-15" fill="none" stroke="currentColor" strokeWidth={4} strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
            <path data-path d={PATH} pathLength={1} fill="none" stroke="currentColor" strokeWidth={4} strokeLinejoin="round" vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: 1 }} />
          </svg>

          <ol className="relative space-y-10 lg:space-y-4">
            {experience.map((e, i) => {
              const right = i % 2 === 1;
              return (
                <li key={e.role + e.dates} className="relative grid pl-14 lg:grid-cols-2 lg:pl-0">
                  <Spark className={`absolute top-6 left-5 z-10 size-8 -translate-x-1/2 text-ink lg:left-1/2 ${FILLS[i % FILLS.length]}`} />
                  <article data-reveal
                    className={`panel bg-paper p-6 shadow-sticker lg:w-[88%] ${right ? 'lg:col-start-2 lg:ml-auto lg:rotate-1' : 'lg:-rotate-1'}`}>
                    <div className="flex items-center gap-4">
                      <Image src={e.logo} alt={`${e.company} logo`} width={52} height={52} className="size-13 shrink-0 rounded-md border-[3px] border-ink object-cover" />
                      <div>
                        <h3 className="font-display text-lg leading-tight uppercase">{e.role}</h3>
                        <p className="font-bold text-muted">{e.company}</p>
                      </div>
                    </div>
                    <p className="mt-4 leading-relaxed">{e.body}</p>
                    <p className="mt-4 inline-block -rotate-2 bg-ink px-2 font-comic text-xl tracking-wide text-yellow">{e.dates}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

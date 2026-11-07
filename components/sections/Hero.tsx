import { EMAIL, roles } from '@/lib/content';
import { HeroStage } from '../HeroStage';
import { ActionLines, Speech, Zap } from '../Doodles';
import { StatusTag } from '../StatsCard';
import { Typed } from '../Typed';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-h" className="relative overflow-hidden border-b-[3px] border-ink px-5 pt-28 sm:px-8 lg:h-svh lg:min-h-[760px] lg:pt-32">
      {/* parallax layers: halftone and doodles move at different scroll speeds and pointer depths */}
      <div aria-hidden="true">
        <div data-speed="-0.15" className="halftone absolute -top-10 -left-10 size-[420px] text-yellow [--at:0%_0%]" />
        <div data-speed="-0.3" className="halftone absolute right-0 bottom-0 size-[520px] text-red/60 [--at:100%_100%]" />
        <div data-speed="-0.5" data-depth="24" className="absolute top-[16%] right-[4%]"><Zap className="draw h-14 w-10 text-ink [&_path]:fill-yellow" /></div>
        <div data-speed="-0.2" data-depth="-16" className="absolute top-[70%] left-[2%] hidden sm:block"><ActionLines className="draw w-24 text-ink" /></div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="lg:w-[46%]">
          <Speech className="mb-4 -rotate-3 font-comic text-3xl tracking-wide">Hey there!</Speech>
          <h1 id="hero-h" className="font-display text-[clamp(2.1rem,3.5vw,3.1rem)] leading-[1.02] tracking-tight uppercase">
            Hi, I&rsquo;m Putranto,
            <br />
            {/* a long role wraps onto a second line instead of running into the avatar; two lines are reserved so nothing jumps */}
            <span className="block min-h-[2.04em] text-blue">
              <span className="box-decoration-clone bg-[linear-gradient(transparent_64%,var(--color-yellow)_64%,var(--color-yellow)_90%,transparent_90%)]">
                <Typed words={roles} />
              </span>
            </span>
            <span className="sr-only"> a senior frontend engineer</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed font-medium text-muted sm:text-xl">
            I&rsquo;m Irsyad Fakhri Putranto, a senior frontend engineer at SG-EDTS in Jakarta. Five years of React and Next.js, from a
            loyalty app back-office with 10M+ downloads to enterprise web platforms.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={EMAIL} className="sticker-btn rounded-md bg-red px-7 py-3 font-display text-lg text-paper uppercase">Email me</a>
            <a href="#experience" className="sticker-btn rounded-md bg-paper px-7 py-3 font-display text-lg uppercase">See my experience</a>
          </div>
        </div>
      </div>

      {/* desktop: the status caption sits in the hero's bottom-left corner, on the content's left line */}
      <div className="relative z-[2] mx-auto mt-8 max-w-6xl lg:absolute lg:bottom-12 lg:left-[max(2rem,calc(50%-36rem))] lg:m-0">
        <StatusTag />
      </div>

      <HeroStage />
    </section>
  );
}

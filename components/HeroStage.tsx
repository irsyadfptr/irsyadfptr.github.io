'use client';

import { useState } from 'react';
import { Avatar3D } from './avatar/Avatar3D';
import { Arrow, Burst } from './Doodles';
import { StatsCard } from './StatsCard';

/**
 * The avatar column of the hero. On desktop the stats card waits behind a "show my stats" button and pops in,
 * with a POW, when the avatar (or the button) is clicked; the tool stickers fly off at the same moment.
 * On phones the card is always shown, in the page flow.
 */
export function HeroStage() {
  const [open, setOpen] = useState(false);
  const [pows, setPows] = useState(0); // remounts the POW so it plays on every open

  const show = () => { setOpen(true); setPows((n) => n + 1); };

  return (
    <>
      {/* desktop: shares the avatar's column, so the card's centre lines up with the avatar's */}
      <div className="relative mx-auto mt-12 max-w-lg lg:absolute lg:top-32 lg:right-[3%] lg:z-[2] lg:mt-0 lg:flex lg:w-[48%] lg:max-w-none lg:justify-center">
        <div className="relative">
          {open && (
            <Burst key={pows} className="pointer-events-none absolute -inset-10 hidden size-[calc(100%+5rem)] animate-[pow_.6s_ease-out_forwards] text-ink lg:block [&_path]:fill-yellow" />
          )}
          <StatsCard
            open={open}
            className={`rotate-1 transition-[scale,rotate,opacity,translate] duration-500 ease-[cubic-bezier(.3,1.7,.5,1)] lg:w-[30rem] ${
              open ? '' : 'lg:pointer-events-none lg:-translate-y-4 lg:scale-50 lg:-rotate-12 lg:opacity-0'
            }`}
          />
          {open && (
            <button type="button" onClick={() => setOpen(false)} aria-label="Hide my stats"
              className="sticker-btn absolute -top-4 -right-4 hidden size-9 place-items-center rounded-full bg-red font-display text-paper lg:grid">
              &times;
            </button>
          )}
        </div>
        {!open && (
          <button type="button" onClick={show}
            className="absolute top-16 left-1/2 hidden -translate-x-1/2 -rotate-3 flex-col items-center font-comic text-3xl tracking-wide hover:-rotate-1 lg:flex">
            Click me for my stats!
            <Arrow className="draw mt-1 w-20 rotate-[70deg] text-ink" />
          </button>
        )}
      </div>

      {/* the avatar as a bust on a yellow disc, standing on the hero's bottom line at the right */}
      <div className="relative z-[1] -mx-5 mt-10 h-[400px] sm:-mx-8 sm:h-[480px] lg:absolute lg:right-[3%] lg:bottom-0 lg:mx-0 lg:mt-0 lg:h-[min(58svh,540px)] lg:w-[48%]">
        <div aria-hidden="true" data-depth="-8"
          className="pointer-events-none absolute bottom-[4%] left-1/2 aspect-square h-[76%] max-w-[90%] -translate-x-1/2 rounded-full border-[4px] border-ink bg-yellow shadow-sticker-lg" />
        <p className="pointer-events-none absolute top-2 left-4 z-10 hidden -rotate-6 font-comic text-2xl leading-tight tracking-wide sm:block lg:top-[10%] lg:left-[10%]">
          Drag me!
          <br />
          Pop the bubble!
          <Arrow className="draw mt-1 ml-10 w-20 text-ink" />
        </p>
        <Avatar3D className="size-full" onPoke={show} />
      </div>
    </>
  );
}

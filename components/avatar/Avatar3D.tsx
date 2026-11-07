'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { AvatarControls } from './scene';
import { asset } from '@/lib/asset';

export function Avatar3D({ className = '', onPoke }: { className?: string; onPoke?: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const poke = useRef(onPoke);
  useEffect(() => { poke.current = onPoke; }, [onPoke]);
  const controls = useRef<AvatarControls | null>(null);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [canPause, setCanPause] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // three.js loads after the poster has painted; a failure leaves the poster in place
    import('./scene')
      .then(({ mountAvatar }) => mountAvatar(stage.current!, () => !cancelled && setLive(true), () => poke.current?.()))
      .then((c) => {
        if (cancelled) c?.destroy();
        else {
          controls.current = c;
          setCanPause(!!c && !matchMedia('(prefers-reduced-motion: reduce)').matches);
        }
      })
      .catch((e) => console.warn('avatar scene', e));
    return () => { cancelled = true; controls.current?.destroy(); controls.current = null; };
  }, []);

  function toggle() {
    const next = !paused;
    setPaused(next);
    controls.current?.setPaused(next);
  }

  return (
    <div ref={stage} className={`relative ${className}`}>
      <Image
        src={asset('/char.png')}
        alt="Putranto's avatar: a cartoon of him in a teal dinosaur hoodie, blowing pink bubble gum"
        width={400}
        height={400}
        priority
        className={`absolute inset-x-0 bottom-0 mx-auto h-[85%] w-auto object-contain object-bottom ${live ? "invisible" : ""}`}
      />
      {canPause && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Play the floating icons' : 'Pause the floating icons'}
          className="sticker-btn absolute top-2 right-2 z-10 grid size-10 place-items-center rounded-full bg-paper"
        >
          <svg viewBox="0 0 12 12" className="size-3 fill-current stroke-current" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
            {paused ? <path d="M4 2.5l5 3.5-5 3.5z" /> : <path d="M4 2.5v7M8 2.5v7" />}
          </svg>
        </button>
      )}
    </div>
  );
}

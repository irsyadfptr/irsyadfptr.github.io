'use client';

import { useEffect } from 'react';

/**
 * The page's motion in one place, so sections stay server components:
 * - [data-speed]: scroll parallax, moves by (distance from the screen's middle) x speed
 * - [data-depth]: pointer parallax inside the hero
 * - .draw, [data-reveal]: get .is-in once on screen (doodles draw, blocks pop in)
 * - [data-path]: an SVG path that draws along with the scroll through its section
 * Reduced motion: nothing moves and everything shows.
 */
export function Motion() {
  // html.scrolled once the page leaves the very top: the nav shows its panel (not motion, so it runs for everyone)
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => root.classList.toggle('scrolled', scrollY > 16);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('js');

    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll<HTMLElement>('.draw, [data-reveal]').forEach((el) => {
      if (el.dataset.reveal !== undefined) el.style.setProperty('--i', String([...el.parentElement!.children].indexOf(el) % 6));
      io.observe(el);
    });

    const speeds = [...document.querySelectorAll<HTMLElement>('[data-speed], [data-depth]')];
    const paths = [...document.querySelectorAll<SVGPathElement>('[data-path]')];
    let mx = 0, my = 0, queued = false;
    const update = () => {
      queued = false;
      const mid = innerHeight / 2;
      for (const el of speeds) {
        const speed = Number(el.dataset.speed || 0), depth = Number(el.dataset.depth || 0);
        const r = el.parentElement!.getBoundingClientRect();
        const y = (r.top + r.height / 2 - mid) * speed;
        el.style.transform = `translate3d(${mx * depth}px, ${y + my * depth}px, 0)`;
      }
      for (const p of paths) {
        const r = p.ownerSVGElement!.getBoundingClientRect();
        const t = Math.min(Math.max((innerHeight * 0.75 - r.top) / r.height, 0), 1);
        p.style.strokeDashoffset = String(1 - t);
      }
    };
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    const onPointer = (e: PointerEvent) => { mx = (e.clientX / innerWidth - 0.5) * 2; my = (e.clientY / innerHeight - 0.5) * 2; queue(); };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    addEventListener('pointermove', onPointer, { passive: true });
    update();
    return () => {
      io.disconnect();
      removeEventListener('scroll', queue); removeEventListener('resize', queue); removeEventListener('pointermove', onPointer);
      root.classList.remove('js');
    };
  }, []);
  return null;
}

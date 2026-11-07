'use client';

import { useEffect, useState } from 'react';

/** Types each word, holds it, erases it, then the next one. Reduced motion: the first word, still. */
export function Typed({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let w = 0, n = words[0].length, del = true, timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      n += del ? -1 : 1;
      setText(words[w].slice(0, n));
      let wait = del ? 45 : 85;
      if (!del && n === words[w].length) { del = true; wait = 1600; }
      else if (del && n === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [words]);

  return <span className="caret" aria-hidden="true">{text}</span>;
}

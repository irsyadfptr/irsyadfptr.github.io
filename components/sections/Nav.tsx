import { EMAIL } from '@/lib/content';
import { Zap } from '../Doodles';

const links = [['Work', '#work'], ['Experience', '#experience'], ['Stack', '#stack']] as const;

export function Nav() {
  return (
    <header className="fixed inset-x-3 top-3 z-40 sm:inset-x-6 sm:top-4">
      <nav aria-label="Main" className="site-nav panel mx-auto flex max-w-6xl items-center gap-4 py-2 pr-2 pl-4">
        <a href="#top" className="group flex items-center gap-1.5 font-comic text-3xl tracking-wide">
          <Zap className="h-7 w-5 text-ink transition-transform duration-300 group-hover:-rotate-12 [&_path]:fill-yellow" />
          Putranto
        </a>
        <ul className="ml-auto hidden items-center gap-1 sm:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="px-3 py-1.5 font-bold uppercase tracking-wide decoration-red decoration-4 underline-offset-[6px] hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href={EMAIL} className="sticker-btn ml-auto rounded-md bg-yellow px-4 py-1.5 font-display uppercase sm:ml-2">
          Email me
        </a>
      </nav>
    </header>
  );
}

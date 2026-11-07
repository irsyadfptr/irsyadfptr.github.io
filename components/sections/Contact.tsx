import { EMAIL, socials } from '@/lib/content';
import { ActionLines, Burst, Underline, Zap } from '../Doodles';

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="close-h" className="relative px-5 pt-16 pb-10 sm:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div data-reveal className="panel relative overflow-hidden bg-yellow px-6 py-14 shadow-sticker-lg sm:px-14 sm:py-20">
          <div aria-hidden="true">
            <div data-speed="-0.12" className="halftone absolute inset-y-0 right-0 w-1/2 text-red/60 [--at:100%_50%]" />
            <div data-speed="-0.2" className="absolute -right-10 -bottom-16 hidden md:block"><Burst className="draw w-72 rotate-12 text-ink [&_path]:fill-paper" /></div>
            <div data-speed="0.1" className="absolute top-8 right-[34%] hidden md:block"><Zap className="draw h-12 w-9 text-ink [&_path]:fill-red" /></div>
            <div data-speed="-0.1" className="absolute bottom-6 left-[45%] hidden sm:block"><ActionLines className="draw w-16 text-ink" /></div>
          </div>
          <div className="relative">
            <p className="-rotate-2 font-comic text-3xl tracking-wide">Say hi!</p>
            <h2 id="close-h" className="mt-2 max-w-3xl font-display text-4xl leading-tight tracking-tight uppercase sm:text-6xl">
              Email me about your{' '}
              <span className="relative inline-block">
                <span className="relative z-10">team or project</span>
                <Underline className="draw absolute -bottom-1 left-0 h-5 w-full text-paper" />
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-lg font-semibold">Based in Jakarta. Open to remote work across Asia-Pacific and Europe, and to relocating to Singapore, Europe, Australia or Japan.</p>
            <a href={EMAIL} className="sticker-btn mt-8 inline-block rounded-md bg-red px-8 py-3.5 font-display text-xl text-paper uppercase">Email me</a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-comic text-6xl leading-none tracking-wide sm:text-7xl">Putranto</p>
            <p className="mt-2 font-bold text-muted">Senior frontend engineer in Jakarta.</p>
          </div>
          <ul className="flex gap-3">
            {socials.map(([label, href]) => (
              <li key={label}>
                <a href={href} rel="noopener" className="sticker-btn inline-block rounded-md bg-paper px-4 py-1.5 font-bold uppercase">{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 border-t-[3px] border-ink pt-5 text-sm font-medium text-muted">
          &copy; 2026 Irsyad Fakhri Putranto · Product names and logos are trademarks of their owners
        </p>
      </div>
    </footer>
  );
}

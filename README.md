# Putranto portfolio

Personal site of **Irsyad Fakhri Putranto**, senior frontend engineer in Jakarta. Live at [putranto-dev.vercel.app](https://putranto-dev.vercel.app).

A comic-book styled one-pager with a 3D sticker avatar: its eyes follow your cursor, you can drag it around, pop its bubble gum, and click it to fire the tool stickers off like torpedoes and open the player stats card.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, every route prerendered as static)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) (theme tokens in `app/globals.css`)
- [three.js](https://threejs.org) for the avatar scene
- Fonts: Archivo, Archivo Black and Bangers via `next/font`

## Getting started

Needs Node 24 (pinned in `package.json` `engines`, which Vercel also uses).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the build
npm run lint
```

## Deploying

- **Vercel (main site):** push to `main`. `vercel.json` sets the Next.js preset and `package.json` pins Node 24.
- **GitHub Pages (mirror):** `.github/workflows/pages.yml` builds a static export into `out/` on every push to `main`
  and publishes it. One-time setup: repo **Settings → Pages → Source: GitHub Actions**. A repo named
  `irsyadfptr.github.io` serves at the root; any other repo name serves under `/<repo>`, and the workflow passes that
  base path to the build. Public files are linked through `lib/asset.ts` so they resolve under either path.
  Canonical links and the sitemap still point at the Vercel URL in `lib/site.ts`.
- Local Pages test: `GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/portofolio npm run build`, then serve `out/` under
  `/portofolio`. In Git Bash prefix the command with `MSYS_NO_PATHCONV=1`.

## Where things live

| Path | What it is |
| --- | --- |
| `lib/content.ts` | All page copy: roles, work cards, experience, tool stack, social links |
| `lib/site.ts` | Name, URL, title, description and skills used for SEO and the share image |
| `app/page.tsx` | Page assembly and the JSON-LD profile for search engines |
| `app/layout.tsx` | Fonts and metadata (title, Open Graph, Twitter, canonical, robots) |
| `app/opengraph-image.tsx` | The generated 1200×630 share card (also used for Twitter) |
| `app/sitemap.ts`, `app/robots.ts` | `sitemap.xml` and `robots.txt` |
| `app/globals.css` | Palette, comic utilities (`panel`, `sticker-btn`, `halftone`) and animation rules |
| `components/sections/` | Nav, Hero, Work, Experience, Stack and Contact sections |
| `components/HeroStage.tsx` | Avatar column of the hero and the click-to-open stats card |
| `components/avatar/scene.ts` | The three.js scene: standee, eye tracking, bubble, orbiting stickers, torpedo scatter |
| `components/Motion.tsx` | Scroll and pointer parallax, reveal-on-scroll, the nav's scrolled state |
| `components/StatsCard.tsx` | Player stats card and the availability caption |
| `components/Doodles.tsx` | Hand-drawn SVG doodles (bursts, zaps, arrows, underlines) |
| `public/` | Avatar (`char.png`), company logos and tool icons |

## Editing

- **Copy and projects:** edit `lib/content.ts`. Work cards, experience rows and stack tiles render from it.
- **Stats levels:** edit the `stats` list at the top of `components/StatsCard.tsx`.
- **Domain:** change `url` in `lib/site.ts`; canonical URL, sitemap, robots and the share image follow it.
- **Avatar:** replace `public/char.png` (400×400 PNG with transparency). The eye and bubble positions in `components/avatar/scene.ts` (`EYES`, `BUBBLE`) are measured for the current art and need re-measuring for a new one.

## Accessibility and motion

- Visitors with *reduce motion* turned on get no parallax, typing, reveals or flying stickers; everything is shown at rest.
- The floating stickers have a pause button; the avatar is keyboard focusable (arrow keys turn it, Enter blows the bubble) and the stats card has its own show/hide buttons.
- Without WebGL the avatar falls back to the flat image.

## Credits

Tool logos are trademarks of their owners and come from [gilbarbara/logos](https://github.com/gilbarbara/logos) (CC0).

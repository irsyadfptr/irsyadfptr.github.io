import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

// The share card for LinkedIn, X, Slack and search: the comic look, the name, the role and the avatar.
export const alt = `${site.name}, senior frontend engineer (React, Next.js)`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// the page's heavy display face; without it the card falls back to a thin default
async function archivoBlack() {
  try {
    const css = await (await fetch('https://fonts.googleapis.com/css2?family=Archivo+Black')).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? [{ name: 'Archivo Black', data: await (await fetch(url)).arrayBuffer(), weight: 400 as const }] : undefined;
  } catch {
    return undefined;
  }
}

export default async function OgImage() {
  const avatar = `data:image/png;base64,${(await readFile(join(process.cwd(), 'public/char.png'))).toString('base64')}`;
  const fonts = await archivoBlack();
  const ink = '#111111';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', background: '#f4f1ea', padding: 40, fontFamily: fonts ? 'Archivo Black' : undefined,
          backgroundImage: 'radial-gradient(rgba(17,17,17,.12) 1.4px, transparent 1.6px)', backgroundSize: '12px 12px',
        }}
      >
        <div style={{ flex: 1, display: 'flex', border: `6px solid ${ink}`, borderRadius: 10, background: '#f4f1ea', boxShadow: `14px 14px 0 ${ink}`, padding: '48px 56px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 700 }}>
            <div style={{ display: 'flex', alignSelf: 'flex-start', border: `4px solid ${ink}`, background: '#ffcc00', padding: '6px 18px', fontSize: 30, fontWeight: 800, transform: 'rotate(-3deg)' }}>
              OPEN TO REMOTE &amp; RELOCATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28, fontSize: 76, fontWeight: 900, lineHeight: 1, letterSpacing: -2, color: ink }}>
              <span>IRSYAD FAKHRI</span>
              <span>PUTRANTO</span>
            </div>
            <div style={{ display: 'flex', marginTop: 24, fontSize: 40, fontWeight: 800, color: '#1d4ed8' }}>Senior Frontend Engineer</div>
            <div style={{ display: 'flex', marginTop: 14, fontSize: 28, color: '#3d3a35' }}>React · Next.js · TypeScript · Jakarta, Indonesia</div>
          </div>
          <div style={{ display: 'flex', position: 'absolute', right: 40, bottom: 24, width: 380, height: 380, borderRadius: 999, background: '#ffcc00', border: `6px solid ${ink}` }} />
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img */}
          <img src={avatar} width={420} height={420} style={{ position: 'absolute', right: 20, bottom: 0 }} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

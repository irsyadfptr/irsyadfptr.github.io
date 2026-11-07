// The avatar as an acrylic sticker standee, ringed by coins of the real tool icons.
// Eyes follow the pointer anywhere on the page; drag (or arrow keys) to turn it, click the bubble gum to blow it
// until it pops, click the avatar to fire the tool stickers off like torpedoes (and open the stats card). Coins drift while it is on screen; pause and reduced motion stop that.
import * as THREE from 'three';
import { asset } from '@/lib/asset';

const ART = 400; // char.png is 400x400
const B = 14; // die-cut border (white, then ink), px
const U = 2 / ART; // world units per px: the art is 2 units tall
const DEPTH = 0.07; // acrylic thickness
const ART_BOTTOM = -0.95; // world y of the art's flat-cut bottom edge
const BUBBLE = { x: 126.5, y: 266.5, r: 31.5 }; // bubble gum in char.png, measured
const SKIN = 'rgb(255,182,146)';
// pupils in char.png, measured: the dark shapes under each eyelid, and the lid span they may slide in
const EYES = [
  { patch: [139, 205, 23, 13], clip: [135, 205, 29, 13] },
  { patch: [197, 205, 25, 13], clip: [189, 205, 39, 13] },
] as const;
const TOOLS = ['react', 'typescript', 'nextjs', 'javascript', 'tailwindcss', 'threejs', 'gsap', 'html-5', 'css', 'playwright', 'cypress', 'jest', 'langchain', 'vercel'];

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((ok, fail) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = src; });
const canvas2d = (w: number, h: number) => Object.assign(document.createElement('canvas'), { width: w, height: h });
const ctx = (c: HTMLCanvasElement) => c.getContext('2d')!;
const tex = (c: HTMLCanvasElement) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number) => Math.max(-1, Math.min(1, v));

// White die-cut silhouette with the art on top; the pupils are cut out and drawn again where they look.
function dieCut(img: HTMLImageElement) {
  const w = ART + 2 * B, h = ART + B;
  const sil = canvas2d(w, h), sx = ctx(sil);
  sx.drawImage(img, B, B);
  sx.globalCompositeOperation = 'source-in';
  sx.fillStyle = '#fff'; sx.fillRect(0, 0, w, h);
  // comic sticker edge: a thick ink line outside a white die-cut border
  // dilate by stamping the silhouette around a circle; two radii are enough because each shifted copy also
  // covers the band between the shape and the stamp (kept low: this runs on the main thread at start-up)
  const grow = (into: CanvasRenderingContext2D, src: HTMLCanvasElement, max: number) => {
    for (const r of [max / 2, max]) for (let a = 0; a < 24; a++) {
      into.drawImage(src, Math.cos((a / 24) * Math.PI * 2) * r, Math.sin((a / 24) * Math.PI * 2) * r);
    }
  };
  const inkSil = canvas2d(w, h), ix = ctx(inkSil);
  ix.drawImage(sil, 0, 0); ix.globalCompositeOperation = 'source-in'; ix.fillStyle = '#111'; ix.fillRect(0, 0, w, h);
  const border = canvas2d(w, h), bx = ctx(border);
  grow(bx, inkSil, B);
  grow(bx, sil, B - 6);
  bx.drawImage(sil, 0, 0);
  bx.clearRect(0, h - 1, w, 1);

  const art = canvas2d(ART, ART), ax = ctx(art);
  ax.drawImage(img, 0, 0);
  const pupils = EYES.map(({ patch: [x, y, pw, ph] }) => {
    const p = canvas2d(pw, ph); ctx(p).drawImage(img, x, y, pw, ph, 0, 0, pw, ph); return p;
  });
  ax.fillStyle = SKIN;
  EYES.forEach(({ patch: [x, y, pw, ph] }) => ax.fillRect(x, y, pw, ph));

  const front = canvas2d(w, h), fx = ctx(front);
  const draw = (dx: number, dy: number) => {
    fx.clearRect(0, 0, w, h);
    fx.drawImage(border, 0, 0); fx.drawImage(art, B, B);
    EYES.forEach(({ patch: [x, y], clip: [cx, cy, cw, ch] }, i) => {
      fx.save(); fx.beginPath(); fx.rect(B + cx, B + cy, cw, ch); fx.clip();
      fx.drawImage(pupils[i], B + x + dx, B + y + dy);
      fx.restore();
    });
  };
  draw(0, 0);
  return { border, front, draw, w: w * U, h: h * U };
}

// a comic burst sticker: spiky outline, thin ink line, the tool's icon in the middle
const TINTS = ['#f4f1ea', '#fff3c4', '#d6f3f7'];
async function iconCoin(name: string, i: number) {
  const c = canvas2d(256, 256), x = ctx(c);
  const spikes = 11, rot = i * 0.7;
  x.beginPath();
  for (let k = 0; k < spikes * 2; k++) {
    const r = k % 2 ? 98 : 122 - ((k * 37) % 9), a = rot + (k / (spikes * 2)) * Math.PI * 2;
    x.lineTo(128 + Math.cos(a) * r, 128 + Math.sin(a) * r);
  }
  x.closePath();
  x.fillStyle = TINTS[i % TINTS.length]; x.fill();
  x.lineJoin = 'round'; x.lineWidth = 5; x.strokeStyle = '#111111'; x.stroke();
  try {
    const img = await loadImage(asset(`/icons/${name}.svg`));
    const s = 104 / Math.max(img.width || 1, img.height || 1);
    const w = (img.width || 104) * s, h = (img.height || 104) * s;
    x.drawImage(img, 128 - w / 2, 128 - h / 2, w, h);
  } catch { /* a missing icon leaves a plain coin */ }
  return tex(c);
}

export type AvatarControls = { setPaused: (p: boolean) => void; destroy: () => void };

export async function mountAvatar(stage: HTMLElement, onReady: () => void, onPoke: () => void = () => {}): Promise<AvatarControls | null> {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cv = document.createElement('canvas');
  cv.className = 'absolute inset-0 size-full cursor-grab touch-pan-y outline-offset-[-4px] active:cursor-grabbing';
  cv.tabIndex = 0;
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', "Putranto's avatar as a 3D sticker. Drag or use the arrow keys to turn it, press Enter to blow the bubble gum, click it to fire off the tool stickers.");

  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); }
  catch { return null; } // no WebGL: the poster image stays
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // unlit, flat colours like printed comic art: no lights, no reflections, no glow
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  const world = new THREE.Group(); scene.add(world); // tilts with the pointer
  const spinner = new THREE.Group(); world.add(spinner); // turns with a drag and the scroll
  const hopper = new THREE.Group(); spinner.add(hopper); // the standee

  const img = await loadImage(asset('/char.png'));
  const cut = dieCut(img);
  const geo = new THREE.PlaneGeometry(cut.w, cut.h);
  const yMid = ART_BOTTOM + cut.h / 2;
  const front = tex(cut.front), edge = tex(cut.border);
  const print = new THREE.MeshBasicMaterial({ map: front, alphaTest: 0.5 });
  const face = new THREE.Mesh(geo, print); face.position.set(0, yMid, DEPTH / 2); hopper.add(face);
  const back = new THREE.Mesh(geo, print.clone()); back.material.side = THREE.BackSide; back.position.set(0, yMid, -DEPTH / 2); hopper.add(back);
  // the board's thickness reads as a solid ink outline when it turns
  const edgeMat = new THREE.MeshBasicMaterial({ map: edge, color: 0x111111, alphaTest: 0.5, side: THREE.DoubleSide });
  for (let i = 1; i < 22; i++) {
    const l = new THREE.Mesh(geo, edgeMat); l.position.set(0, yMid, DEPTH / 2 - (DEPTH * i) / 22); hopper.add(l);
  }
  const toWorld = (px: number, py: number) => new THREE.Vector3((B + px) * U - cut.w / 2, yMid + cut.h / 2 - (B + py) * U, DEPTH / 2);
  const eyeMid = toWorld(180, 210);

  const bubbleBase = BUBBLE.r * U * 1.08;
  // toon bubble: flat pink, an ink outline (an inverted shell) and one white highlight
  const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xff9bcf });
  const bubble = new THREE.Mesh(new THREE.SphereGeometry(bubbleBase, 40, 28), bubbleMat);
  bubble.add(new THREE.Mesh(new THREE.SphereGeometry(bubbleBase * 1.1, 40, 28), new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.BackSide })));
  const shine = new THREE.Mesh(new THREE.CircleGeometry(bubbleBase * 0.22, 20), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  shine.position.set(-bubbleBase * 0.4, bubbleBase * 0.4, bubbleBase * 0.85); bubble.add(shine);
  bubble.position.copy(toWorld(BUBBLE.x, BUBBLE.y)); bubble.position.z += bubbleBase * 0.55;
  hopper.add(bubble);

  type CoinData = { a: number; y: number; ph: number; rx: number; ry: number; rz: number; dir: THREE.Vector3; dist: number; trail: THREE.Group };
  type Coin = THREE.Mesh & { userData: CoinData };
  const ring = new THREE.Group(); spinner.add(ring);
  // flat paper stickers, cut to the burst outline by the texture's alpha
  const coinGeo = new THREE.PlaneGeometry(0.42, 0.42);
  // comic speed lines behind a flying coin: two ink strokes that start at the coin and run back along its path
  const lineGeo = new THREE.PlaneGeometry(1, 0.03).translate(0.5, 0, 0);
  const ink = new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.DoubleSide });
  const coins = await Promise.all(TOOLS.map(async (name, i) => {
    const m = new THREE.MeshBasicMaterial({ map: await iconCoin(name, i), alphaTest: 0.5, side: THREE.DoubleSide });
    const coin = new THREE.Mesh(coinGeo, m) as unknown as Coin;
    const trail = new THREE.Group(); trail.visible = false;
    const l1 = new THREE.Mesh(lineGeo, ink), l2 = new THREE.Mesh(lineGeo, ink);
    l1.position.y = 0.06; l2.position.y = -0.07; l2.scale.x = 0.7;
    trail.add(l1, l2); ring.add(trail);
    coin.userData = { a: Math.PI * (0.32 + 1.36 * (i / (TOOLS.length - 1))), y: Math.sin(i * 2.1) * 0.6 + 0.05, ph: i * 1.3,
      rx: Math.sin(i) * 0.15, ry: Math.cos(i * 1.7) * 0.25, rz: Math.sin(i * 3) * 0.2, dir: new THREE.Vector3(), dist: 0, trail };
    ring.add(coin);
    return coin;
  }));

  const bits = Array.from({ length: 16 }, () => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), bubbleMat.clone());
    p.visible = false; hopper.add(p); return { p, v: new THREE.Vector3() };
  });

  const s = { tiltX: 0, tiltY: 0, tx: 0, ty: 0, spin: reduce ? 0 : -0.9, vel: 0, drag: false, lastX: 0, downX: 0, downY: 0,
    torp: -1, blow: 0, blowing: false, pop: -1, regrow: -1, entrance: reduce ? -1 : 0,
    px: null as number | null, py: 0, ex: 0, ey: 0, scroll: 0, t: 0, paused: reduce, onScreen: true, rx: 2.5, dead: false };
  let raf = 0, last = 0, eyeX = 0, eyeY = 0;

  function layout() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // anchored to the stage's bottom edge: the flat-cut bottom of the art sits on the canvas's bottom line,
    // like a bust in a comic panel. 2.4 units of height, or 2.3 of width on a narrow stage.
    const fit = Math.max(2.4, 2.3 / camera.aspect);
    const cy = ART_BOTTOM + fit / 2;
    camera.position.set(0, cy, fit / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    camera.lookAt(0, cy, 0);
    camera.updateProjectionMatrix();
    const halfW = (fit * camera.aspect) / 2;
    s.rx = Math.min(2.4, Math.max(halfW - 0.2, 1.2));
    coins.forEach((c) => { c.visible = halfW > 1.25; });
    kick();
  }

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), v = new THREE.Vector3();
  function hit(e: PointerEvent) {
    const r = cv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects([bubble, face, back], false)[0]?.object;
  }
  const blow = () => { if (s.pop < 0 && s.regrow < 0) { s.blowing = true; kick(); } };
  // fire every coin off in a random direction; they fly back to their orbit after
  const torpedo = () => {
    onPoke();
    if (reduce || s.torp >= 0) return;
    coins.forEach((c) => {
      const a = Math.random() * Math.PI * 2;
      c.userData.dir.set(Math.cos(a), Math.sin(a), (Math.random() - 0.5) * 0.3).normalize();
      c.userData.dist = 4.5 + Math.random() * 2.5;
    });
    s.torp = 0; kick();
  };

  const ac = new AbortController(), on = { signal: ac.signal, passive: true } as const;
  cv.addEventListener('pointerdown', (e) => {
    s.drag = true; s.lastX = s.downX = e.clientX; s.downY = e.clientY; s.vel = 0;
    cv.setPointerCapture(e.pointerId); kick();
  }, on);
  cv.addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect();
    s.tx = ((e.clientY - r.top) / r.height - 0.5) * 0.16;
    s.ty = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
    if (s.drag) { const dx = e.clientX - s.lastX; s.lastX = e.clientX; s.spin += dx * 0.012; s.vel = dx * 0.012; }
    else if (e.pointerType === 'mouse') cv.style.cursor = hit(e) === bubble ? 'pointer' : '';
  }, on);
  addEventListener('pointermove', (e) => { s.px = e.clientX; s.py = e.clientY; kick(); }, on);
  const release = (e: PointerEvent) => {
    if (!s.drag) return;
    s.drag = false;
    if (Math.hypot(e.clientX - s.downX, e.clientY - s.downY) < 6) { const o = hit(e); if (o === bubble) blow(); else if (o) torpedo(); }
    kick();
  };
  cv.addEventListener('pointerup', release, on);
  cv.addEventListener('pointercancel', release, on);
  cv.addEventListener('pointerleave', () => { s.tx = s.ty = 0; kick(); }, on);
  cv.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { s.vel = (e.key === 'ArrowLeft' ? -1 : 1) * 0.12; e.preventDefault(); kick(); }
    if (e.key === 'Enter' || e.key === ' ') { blow(); e.preventDefault(); }
  }, { signal: ac.signal });
  // turns a little as the stage leaves the top of the screen
  addEventListener('scroll', () => { s.scroll = Math.min(Math.max(-stage.getBoundingClientRect().top / stage.clientHeight, 0), 1); kick(); }, on);
  addEventListener('resize', layout, on);
  document.addEventListener('visibilitychange', () => kick(), on);
  const io = new IntersectionObserver(([en]) => { s.onScreen = en.isIntersecting; kick(); });
  io.observe(stage);

  function kick() { if (!raf && !s.dead && s.onScreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } }

  function frame(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    const drift = !s.paused && s.onScreen;
    let busy = drift;
    if (drift) s.t += dt;

    s.tiltX += (s.tx - s.tiltX) * (reduce ? 1 : 0.12);
    s.tiltY += (s.ty - s.tiltY) * (reduce ? 1 : 0.12);
    busy ||= Math.abs(s.tx - s.tiltX) + Math.abs(s.ty - s.tiltY) > 1e-4;
    world.rotation.set(0, s.tiltY, 0); // no pitch: the bottom edge stays on the stage line

    if (s.entrance >= 0) {
      s.entrance = Math.min(s.entrance + dt / 1.4, 1);
      s.spin = -0.9 * (1 - ease(s.entrance));
      if (s.entrance === 1) s.entrance = -1; else busy = true;
    } else if (!s.drag) {
      s.spin += s.vel; s.vel *= reduce ? 0 : 0.93;
      const home = Math.round(s.spin / (Math.PI * 2)) * Math.PI * 2;
      if (Math.abs(s.vel) < 0.004) s.spin += (home - s.spin) * (reduce ? 1 : 0.06);
      busy ||= Math.abs(s.vel) > 1e-4 || Math.abs(home - s.spin) > 1e-4;
    } else busy = true;
    spinner.rotation.y = s.spin + (reduce ? 0 : s.scroll * 0.9);


    coins.forEach((c) => {
      const d = c.userData, a = d.a + Math.sin(s.t * 0.35 + d.ph) * 0.22;
      c.position.set(Math.sin(a) * s.rx, d.y + Math.sin(s.t * 0.9 + d.ph) * 0.09, Math.cos(a) * 1.1);
      c.rotation.set(d.rx + Math.sin(s.t * 0.7 + d.ph) * 0.2, d.ry + s.t * 0.4, d.rz);
    });

    // torpedoes: 0..1 the coins shoot out and speed up, 1..2 they fly back in and settle on their orbit
    if (s.torp >= 0) {
      s.torp += dt / (s.torp < 1 ? 0.55 : 0.8);
      const out = s.torp < 1, k = out ? s.torp * s.torp : ease(Math.min(s.torp - 1, 1));
      coins.forEach((c) => {
        const { dir, dist, trail } = c.userData;
        const travelled = out ? dist * k : dist * (1 - k);
        c.position.addScaledVector(dir, travelled);
        c.rotation.z = c.userData.rz + s.torp * 18; // barrel-roll in flight
        // the speed lines point back along the path: away from the dir going out, toward it coming home
        const len = Math.min(out ? travelled : (1 - k) * 2, 1.4);
        trail.visible = c.visible && len > 0.03 && s.torp < 2;
        trail.position.copy(c.position);
        trail.rotation.set(0, 0, Math.atan2(dir.y, dir.x) + (out ? Math.PI : 0));
        trail.scale.set(len, 1, 1);
      });
      if (s.torp >= 2) { s.torp = -1; coins.forEach((c) => (c.userData.trail.visible = false)); } else busy = true;
    }

    if (s.blowing) {
      s.blow = Math.min(s.blow + dt / (reduce ? 0.01 : 0.9), 1);
      if (s.blow === 1) {
        s.blowing = false; s.blow = 0; s.pop = 0; bubble.visible = false;
        if (!reduce) bits.forEach(({ p, v: vel }, i) => {
          const a = (i / bits.length) * Math.PI * 2;
          p.visible = true; p.position.copy(bubble.position);
          vel.set(Math.cos(a) * (0.9 + Math.random()), Math.sin(a) * (0.9 + Math.random()), 0.6 + Math.random() * 0.6);
        });
      }
      busy = true;
    }
    bubble.scale.setScalar(1 + ease(s.blow) * 2.4);
    if (s.pop >= 0) {
      s.pop += dt / (reduce ? 0.01 : 0.6);
      bits.forEach(({ p, v: vel }) => { vel.y -= 3 * dt; p.position.addScaledVector(vel, dt); p.scale.setScalar(Math.max(1 - s.pop, 0.01)); });
      if (s.pop >= 1) { s.pop = -1; s.regrow = 0; bits.forEach(({ p }) => (p.visible = false)); bubble.visible = true; }
      busy = true;
    }
    if (s.regrow >= 0) {
      s.regrow = Math.min(s.regrow + dt / (reduce ? 0.01 : 0.5), 1);
      bubble.scale.setScalar(ease(s.regrow));
      if (s.regrow === 1) s.regrow = -1; else busy = true;
    }

    // eyes look at the pointer: project the eyes to the screen, slide the pupils toward the pointer
    if (s.px !== null) {
      hopper.updateWorldMatrix(true, false);
      v.copy(eyeMid).applyMatrix4(hopper.matrixWorld).project(camera);
      const r = cv.getBoundingClientRect();
      const sx = r.left + ((v.x + 1) / 2) * r.width, sy = r.top + ((1 - v.y) / 2) * r.height;
      const facing = Math.cos(spinner.rotation.y) > 0 ? 1 : -1; // from the back the print is mirrored
      const tx = clamp((s.px - sx) / 260) * 5 * facing, ty = clamp((s.py - sy) / 260) * 3;
      eyeX += (tx - eyeX) * (reduce ? 1 : 0.25); eyeY += (ty - eyeY) * (reduce ? 1 : 0.25);
      if (Math.abs(tx - eyeX) + Math.abs(ty - eyeY) > 0.05) busy = true;
      const qx = Math.round(eyeX * 2) / 2, qy = Math.round(eyeY * 2) / 2;
      if (qx !== s.ex || qy !== s.ey) { s.ex = qx; s.ey = qy; cut.draw(qx, qy); front.needsUpdate = true; }
    }

    renderer.render(scene, camera);
    raf = (busy || s.drag) && s.onScreen && !document.hidden ? requestAnimationFrame(frame) : 0;
  }

  stage.append(cv);
  layout();
  onReady();

  return {
    setPaused(p) { s.paused = p || reduce; kick(); },
    destroy() {
      s.dead = true; cancelAnimationFrame(raf); ac.abort(); io.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: THREE.Material & { map?: THREE.Texture | null }) => { m.map?.dispose(); m.dispose(); });
        }
      });
      renderer.dispose(); cv.remove();
    },
  };
}

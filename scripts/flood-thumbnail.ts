// Renders the flood-sim project's cover image (SVG) from the real simulation data.
// Run: node --experimental-strip-types scripts/flood-thumbnail.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { edgesToLatLngs, prepare, simulate, toXY, type FloodData } from '../src/lib/floodsim.ts';

const data: FloodData = JSON.parse(readFileSync(new URL('../public/data/flood/route504.json', import.meta.url), 'utf8'));
const sim = prepare(data);
const flood = { lat: 43.644, lon: -79.4026, radius: 200 };
const r = simulate(sim, flood);

const W = 1200;
const H = 900;
const [cx, cy] = toXY(sim, flood.lon, flood.lat);
const span = 1500; // metres shown across the width
const scale = W / span;
const px = (lon: number, lat: number) => {
  const [x, y] = toXY(sim, lon, lat);
  return [(W / 2 + (x - cx) * scale).toFixed(1), (H / 2 - (y - cy) * scale).toFixed(1)].join(',');
};
const path = (pts: [number, number][]) => pts.map(([lat, lon]) => px(lon, lat)).join(' ');

const streets = data.geoms
  .map((g) => {
    const pts: string[] = [];
    for (let i = 0; i < g.length; i += 2) pts.push(px(g[i], g[i + 1]));
    return `<polyline points="${pts.join(' ')}"/>`;
  })
  .join('');
const legsToLines = (legs: typeof r.baseline) =>
  legs
    .filter((l) => l.edges && l.edges.length)
    .map((l) => `<polyline points="${path(edgesToLatLngs(sim, l.edges!))}"/>`)
    .join('');
const cut = [...r.cut].map((e) => `<polyline points="${path(edgesToLatLngs(sim, [e]))}"/>`).join('');
const stops = data.stops
  .map((s, i) => {
    const [x, y] = px(s.lon, s.lat).split(',');
    return r.closed.has(i)
      ? `<circle cx="${x}" cy="${y}" r="9" fill="#e03131"/>`
      : `<circle cx="${x}" cy="${y}" r="7" fill="#f2f2ef" stroke="#0f1114" stroke-width="3"/>`;
  })
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="#121417"/>
<g fill="none" stroke="#2c3036" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${streets}</g>
<circle cx="${W / 2}" cy="${H / 2}" r="${flood.radius * scale}" fill="#4c8dff" fill-opacity="0.22" stroke="#4c8dff" stroke-width="2"/>
<g fill="none" stroke="#7d838b" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0.8">${legsToLines(r.baseline)}</g>
<g fill="none" stroke="#e03131" stroke-width="6" stroke-linecap="round">${cut}</g>
<g fill="none" stroke="#ff6a3d" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">${legsToLines(r.flooded)}</g>
<g>${stops}</g>
</svg>`;

const out = new URL('../src/content/projects/ttc-flood-sim/map-preview.svg', import.meta.url);
writeFileSync(out, svg);
console.log(`wrote ${out.pathname} (${(svg.length / 1024).toFixed(0)} KB)`);

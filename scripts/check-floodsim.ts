// Parity check: the browser port must agree with the Python simulator.
// Run: node --experimental-strip-types scripts/check-floodsim.ts
// Reference numbers come from `python -m floodsim --route 504 ...` in ttc-flood-sim.
import { readFileSync } from 'node:fs';
import { prepare, simulate, type FloodData } from '../src/lib/floodsim.ts';

const data: FloodData = JSON.parse(readFileSync(new URL('../public/data/flood/route504.json', import.meta.url), 'utf8'));
const sim = prepare(data);

const cases = [
  { name: 'King & Bathurst, 200 m', flood: { lat: 43.644, lon: -79.4026, radius: 200 }, base: 9.48, flooded: 11.25, extra: 1777 },
];

let failed = 0;
for (const c of cases) {
  const t0 = performance.now();
  const r = simulate(sim, c.flood);
  const ms = performance.now() - t0;
  const km = (m: number) => Math.round(m / 10) / 100;
  const extra = r.diversions.reduce((s, d) => s + (d.detour === null ? 0 : d.detour - d.normal), 0);
  const ok = km(r.baselineLength) === c.base && Math.abs(km(r.floodedLength) - c.flooded) <= 0.02 && Math.abs(extra - c.extra) <= 20;
  failed += ok ? 0 : 1;
  console.log(
    `${ok ? 'PASS' : 'FAIL'} ${c.name}: base ${km(r.baselineLength)} km (py ${c.base}), flooded ${km(r.floodedLength)} km (py ${c.flooded}), ` +
      `extra ${Math.round(extra)} m (py ${c.extra}), cut ${r.cut.size}, closed ${[...r.closed].map((i) => data.stops[i].name).join('; ')}, ${ms.toFixed(0)} ms`,
  );
}
process.exit(failed);

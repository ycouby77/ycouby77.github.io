// Remove stray parts that sit far away from the rest of a CAD assembly (e.g. leftover
// imported components parked off to the side in SolidWorks). They blow up the bounding
// box, so the viewer zooms out and the real model looks tiny.
//
// usage: node scripts/prune-outliers.mjs <in.glb> <out.glb> [factor=8]
// A part is dropped when its centre is more than `factor` x the median part distance
// from the median part centre (minimum 5% of the assembly's typical size).
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
// Column-major 4x4 (glTF convention) times a point.
const transform = (m, [x, y, z]) => [
  m[0] * x + m[4] * y + m[8] * z + m[12],
  m[1] * x + m[5] * y + m[9] * z + m[13],
  m[2] * x + m[6] * y + m[10] * z + m[14],
];

const [input, output, factorArg] = process.argv.slice(2);
const FACTOR = Number(factorArg ?? 8);

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(input);
const root = doc.getRoot();

const parts = [];
for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute('POSITION');
    if (!pos) continue;
    pos.getMin([]).forEach((v, i) => (min[i] = Math.min(min[i], v)));
    pos.getMax([]).forEach((v, i) => (max[i] = Math.max(max[i], v)));
  }
  if (!Number.isFinite(min[0])) continue;
  const local = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
  const world = transform(node.getWorldMatrix(), local);
  parts.push({ node, name: node.getName() || mesh.getName(), c: world });
}

const median = (arr) => [...arr].sort((a, b) => a - b)[arr.length >> 1];
const centre = [0, 1, 2].map((i) => median(parts.map((p) => p.c[i])));
parts.forEach((p) => (p.d = Math.hypot(p.c[0] - centre[0], p.c[1] - centre[1], p.c[2] - centre[2])));
const typical = median(parts.map((p) => p.d));
const limit = Math.max(typical * FACTOR, typical * 2 + 1e-6);

const dropped = parts.filter((p) => p.d > limit);
for (const p of dropped) p.node.dispose();
console.log(`parts: ${parts.length}, typical distance ${typical.toFixed(4)}, limit ${limit.toFixed(4)}`);
console.log(`dropped ${dropped.length}:`, [...new Set(dropped.map((p) => p.name))].join(' | ') || 'none');
await io.write(output, doc);

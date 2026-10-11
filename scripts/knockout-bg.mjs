// Make a CAD render's light background transparent so it sits on the dark site.
// Flood-fills from the image border through light pixels whose colour changes only
// gradually (handles SolidWorks' gradient backdrops), so light parts *inside* the
// model are kept. Then trims to the model with a small margin.
// usage: node scripts/knockout-bg.mjs <in.png> <out.png> [minLuma=170] [step=14]
import sharp from 'sharp';

const [input, output, minLumaArg, stepArg] = process.argv.slice(2);
const MIN_LUMA = Number(minLumaArg ?? 170); // background is at least this bright
const STEP = Number(stepArg ?? 14); // max colour change between neighbouring bg pixels

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
const luma = ([r, g, b]) => 0.299 * r + 0.587 * g + 0.114 * b;
const close = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) <= STEP;

const bg = new Uint8Array(W * H);
const queue = [];
const seed = (i) => {
  if (!bg[i] && luma(px(i)) >= MIN_LUMA) {
    bg[i] = 1;
    queue.push(i);
  }
};
for (let x = 0; x < W; x++) seed(x), seed((H - 1) * W + x);
for (let y = 0; y < H; y++) seed(y * W), seed(y * W + W - 1);
while (queue.length) {
  const i = queue.pop();
  const x = i % W;
  const c = px(i);
  for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, i - W, i + W]) {
    if (j < 0 || j >= W * H || bg[j]) continue;
    const n = px(j);
    if (luma(n) >= MIN_LUMA && close(c, n)) {
      bg[j] = 1;
      queue.push(j);
    }
  }
}

// Alpha: background -> transparent; 1-px feather on the boundary to avoid jaggies.
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (bg[i]) {
      data[i * 4 + 3] = 0;
      continue;
    }
    let edge = 0;
    for (const j of [i - 1, i + 1, i - W, i + W]) if (j >= 0 && j < W * H && bg[j]) edge++;
    if (edge) data[i * 4 + 3] = Math.min(data[i * 4 + 3], 255 - edge * 40);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}
const pad = Math.round(Math.max(W, H) * 0.03);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const cropW = Math.min(W - left, maxX - minX + 1 + 2 * pad);
const cropH = Math.min(H - top, maxY - minY + 1 + 2 * pad);
await sharp(data, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left, top, width: cropW, height: cropH })
  .png()
  .toFile(output);
const removed = bg.reduce((s, v) => s + v, 0) / (W * H);
console.log(`${output}: ${W}x${H} -> ${cropW}x${cropH}, background removed ${(removed * 100).toFixed(0)}%`);

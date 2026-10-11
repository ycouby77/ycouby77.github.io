// In-browser port of the ttc-flood-sim routing core (floodsim/routing.py + flood.py).
// Same model: a circular flood cuts every road whose centreline enters it, closes
// stops inside it, and the shuttle takes the shortest drivable path (respecting
// one-way streets) between the remaining stops in order.
// Data comes from `python -m floodsim.export_web`.

export interface FloodData {
  route: { number: string; name: string; headsign: string; streetcar: boolean };
  nodes: [number, number][];
  edges: [number, number, number, number, 0 | 1][]; // u, v, length_m, geom_id, reversed
  geoms: number[][]; // flat [lon, lat, lon, lat, ...]
  stops: { name: string; node: number; lon: number; lat: number }[];
}

export interface Sim {
  data: FloodData;
  lon0: number;
  lat0: number;
  kx: number; // metres per degree of longitude at lat0
  ky: number;
  geomXY: Float64Array[]; // projected street centrelines
  stopXY: [number, number][];
  // Outgoing edges per node (CSR layout).
  outStart: Int32Array;
  outEdge: Int32Array;
}

export interface Flood {
  lon: number;
  lat: number;
  radius: number; // metres
}

export interface Leg {
  from: number; // stop index
  to: number;
  edges: number[] | null; // edge indices along the path; null = no path
  length: number;
}

export interface Diversion {
  from: number;
  to: number;
  closed: number[];
  normal: number;
  detour: number | null;
}

export interface Result {
  baseline: Leg[];
  flooded: Leg[];
  cut: Set<number>;
  closed: Set<number>;
  diversions: Diversion[];
  baselineLength: number;
  floodedLength: number;
}

export function prepare(data: FloodData): Sim {
  const lon0 = data.stops.reduce((s, p) => s + p.lon, 0) / data.stops.length;
  const lat0 = data.stops.reduce((s, p) => s + p.lat, 0) / data.stops.length;
  const ky = 111_320;
  const kx = 111_320 * Math.cos((lat0 * Math.PI) / 180);
  const geomXY = data.geoms.map((g) => {
    const out = new Float64Array(g.length);
    for (let i = 0; i < g.length; i += 2) {
      out[i] = (g[i] - lon0) * kx;
      out[i + 1] = (g[i + 1] - lat0) * ky;
    }
    return out;
  });
  const stopXY = data.stops.map((s) => [(s.lon - lon0) * kx, (s.lat - lat0) * ky] as [number, number]);

  const n = data.nodes.length;
  const outStart = new Int32Array(n + 1);
  for (const [u] of data.edges) outStart[u + 1]++;
  for (let i = 0; i < n; i++) outStart[i + 1] += outStart[i];
  const fill = outStart.slice(0, n);
  const outEdge = new Int32Array(data.edges.length);
  data.edges.forEach(([u], e) => (outEdge[fill[u]++] = e));

  return { data, lon0, lat0, kx, ky, geomXY, stopXY, outStart, outEdge };
}

export function toXY(sim: Sim, lon: number, lat: number): [number, number] {
  return [(lon - sim.lon0) * sim.kx, (lat - sim.lat0) * sim.ky];
}

function segDist2(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let t = len2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  const qx = ax + t * dx - px;
  const qy = ay + t * dy - py;
  return qx * qx + qy * qy;
}

/** Edges whose street centreline comes within the flood radius. */
export function cutEdges(sim: Sim, flood: Flood): Set<number> {
  const [cx, cy] = toXY(sim, flood.lon, flood.lat);
  const r2 = flood.radius * flood.radius;
  const wetGeom = new Uint8Array(sim.geomXY.length);
  sim.geomXY.forEach((g, gid) => {
    for (let i = 0; i + 3 < g.length; i += 2) {
      if (segDist2(cx, cy, g[i], g[i + 1], g[i + 2], g[i + 3]) <= r2) {
        wetGeom[gid] = 1;
        return;
      }
    }
    if (g.length === 2 && (g[0] - cx) ** 2 + (g[1] - cy) ** 2 <= r2) wetGeom[gid] = 1;
  });
  const cut = new Set<number>();
  sim.data.edges.forEach(([, , , gid], e) => wetGeom[gid] && cut.add(e));
  return cut;
}

export function closedStops(sim: Sim, flood: Flood): Set<number> {
  const [cx, cy] = toXY(sim, flood.lon, flood.lat);
  const out = new Set<number>();
  sim.stopXY.forEach(([x, y], i) => (x - cx) ** 2 + (y - cy) ** 2 <= flood.radius ** 2 && out.add(i));
  return out;
}

/** Dijkstra on edge length, skipping blocked edges. Returns edge indices or null. */
export function shortestPath(sim: Sim, src: number, dst: number, blocked: Set<number>): { edges: number[]; length: number } | null {
  if (src === dst) return { edges: [], length: 0 };
  const n = sim.data.nodes.length;
  const dist = new Float64Array(n).fill(Infinity);
  const via = new Int32Array(n).fill(-1);
  const done = new Uint8Array(n);
  // Binary heap of [dist, node].
  const heap: [number, number][] = [[0, src]];
  dist[src] = 0;
  const push = (item: [number, number]) => {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = (): [number, number] => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };

  while (heap.length) {
    const [d, u] = pop();
    if (done[u]) continue;
    done[u] = 1;
    if (u === dst) break;
    for (let k = sim.outStart[u]; k < sim.outStart[u + 1]; k++) {
      const e = sim.outEdge[k];
      if (blocked.has(e)) continue;
      const [, v, len] = sim.data.edges[e];
      const nd = d + len;
      if (nd < dist[v]) {
        dist[v] = nd;
        via[v] = e;
        push([nd, v]);
      }
    }
  }
  if (!Number.isFinite(dist[dst])) return null;
  const edges: number[] = [];
  for (let v = dst; v !== src; v = sim.data.edges[via[v]][0]) edges.push(via[v]);
  return { edges: edges.reverse(), length: dist[dst] };
}

function routeThrough(sim: Sim, order: number[], blocked: Set<number>): Leg[] {
  const legs: Leg[] = [];
  for (let i = 0; i + 1 < order.length; i++) {
    const a = order[i];
    const b = order[i + 1];
    const p = shortestPath(sim, sim.data.stops[a].node, sim.data.stops[b].node, blocked);
    legs.push({ from: a, to: b, edges: p ? p.edges : null, length: p ? p.length : NaN });
  }
  return legs;
}

const sum = (legs: Leg[]) => legs.reduce((s, l) => s + (l.edges ? l.length : 0), 0);

export function baseline(sim: Sim): Leg[] {
  return routeThrough(sim, sim.data.stops.map((_, i) => i), new Set());
}

export function simulate(sim: Sim, flood: Flood, base: Leg[] = baseline(sim)): Result {
  const cut = cutEdges(sim, flood);
  const closed = closedStops(sim, flood);
  const open = sim.data.stops.map((_, i) => i).filter((i) => !closed.has(i));
  const flooded = routeThrough(sim, open, cut);

  const baseLen = new Map(base.map((l) => [l.from, l.length]));
  const diversions: Diversion[] = [];
  for (const leg of flooded) {
    const skipped: number[] = [];
    let normal = 0;
    for (let i = leg.from; i < leg.to; i++) {
      normal += baseLen.get(i) ?? 0;
      if (i > leg.from) skipped.push(i);
    }
    const changed = leg.edges === null || Math.abs(leg.length - normal) > 1;
    if (skipped.length || changed) {
      diversions.push({ from: leg.from, to: leg.to, closed: skipped, normal, detour: leg.edges ? leg.length : null });
    }
  }
  return { baseline: base, flooded, cut, closed, diversions, baselineLength: sum(base), floodedLength: sum(flooded) };
}

/** [lat, lon] polyline points for a list of edges, in travel direction. */
export function edgesToLatLngs(sim: Sim, edges: number[]): [number, number][] {
  const pts: [number, number][] = [];
  for (const e of edges) {
    const [, , , gid, rev] = sim.data.edges[e];
    const g = sim.data.geoms[gid];
    const idx = [];
    for (let i = 0; i < g.length; i += 2) idx.push(i);
    if (rev) idx.reverse();
    for (const i of idx) pts.push([g[i + 1], g[i]]);
  }
  return pts;
}

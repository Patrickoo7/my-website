// Rotated surface code of odd distance d, with an exact minimum-weight decoder.
//
// Data qubits sit on a d×d grid, indexed q = row * d + col. Stabilizers sit on
// the faces between them in a checkerboard of X and Z types, plus weight-2
// faces on the boundary: X-type on the top/bottom edges, Z-type on the left/right.
// Error patterns are bitmasks over the d² data qubits (d ≤ 5 fits in 32 bits).

export type StabType = 'X' | 'Z';
export type Boundary = 'top' | 'bottom' | 'left' | 'right' | null;

export interface Stabilizer {
  type: StabType;
  qubits: number[];
  /** face position: centre at (row + 0.5, col + 0.5) in data-qubit units */
  row: number;
  col: number;
  boundary: Boundary;
}

export interface SurfaceCode {
  d: number;
  n: number;
  stabilizers: Stabilizer[];
  xStabs: Stabilizer[];
  zStabs: Stabilizer[];
  /** Z-type logical: Z on every qubit of the top row (detects logical X flips) */
  logicalZ: number;
  /** X-type logical: X on every qubit of the left column (detects logical Z flips) */
  logicalX: number;
  /** syndrome bits (over zStabs) caused by an X error on each qubit */
  xErrorSyndrome: number[];
  /** syndrome bits (over xStabs) caused by a Z error on each qubit */
  zErrorSyndrome: number[];
  /** minimum-weight X correction for each Z-stabilizer syndrome */
  xDecoder: Int32Array;
  /** minimum-weight Z correction for each X-stabilizer syndrome */
  zDecoder: Int32Array;
}

const mod2 = (v: number) => ((v % 2) + 2) % 2;

export function popcount(v: number) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}

export const parity = (v: number) => popcount(v) & 1;

/** Minimum-weight decoder as a lookup table, built by breadth-first search
 * over syndromes: each step flips one qubit, so the first time BFS reaches a
 * syndrome it has used the fewest possible flips. Exact for these small codes. */
function buildDecoder(perQubit: number[], nStabs: number) {
  const size = 1 << nStabs;
  const table = new Int32Array(size).fill(-1);
  table[0] = 0;
  const queue = [0];
  for (let head = 0; head < queue.length; head++) {
    const s = queue[head];
    for (let q = 0; q < perQubit.length; q++) {
      const t = s ^ perQubit[q];
      if (table[t] === -1) {
        table[t] = table[s] ^ (1 << q);
        queue.push(t);
      }
    }
  }
  return table;
}

export function buildCode(d: number): SurfaceCode {
  if (d % 2 !== 1 || d < 3 || d > 5) throw new Error('distance must be 3 or 5');
  const n = d * d;
  const q = (r: number, c: number) => r * d + c;
  const stabilizers: Stabilizer[] = [];

  for (let i = 0; i < d - 1; i++)
    for (let j = 0; j < d - 1; j++)
      stabilizers.push({
        type: mod2(i + j) === 0 ? 'X' : 'Z',
        qubits: [q(i, j), q(i, j + 1), q(i + 1, j), q(i + 1, j + 1)],
        row: i,
        col: j,
        boundary: null,
      });
  for (let j = 0; j < d - 1; j++) {
    if (mod2(-1 + j) === 0) stabilizers.push({ type: 'X', qubits: [q(0, j), q(0, j + 1)], row: -1, col: j, boundary: 'top' });
    if (mod2(d - 1 + j) === 0) stabilizers.push({ type: 'X', qubits: [q(d - 1, j), q(d - 1, j + 1)], row: d - 1, col: j, boundary: 'bottom' });
  }
  for (let i = 0; i < d - 1; i++) {
    if (mod2(i - 1) === 1) stabilizers.push({ type: 'Z', qubits: [q(i, 0), q(i + 1, 0)], row: i, col: -1, boundary: 'left' });
    if (mod2(i + d - 1) === 1) stabilizers.push({ type: 'Z', qubits: [q(i, d - 1), q(i + 1, d - 1)], row: i, col: d - 1, boundary: 'right' });
  }

  const xStabs = stabilizers.filter((s) => s.type === 'X');
  const zStabs = stabilizers.filter((s) => s.type === 'Z');
  const perQubit = (stabs: Stabilizer[]) =>
    Array.from({ length: n }, (_, qb) => stabs.reduce((m, s, k) => (s.qubits.includes(qb) ? m | (1 << k) : m), 0));
  const xErrorSyndrome = perQubit(zStabs); // X errors anticommute with Z checks
  const zErrorSyndrome = perQubit(xStabs);

  let logicalZ = 0, logicalX = 0;
  for (let c = 0; c < d; c++) logicalZ |= 1 << q(0, c);
  for (let r = 0; r < d; r++) logicalX |= 1 << q(r, 0);

  return {
    d,
    n,
    stabilizers,
    xStabs,
    zStabs,
    logicalZ,
    logicalX,
    xErrorSyndrome,
    zErrorSyndrome,
    xDecoder: buildDecoder(xErrorSyndrome, zStabs.length),
    zDecoder: buildDecoder(zErrorSyndrome, xStabs.length),
  };
}

export function syndromeOf(mask: number, perQubit: number[]) {
  let s = 0;
  for (let qb = 0; mask; qb++, mask >>>= 1) if (mask & 1) s ^= perQubit[qb];
  return s;
}

export interface DecodeResult {
  xSyndrome: number;
  zSyndrome: number;
  xCorrection: number;
  zCorrection: number;
  /** residual X error after correction flips the logical qubit */
  logicalXError: boolean;
  logicalZError: boolean;
}

/** Decode X and Z errors independently with the minimum-weight tables. */
export function decode(code: SurfaceCode, xErrors: number, zErrors: number): DecodeResult {
  const xSyndrome = syndromeOf(xErrors, code.xErrorSyndrome);
  const zSyndrome = syndromeOf(zErrors, code.zErrorSyndrome);
  const xCorrection = code.xDecoder[xSyndrome];
  const zCorrection = code.zDecoder[zSyndrome];
  return {
    xSyndrome,
    zSyndrome,
    xCorrection,
    zCorrection,
    logicalXError: parity((xErrors ^ xCorrection) & code.logicalZ) === 1,
    logicalZError: parity((zErrors ^ zCorrection) & code.logicalX) === 1,
  };
}

/** Small, fast seeded PRNG (mulberry32). */
export function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sample an error pattern where each qubit fails independently with probability p. */
export function sampleErrors(n: number, p: number, rand: () => number) {
  let m = 0;
  for (let qb = 0; qb < n; qb++) if (rand() < p) m |= 1 << qb;
  return m;
}

/** Code-capacity Monte Carlo under independent bit-flip noise: the fraction
 * of trials where minimum-weight decoding leaves a logical X error. */
export function logicalErrorCount(code: SurfaceCode, p: number, trials: number, rand: () => number) {
  let fails = 0;
  for (let t = 0; t < trials; t++) {
    const e = sampleErrors(code.n, p, rand);
    const c = code.xDecoder[syndromeOf(e, code.xErrorSyndrome)];
    fails += parity((e ^ c) & code.logicalZ);
  }
  return fails;
}

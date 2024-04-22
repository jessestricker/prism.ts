export type Vector3 = [number, number, number];

export function vecDot(lhs: Vector3, rhs: Vector3): number {
  return lhs[0] * rhs[0] + lhs[1] * rhs[1] + lhs[2] * rhs[2];
}

export function vecMap(vec: Vector3, map: (elem: number) => number): Vector3 {
  return [map(vec[0]), map(vec[1]), map(vec[2])];
}

export type Matrix3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
];

export function matMulVec(mat: Matrix3, vec: Vector3): Vector3 {
  return [vecDot(mat[0], vec), vecDot(mat[1], vec), vecDot(mat[2], vec)];
}

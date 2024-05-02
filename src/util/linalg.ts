export type Vector3 = [number, number, number];

export const Vector3 = {
  map(vector: Vector3, map: (element: number) => number): Vector3 {
    return [map(vector[0]), map(vector[1]), map(vector[2])];
  },
};

export interface ToVector3 {
  toVector3(): Vector3;
}

export type Matrix3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
];

export const Matrix3 = {
  multiply(m: Matrix3, v: Vector3): Vector3 {
    return [
      m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
      m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
      m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
    ];
  },
};

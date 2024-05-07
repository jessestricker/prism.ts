import { Vector3 } from "./linalg.js";
import { expect, describe, test } from "@jest/globals";

describe("Vector3", () => {
  test("maps", () => {
    expect(Vector3.map([1, 2, 3], (c) => c ** 2)).toStrictEqual([1, 4, 9]);
  });
});

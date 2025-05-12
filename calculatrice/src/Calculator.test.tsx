import { calculate } from "./utils/calculate";

describe("calculate()", () => {
  test("addition", () => {
    expect(calculate(1, 2, "+")).toBe(3);
  });

  test("soustraction", () => {
    expect(calculate(5, 3, "-")).toBe(2);
  });

  test("multiplication", () => {
    expect(calculate(4, 3, "*")).toBe(12);
  });

  test("division", () => {
    expect(calculate(10, 2, "/")).toBe(5);
  });

  test("division par 0 retourne null", () => {
    expect(calculate(10, 0, "/")).toBeNull();
  });

  test("opérateur inconnu retourne null", () => {
    expect(calculate(10, 5, "%")).toBeNull();
  });
});

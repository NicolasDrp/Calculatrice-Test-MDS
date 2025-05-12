export function calculate(
  a: number,
  b: number,
  operator: string
): number | null {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : null; // protection division par 0
    default:
      return null;
  }
}

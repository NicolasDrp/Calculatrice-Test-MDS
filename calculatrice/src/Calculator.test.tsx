import { calculate } from "./utils/calculate";
import {
  addToHistory,
  clearHistory,
  HistoryEntry,
} from "./utils/historyManager";

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

  describe("historyManager", () => {
    test("ajoute un calcul à l'historique", () => {
      const initialHistory: HistoryEntry[] = [];
      const newHistory = addToHistory(initialHistory, "2 + 2", "4");

      expect(newHistory).toHaveLength(1);
      expect(newHistory[0]).toEqual({ expression: "2 + 2", result: "4" });
    });

    test("ajoute plusieurs calculs à l'historique", () => {
      const history: HistoryEntry[] = [{ expression: "1 + 1", result: "2" }];
      const newHistory = addToHistory(history, "3 * 3", "9");

      expect(newHistory).toHaveLength(2);
      expect(newHistory[1]).toEqual({ expression: "3 * 3", result: "9" });
    });

    test("réinitialise l’historique", () => {
      var history: HistoryEntry[] = [
        { expression: "1 + 1", result: "2" },
        { expression: "2 * 3", result: "6" },
      ];

      history = clearHistory();

      expect(history).toEqual([]);
      expect(history).toHaveLength(0);
    });

    test("revenir sur un calcul précédent à partir de l'historique", () => {
      const history: HistoryEntry[] = [
        { expression: "5 + 5", result: "10" },
        { expression: "3 * 2", result: "6" },
      ];

      const lastItem = history[0]; // "5 + 5 = 10"
      const parts = lastItem.expression.split(" ");
      const previous = parts[0]; // "5"
      const operator = parts[1]; // "+"
      const current = lastItem.result; // "10"

      expect(previous).toBe("5");
      expect(operator).toBe("+");
      expect(current).toBe("10");
    });
  });
});

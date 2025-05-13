import React, { useState } from "react";
import { calculate } from "./utils/calculate";
import {
  addToHistory,
  clearHistory,
  HistoryEntry,
} from "./utils/historyManager";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleNumberClick = (number: string) => {
    setDisplay(display === "0" ? number : display + number);
  };

  const handleOperatorClick = (op: string) => {
    if (previous && operator) {
      performCalculation();
    }
    setPrevious(display);
    setOperator(op);
    setDisplay("0");
  };

  const handleEqualsClick = () => {
    if (previous && operator) {
      performCalculation();
    }
  };

  const performCalculation = () => {
    const prevNum = parseFloat(previous || "0");
    const currentNum = parseFloat(display);

    if (operator) {
      const result = calculate(prevNum, currentNum, operator);

      if (result !== null) {
        const expression = `${prevNum} ${operator} ${currentNum}`;
        const resultStr = result.toString();
        setDisplay(resultStr);

        // Utiliser historyManager
        const newHistory = addToHistory(history, expression, resultStr);
        setHistory(newHistory);
      } else {
        setDisplay("Error");
      }

      setOperator(null);
      setPrevious(null);
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
  };

  const handleHistoryClick = (item: HistoryEntry) => {
    setDisplay(item.result);
    const parts = item.expression.split(" ");
    if (parts.length === 3) {
      setPrevious(parts[0]);
      setOperator(parts[1]);
    }
  };

  const handleClearHistory = () => {
    setHistory(clearHistory());
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{display}</div>
        <div>
          <div>
            <button onClick={() => handleNumberClick("1")}>1</button>
            <button onClick={() => handleNumberClick("2")}>2</button>
            <button onClick={() => handleNumberClick("3")}>3</button>
            <button onClick={() => handleOperatorClick("+")}>+</button>
          </div>
          <div>
            <button onClick={() => handleNumberClick("4")}>4</button>
            <button onClick={() => handleNumberClick("5")}>5</button>
            <button onClick={() => handleNumberClick("6")}>6</button>
            <button onClick={() => handleOperatorClick("-")}>-</button>
          </div>
          <div>
            <button onClick={() => handleNumberClick("7")}>7</button>
            <button onClick={() => handleNumberClick("8")}>8</button>
            <button onClick={() => handleNumberClick("9")}>9</button>
            <button onClick={() => handleOperatorClick("*")}>*</button>
          </div>
          <div>
            <button onClick={() => handleNumberClick("0")}>0</button>
            <button onClick={handleEqualsClick}>=</button>
            <button onClick={handleClearClick}>C</button>
            <button onClick={() => handleOperatorClick("/")}>/</button>
          </div>
        </div>
      </div>

      <div>
        <h3>Historique</h3>
        <button onClick={handleClearHistory} style={{ marginBottom: "0.5rem" }}>
          Effacer l'historique
        </button>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <button onClick={() => handleHistoryClick(item)}>
                {item.expression} = {item.result}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;

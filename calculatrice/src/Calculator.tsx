import React, { useState } from "react";
import { calculate } from "./utils/calculate";
import {
  addToHistory,
  clearHistory,
  HistoryEntry,
} from "./utils/historyManager";
import "./Calculator.css";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const isError = display === "Error";

  const handleNumberClick = (number: string) => {
    if (isError) {
      // Commencer un nouveau calcul après une erreur
      setDisplay(number);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (isError) return; // empêcher action si erreur

    if (previous && operator) {
      performCalculation();
    }
    setPrevious(display);
    setOperator(op);
    setDisplay("0");
  };

  const handleEqualsClick = () => {
    if (isError) return; // empêcher action si erreur

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
    if (isError) return; // empêcher usage de l'historique après erreur

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
    <div className="calculator-container">
      <div>
        <div className="display">{display}</div>
        <div className="button-grid">
          <div>
            <button className="number" onClick={() => handleNumberClick("1")}>
              1
            </button>
            <button className="number" onClick={() => handleNumberClick("2")}>
              2
            </button>
            <button className="number" onClick={() => handleNumberClick("3")}>
              3
            </button>
            <button
              className="operator"
              onClick={() => handleOperatorClick("+")}
              disabled={isError}
            >
              +
            </button>
          </div>
          <div>
            <button className="number" onClick={() => handleNumberClick("4")}>
              4
            </button>
            <button className="number" onClick={() => handleNumberClick("5")}>
              5
            </button>
            <button className="number" onClick={() => handleNumberClick("6")}>
              6
            </button>
            <button
              className="operator"
              onClick={() => handleOperatorClick("-")}
              disabled={isError}
            >
              -
            </button>
          </div>
          <div>
            <button className="number" onClick={() => handleNumberClick("7")}>
              7
            </button>
            <button className="number" onClick={() => handleNumberClick("8")}>
              8
            </button>
            <button className="number" onClick={() => handleNumberClick("9")}>
              9
            </button>
            <button
              className="operator"
              onClick={() => handleOperatorClick("*")}
              disabled={isError}
            >
              *
            </button>
          </div>
          <div>
            <button className="number" onClick={() => handleNumberClick("0")}>
              0
            </button>
            <button
              className="equals"
              onClick={handleEqualsClick}
              disabled={isError}
            >
              =
            </button>
            <button className="clear" onClick={handleClearClick}>
              C
            </button>
            <button
              className="operator"
              onClick={() => handleOperatorClick("/")}
              disabled={isError}
            >
              /
            </button>
          </div>
        </div>
      </div>

      <div className="history">
        <h3>Historique</h3>
        <button className="history-clear" onClick={handleClearHistory}>
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

import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumberClick = (number: string) => {
    setDisplay(display === "0" ? number : display + number);
  };

  const handleOperatorClick = (op: string) => {
    if (previous && operator) {
      calculate();
    }
    setPrevious(display);
    setOperator(op);
    setDisplay("0");
  };

  const handleEqualsClick = () => {
    if (previous && operator) {
      calculate();
    }
  };

  const calculate = () => {
    let result: number;
    const prevNum = parseFloat(previous || "0");
    const currentNum = parseFloat(display);

    switch (operator) {
      case "+":
        result = prevNum + currentNum;
        break;
      case "-":
        result = prevNum - currentNum;
        break;
      case "*":
        result = prevNum * currentNum;
        break;
      case "/":
        result = prevNum / currentNum;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setOperator(null);
    setPrevious(null);
  };

  const handleClearClick = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
  };

  return (
    <div>
      <div>{display}</div>
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
  );
};

export default Calculator;

import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
function useCounter(step = 1, defaultValue = 0) {
  const [count, setCount] = useState(defaultValue);
  const inc = () => setCount(c => c + step);
  const dec = () => setCount(c => c - step);
  return [count, inc, dec, setCount];
}

function useRange({ min = 0, max = 100, step = 1, defaultValue = 50 } = {}) {
  const [count, setCount] = useState(defaultValue);

  const toFixed = expr => {
    return parseFloat(expr.toFixed(2));
  };

  const decrement = () =>
    setCount(c => (toFixed(c - step) >= min ? toFixed(c - step) : c));
  const increment = () =>
    setCount(c => (toFixed(c + step) <= max ? toFixed(c + step) : c));

  return [count, increment, decrement, setCount];
}

function App() {
  const rangeOptions = {
    min: 0,
    max: 2,
    step: 0.1,
    defaultValue: 1
  };
  const [zoomValue, inc, dec, setZoomValue] = useRange(rangeOptions);

  function handleZoomChange(e) {
    setZoomValue(parseFloat(e.target.value));
  }
  function handleZoomInc(e) {
    inc();
  }
  function handleZoomDec(e) {
    dec();
  }
  return (
    <div className="App">
      <div style={{ zoom: zoomValue, backgroundColor: "#EAEAEA" }}>
        <h1>Hello CodeSandbox</h1>
      </div>
      <div className="range-control">
        <button onClick={handleZoomDec}>-</button>
        <input
          type="range"
          min={rangeOptions.min}
          max={rangeOptions.max}
          value={zoomValue}
          step={rangeOptions.step}
          onChange={handleZoomChange}
        />
        <button onClick={handleZoomInc}>+</button>
        <div>{Math.round(zoomValue * 100)}%</div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

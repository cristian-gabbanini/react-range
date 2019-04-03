import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

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

function Range(props) {
  const [value, inc, dec, setValue] = useRange(props);
  const { min, max, step, onChange } = props;

  useEffect(
    () => {
      onChange(value);
    },
    [value]
  );

  function handleZoomChange(e) {
    setValue(parseFloat(e.target.value));
  }
  function handleZoomInc(e) {
    inc();
  }
  function handleZoomDec(e) {
    dec();
  }

  return (
    <div className="range-control">
      <button onClick={handleZoomDec}>-</button>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={handleZoomChange}
      />
      <button onClick={handleZoomInc}>+</button>
      <div className="range-value">{Math.round(value * 100)}%</div>
    </div>
  );
}

function App() {
  const rangeOptions = {
    min: 0.05,
    max: 1,
    step: 0.05,
    defaultValue: 0.25
  };

  const [zoom, setZoom] = useState(rangeOptions.defaultValue);

  function rangeChangeHandler(value) {
    setZoom(value);
  }
  return (
    <div className="App">
      <figure
        style={{
          zoom: zoom,
          backgroundColor: "#EAEAEA",
          textAlign: "center",
          padding: 30,
          borderRadius: 15,
          display: "inline-block"
        }}
      >
        <img src="https://img.purch.com/h/1400/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn" />
      </figure>
      <Range {...rangeOptions} onChange={rangeChangeHandler} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

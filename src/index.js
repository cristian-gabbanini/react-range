import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
function useCounter(step = 1, defaultValue = 0) {
  const [count, setCount] = useState(defaultValue);
  const inc = () => setCount(c => c + step);
  const dec = () => setCount(c => c - step);
  return [count, inc, dec, setCount];
}

function App() {
  const [zoomValue, inc, dec, setZoomValue] = useCounter(0.1, 1);

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
      <div
        className="zoom"
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          backgroundColor: "#DADADA",
          borderRadius: 4
        }}
      >
        <button onClick={handleZoomDec}>-</button>
        <input
          type="range"
          min="0.3"
          max="5"
          value={zoomValue}
          step=".1"
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

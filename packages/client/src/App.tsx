import React from "react";
import { Input } from "antd";

import "./App.css";
import { useTextarea } from "./hooks/useTextarea";
import { TransformedSentense } from "./transformedSentence";

function App() {
  const { value, onChange } = useTextarea("");
  const TextArea = Input;

  return (
    <div className="App">
      <h1>notra</h1>
      <TextArea
        placeholder="Input text"
        allowClear
        value={value}
        onChange={onChange}
      />
      <TransformedSentense value={value}></TransformedSentense>
    </div>
  );
}

export default App;

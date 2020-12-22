import React from "react";

import "./App.css";
import { useTextarea } from "./hooks/useTextarea";
import { TransformedSentense } from "./transformedSentence";

function App() {
  const textareaProps = useTextarea("");

  return (
    <div className="App">
      <form>
        <textarea {...textareaProps} />
      </form>
      <TransformedSentense value={textareaProps.value}></TransformedSentense>
    </div>
  );
}

export default App;

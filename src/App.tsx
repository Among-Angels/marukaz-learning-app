import React, { useState } from "react";
import TinySegmenter from "tiny-segmenter";
import "./App.css";

const useInput = (initialValue: string) => {
  const [value, set] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    set(event.target.value);
  };

  return { value, onChange: handleChange };
};

function App() {
  const emailProps = useInput("");
  const passwordProps = useInput("");
  const [textareaValue, setTextareaValue] = useState("");
  const segmenter = new TinySegmenter();
  const tokenized = segmenter.segment(textareaValue);

  return (
    <div className="App">
      <form>
        <input type="email" {...emailProps} />
        <input type="password" {...passwordProps} />
        <textarea
          value={textareaValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setTextareaValue(e.target.value)
          }
        />
      </form>
      <p>{tokenized.join(" | ")}</p>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import logo from "./logo.svg";
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
      <p>{textareaValue}</p>
    </div>
  );
}

export default App;

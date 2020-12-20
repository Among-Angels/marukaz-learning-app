import React, { useEffect, useState } from "react";
import { tokenize } from "kuromojin";
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
  const [tokenized, setTokenized] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        tokenize(textareaValue, {
          dicPath: "/dict",
        }).then((results) => {
          setTokenized(results.map((x) => x["surface_form"]).join(" | "));
        }),
      700
    );
    return () => clearTimeout(timeOutId);
  }, [textareaValue]);

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
      <p>{tokenized}</p>
    </div>
  );
}

export default App;

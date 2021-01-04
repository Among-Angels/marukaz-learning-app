import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import urlJoin from "proper-url-join";

import "./App.css";
import { InputArea } from "./component/InputArea/InputArea";
import { TransformedSentense } from "./component/TransformedSentence/transformedSentence";

function App() {
  const [textAreaValue, setTextArea] = useState("");
  const initialTranslated = [{ word: "", translated: false }];
  const [translated, setTranslated] = useState(initialTranslated);

  const debounced_tokenized = useDebouncedCallback(() => {
    const baseUrl = new URL(window.location.href);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textAreaValue }),
    };
    fetch(urlJoin(baseUrl.pathname, "api/translate"), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setTranslated(data.translate);
      });
  }, 700);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = event.target.value;
    setTextArea(text);
    if (text) {
      debounced_tokenized.callback();
    } else {
      setTranslated(initialTranslated);
    }
  };
  return (
    <div className="App">
      <h1>notra</h1>
      <InputArea
        value={textAreaValue}
        onChange={handleTextAreaChange}
      ></InputArea>
      <TransformedSentense value={translated}></TransformedSentense>
    </div>
  );
}

export default App;

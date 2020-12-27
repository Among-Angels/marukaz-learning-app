import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import urlJoin from "proper-url-join";

type TransformedSentenseProps = {
  value: string;
};

export const TransformedSentense = (props: TransformedSentenseProps) => {
  const [translated, setTranslated] = useState("");

  const debounced_tokenized = useDebouncedCallback(() => {
    const baseUrl = new URL(window.location.href);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: props.value }),
    };
    fetch(urlJoin(baseUrl.pathname, "api/translate"), requestOptions)
      .then((response) => response.json())
      .then((data) => setTranslated(data.translate));
  }, 700);
  if (props.value) {
    debounced_tokenized.callback();
  }

  return <p>{translated}</p>;
};

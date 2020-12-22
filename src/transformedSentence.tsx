import { useState } from "react";
import { tokenize } from "kuromojin";
import { useDebouncedCallback } from "use-debounce";

type TransformedSentenseProps = {
  value: string;
};

export const TransformedSentense = (props: TransformedSentenseProps) => {
  const [tokenized, setTokenized] = useState("");

  const debounced_tokenized = useDebouncedCallback(
    () =>
      tokenize(props.value, {
        dicPath: "/dict",
      }).then((results) => {
        setTokenized(results.map((x) => x["surface_form"]).join(" | "));
      }),
    700
  );
  debounced_tokenized.callback();

  return <p>{tokenized}</p>;
};

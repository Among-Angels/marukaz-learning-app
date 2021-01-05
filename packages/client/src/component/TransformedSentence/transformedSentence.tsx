import fancify from "fancify";

import { Token } from "../../../../shared";

type TransformedSentenseProps = {
  value: Token[];
};

export const TransformedSentense = (props: TransformedSentenseProps) => {
  const TokensJoinReducer = (sentence: string, currToken: Token) => {
    if (currToken.translated) {
      const word = fancify({
        input: currToken.word,
        set: "math sans bold italic",
      });
      if (!sentence.endsWith(" ")) {
        sentence += " ";
      }
      sentence = sentence + word + " ";
    } else {
      sentence += currToken.word;
    }
    return sentence;
  };

  return <p>{props.value.reduce(TokensJoinReducer, "")}</p>;
};

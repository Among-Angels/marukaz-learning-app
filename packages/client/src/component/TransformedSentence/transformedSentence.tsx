import { Token } from "../../../../shared";

type TransformedSentenseProps = {
  value: Token[];
};

export const TransformedSentense = (props: TransformedSentenseProps) => {
  const TokensJoinReducer = (sentence: string, currToken: Token) => {
    if (currToken.translated && !sentence.endsWith(" ")) {
      sentence = sentence + " " + currToken.word + " ";
    } else {
      sentence += currToken.word;
    }
    return sentence;
  };

  return <p>{props.value.reduce(TokensJoinReducer, "")}</p>;
};

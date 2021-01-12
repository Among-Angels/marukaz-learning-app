type TransformedSentenceProps = {
  value: string;
};

export const TransformedSentence = (props: TransformedSentenceProps) => {
  return <p>{props.value}</p>;
};

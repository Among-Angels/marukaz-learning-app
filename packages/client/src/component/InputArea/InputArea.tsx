import React from "react";
import { Input } from "antd";

interface InputAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputArea: React.FC<InputAreaProps> = (props) => {
  const { TextArea } = Input;
  return (
    <TextArea
      placeholder="Input text"
      allowClear
      rows={4}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

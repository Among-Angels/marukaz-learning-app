import React from "react";
import { Input } from "antd";

import "./InputArea.css";

interface InputAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputArea: React.FC<InputAreaProps> = (props) => {
  const { TextArea } = Input;
  return (
    <TextArea
      className="InputArea"
      placeholder="Input text"
      allowClear
      showCount
      maxLength={500}
      rows={4}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

import { useState } from "react";

export const useTextarea = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  return { value, onChange: handleChange };
};

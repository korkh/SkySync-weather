import React, { useState, useEffect } from "react";
import { SearchInput } from "./styled";

interface Props {
  onChange: (value: string) => void;
  delay: number;
  placeholder: string;
}

const DebounceInput = ({ onChange, delay, placeholder }: Props) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, onChange, delay]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <SearchInput
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default DebounceInput;

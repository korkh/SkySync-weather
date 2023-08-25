import React, { useState, useEffect } from "react";
import { SearchInput } from "./styled";
import { observer } from "mobx-react-lite";

interface Props {
  onChange: (value: string) => void;
  delay: number;
  placeholder: string;
  value: string;
}

const DebounceInput = ({ value, onChange, delay, placeholder }: Props) => {
  const [internalValue, setInternalValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(internalValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [internalValue, onChange, delay]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
  };

  return (
    <SearchInput
      type="text"
      value={internalValue}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default observer(DebounceInput);

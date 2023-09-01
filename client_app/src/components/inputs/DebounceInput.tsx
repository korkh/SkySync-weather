import React, { useState, useEffect, forwardRef } from "react";
import { SearchInput } from "./styled";
import { observer } from "mobx-react-lite";

interface Props {
  ref: HTMLInputElement;
  onChange: (value: string) => void;
  delay: number;
  placeholder: string;
  value: string;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DebounceInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, delay, placeholder, onKeyPress }: Props, ref) => {
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
        ref={ref}
        type="text"
        value={internalValue}
        onChange={handleInputChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
      />
    );
  }
);

export default observer(DebounceInput);

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
  (Props, ref) => {
    const [internalValue, setInternalValue] = useState<string>(Props.value);

    useEffect(() => {
  const timer = setTimeout(() => {
    Props.onChange(internalValue);
  }, Props.delay || 500);

  return () => clearTimeout(timer);
}, [internalValue, Props]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
    };

    return (
      <SearchInput
        ref={ref}
        type="text"
        value={internalValue}
        onChange={handleInputChange}
        onKeyUp={Props.onKeyPress}
        placeholder={Props.placeholder}
      />
    );
  }
);

export default observer(DebounceInput);

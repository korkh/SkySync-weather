import { observer } from "mobx-react-lite";
import { IUnits, celsiusToFahrenheit } from "../../utils/unitsConverter";
import { useState } from "react";

interface Size {
  tiny: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}
interface Props {
  value: number;
  units: IUnits | undefined;
  size?: "tiny" | "small" | "medium" | "large" | "extraLarge";
}

const Temperature = ({ value, units, size }: Props) => {
  const [dimensions] = useState<Size>({
    tiny: "1rem",
    small: "3rem",
    medium: "5rem",
    large: "7rem",
    extraLarge: "9rem",
  });

  const spanStyle = {
    fontSize: dimensions[size || "tiny"],
  };
  if (units === IUnits.CELSIUS) {
    return <span style={spanStyle}>{celsiusToFahrenheit(value)}&deg;</span>;
  }

  return <span style={spanStyle}>{Math.round(value)}&deg;</span>;
};

export default observer(Temperature);

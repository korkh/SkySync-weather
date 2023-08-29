import { observer } from "mobx-react-lite";
import { IUnits, celsiusToFahrenheit } from "../../utils/unitsConverter";
import { useState } from "react";

interface Size {
  tiny: string;
  tinyL: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

interface Colors {
  inherit: string;
  black: string;
  red: string;
  grey: string;
}
interface Props {
  value: number;
  units: IUnits | undefined;
  size?: "tiny" | "tinyL" | "small" | "medium" | "large" | "extraLarge";
  color?: "red" | "black" | "inherit" | "grey";
}

const Temperature = ({ value, units, size, color }: Props) => {
  const [dimensions] = useState<Size>({
    tiny: "1rem",
    tinyL: "1.5rem",
    small: "3rem",
    medium: "5rem",
    large: "7rem",
    extraLarge: "9rem",
  });

  const [colors] = useState<Colors>({
    inherit: "inherit",
    black: "black",
    red: "red",
    grey: "grey",
  });

  const spanStyle = {
    fontSize: dimensions[size || "tiny"],
    color: colors[color || "inherit"],
  };
  if (units === IUnits.CELSIUS) {
    return <span style={spanStyle}>{celsiusToFahrenheit(value)}&deg;</span>;
  }

  return <span style={spanStyle}>{Math.round(value)}&deg;</span>;
};

export default observer(Temperature);

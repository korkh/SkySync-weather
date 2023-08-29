import React, { CSSProperties, useState } from "react";

interface Size {
  tiny: { width: string; height: string };
  tinyL: { width: string; height: string };
  small: { width: string; height: string };
  medium: { width: string; height: string };
  large: { width: string; height: string };
  extraLarge: { width: string; height: string };
}

interface Props {
  iconCode: string;
  size?: keyof Size;
  style?: CSSProperties;
}

const WeatherIcon = ({ iconCode, size, style }: Props) => {
  const baseURL = process.env.REACT_APP_ICON_URL;
  const imageUrl = `${baseURL}/${iconCode}@2x.png`;
  const [dimensions] = useState<Size>({
    tiny: { width: "5rem", height: "5rem" },
    tinyL: { width: "7rem", height: "7rem" },
    small: { width: "10rem", height: "10rem" },
    medium: { width: "15rem", height: "15rem" },
    large: { width: "20rem", height: "20rem" },
    extraLarge: { width: "25rem", height: "25rem" },
  });

  const sizeStyles = dimensions[size || "tiny"];

  const styles = {
    width: sizeStyles.width,
    height: sizeStyles.height,
    ...style,
  };

  return <img src={imageUrl} alt={iconCode} style={styles} />;
};

export default WeatherIcon;

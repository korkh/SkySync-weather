import React from "react";

interface Props {
  iconCode: string;
  isBig?: boolean;
}

const WeatherIcon = ({ iconCode, isBig }: Props) => {
  const baseURL = process.env.REACT_APP_ICON_URL;
  const imageUrl = `${baseURL}/${iconCode}@2x.png`;

  return isBig ? (
    <img
      src={imageUrl}
      alt={iconCode}
      style={{ width: "150px", height: "150px" }}
    />
  ) : (
    <img src={imageUrl} alt={iconCode} />
  );
};

export default WeatherIcon;

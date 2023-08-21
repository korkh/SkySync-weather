import Temperature from "../weatherComponents/Temperature";
import { ForecastItemContainer } from "./styled";
import WeatherIcon from "../weatherComponents/WeatherIcon";
import { observer } from "mobx-react-lite";

interface Props {
  day: string;
  weatherCode: number;
  high: number;
  low: number;
  main: string;
}

const ForecastBoard = ({ day, weatherCode, high, low, main }: Props) => {
  return (
    <ForecastItemContainer>
      <h6>{day}</h6>
      <WeatherIcon code={weatherCode} />
      <>{weatherCode}</>
      <p>{main}</p>
      <span>
        <Temperature value={high} />
        <sup>&deg;</sup>
        <small>/</small>
        <Temperature value={low} />
        <sup>&deg;</sup>
      </span>
    </ForecastItemContainer>
  );
};

export default observer(ForecastBoard);

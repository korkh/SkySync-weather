import React, { useEffect } from "react";
import {
  WeatherContainer,
  CurrentWeatherContainer,
  CurrentWeatherStatus,
  CurrentWeatherInfo,
  FeelsLike,
  HighLowContainer,
  WeatherDegree,
  InfoRow,
  Title,
} from "../weatherComponents/styled";
import { TempUnit, kmToMile } from "../../utils/unitsConverter";
import { useStore } from "../../stores/store";
import Temperature from "../weatherComponents/Temperature";
import { observer } from "mobx-react-lite";
import WeatherIcon from "../weatherComponents/WeatherIcon";
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from "react-icons/fa";
import { TbGauge } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import Switch from "../buttons/Switch";

const WeatherDashboard: React.FC = () => {
  const {
    appStore: { globalState, setTempUnit },
    weatherStore: { weatherState },
  } = useStore();
  const { tempUnit, isInitial } = globalState;
  const { weatherData, isError } = weatherState;

  useEffect(() => {
    if (isError) {
      console.log("Cannot load weather for this place");
    }
  }, [isError]);

  if (isInitial) return <></>;

  return (
    <WeatherContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title>Current Weather</Title>
        <div>
          <Switch onClick={() => setTempUnit()} />
        </div>
      </div>
      <CurrentWeatherContainer>
        <CurrentWeatherStatus>
          <h4>{weatherData.name}</h4>
          <div style={{ display: "flex" }}>
            <WeatherIcon code={weatherData.weather.id} isBig />
            <span>
              <Temperature value={weatherData.main.temp} />
              <sup>&deg;</sup>
            </span>
          </div>
          <h6>{weatherData.weather.description}</h6>
        </CurrentWeatherStatus>

        <CurrentWeatherInfo>
          <FeelsLike>
            Feels like
            <Temperature value={weatherData.main.feels_like} />
            <sup>&deg;</sup>
          </FeelsLike>
          <HighLowContainer>
            <WeatherDegree>
              <FaTemperatureHigh />
              <Temperature value={weatherData.main.temp_max} />
              <sup>&deg;</sup>
            </WeatherDegree>
            <WeatherDegree>
              <FaTemperatureLow />
              <Temperature value={weatherData.main.temp_min} />
              <sup>&deg;</sup>
            </WeatherDegree>
          </HighLowContainer>
          <InfoRow>
            <div>
              <WiHumidity /> Humidity
            </div>
            <span>{weatherData.main.humidity}%</span>
          </InfoRow>
          <InfoRow>
            <div>
              <FaWind /> Wind
            </div>
            <span>
              {tempUnit === TempUnit.CELSIUS
                ? weatherData.wind.speed
                : kmToMile(weatherData.wind.speed)}
              {tempUnit === TempUnit.CELSIUS ? "km/h" : "mph"}
            </span>
          </InfoRow>
          <InfoRow>
            <div>
              <TbGauge /> Pressure
            </div>
            <span>{weatherData.main.pressure}hPa</span>
          </InfoRow>
        </CurrentWeatherInfo>
      </CurrentWeatherContainer>
    </WeatherContainer>
  );
};

export default observer(WeatherDashboard);

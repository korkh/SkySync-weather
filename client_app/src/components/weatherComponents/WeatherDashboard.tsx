import React, { useEffect, useState } from "react";
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
import { IUnits, kmToMile } from "../../utils/unitsConverter";
import Temperature from "../weatherComponents/Temperature";
import WeatherIcon from "../weatherComponents/WeatherIcon";
import Switch from "../buttons/Switch";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import Forecast from "./forecasts/Forecast";
import agent from "../../api/agent";
import LoadingComponent from "../Loaders/LoadingComponent";
import { Icon } from "semantic-ui-react";

const WeatherDashboard: React.FC = () => {
  const [metricUnits, setMetricUnits] = useState<IUnits>(IUnits.FAHRENHEIT);

  const handleUnits = () => {
    setMetricUnits((prevUnits) =>
      prevUnits === IUnits.FAHRENHEIT ? IUnits.CELSIUS : IUnits.FAHRENHEIT
    );
  };

  const {
    weatherStore: {
      weatherState: { weatherData, weatherDaily },
      isLoading,
    },
  }: any = useStore();

  const [mainWeatherData, setMainWeatherData] = useState(weatherData);
  const [dailyWeatherData, setDailyWeatherData] = useState(weatherDaily);

  //persisting data throug localStorage
  useEffect(() => {
    if (
      agent.Services.getWeather() !== null &&
      agent.Services.getDailyWeather() !== null
    ) {
      setMainWeatherData(agent.Services.getWeather());
      setDailyWeatherData(agent.Services.getDailyWeather());
    } else {
      setMainWeatherData(weatherData);
      setDailyWeatherData(weatherDaily);
    }
  }, [weatherDaily, weatherData]);

  return (
    <>
      {mainWeatherData.cod === 200 ? (
        <>
          <WeatherContainer>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>Current Weather</Title>
              <div>
                <Switch onClick={() => handleUnits()} />
              </div>
            </div>
            <CurrentWeatherContainer>
              <CurrentWeatherStatus>
                <h6>{mainWeatherData.name}</h6>
                <div style={{ alignItems: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <WeatherIcon
                      iconCode={mainWeatherData.weather[0].icon}
                      isBig
                    />
                    <span>
                      <Temperature
                        value={mainWeatherData.main.temp}
                        units={metricUnits}
                        size="large"
                      />
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      marginRight: "1rem",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6>
                    {mainWeatherData
                      ? mainWeatherData.weather[0].description
                      : mainWeatherData && mainWeatherData.weather[0].main
                      ? mainWeatherData.weather[0].main
                      : null}
                  </h6>
                  <FeelsLike>
                    <div>Feels like</div>
                    <Temperature
                      value={mainWeatherData.main.feels_like}
                      units={metricUnits}
                      size="small"
                    />
                  </FeelsLike>
                </div>
              </CurrentWeatherStatus>
              <CurrentWeatherInfo>
                <HighLowContainer>
                  <WeatherDegree>
                    <Icon name="thermometer half" size="large" />
                    <Temperature
                      value={mainWeatherData.main.temp_max}
                      units={metricUnits}
                    />
                    <small>&#10247;</small>
                    <Temperature
                      value={mainWeatherData.main.temp_min}
                      units={metricUnits}
                    />
                  </WeatherDegree>
                </HighLowContainer>
                <InfoRow>
                  <span>
                    <Icon name="tint" size="large" /> Humidity
                  </span>
                  <span>{mainWeatherData.main.humidity}%</span>
                </InfoRow>
                <InfoRow>
                  <span>
                    <Icon name="exchange" size="large" />
                    <span>Wind / Gust</span>
                  </span>
                  <span>
                    {metricUnits
                      ? `${mainWeatherData.wind.speed} / ${mainWeatherData.wind.gust}`
                      : kmToMile(mainWeatherData.wind.speed)}
                    {metricUnits ? " km/h" : " mph"}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span>
                    <Icon name="dashboard" size="large" />
                    Pressure
                  </span>
                  <span>{mainWeatherData.main.pressure}hPa</span>
                </InfoRow>
              </CurrentWeatherInfo>
            </CurrentWeatherContainer>
          </WeatherContainer>
          <Forecast dailyWeather={dailyWeatherData} tempUnits={metricUnits} />
        </>
      ) : isLoading ? (
        <LoadingComponent content="Loading.." />
      ) : null}
    </>
  );
};

export default observer(WeatherDashboard);

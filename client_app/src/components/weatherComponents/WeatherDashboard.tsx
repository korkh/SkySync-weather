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
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from "react-icons/fa";
import { TbGauge } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import Switch from "../buttons/Switch";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import Forecast from "./forecasts/Forecast";
import agent from "../../api/agent";
import LoadingComponent from "../Loaders/LoadingComponent";

const WeatherDashboard: React.FC = () => {
  const [metricUnits, setMetricUnits] = useState<IUnits>(IUnits.FAHRENHEIT);

  const handleUnits = () => {
    setMetricUnits((prevUnits) =>
      prevUnits === IUnits.FAHRENHEIT ? IUnits.CELSIUS : IUnits.FAHRENHEIT
    );
    console.log(metricUnits);
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
                <h4>{mainWeatherData.name}</h4>
                <div style={{ alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
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
                  >
                    <FeelsLike>
                      <p>Feels like</p>
                      <Temperature
                        value={mainWeatherData.main.feels_like}
                        units={metricUnits}
                        size="small"
                      />
                    </FeelsLike>
                  </div>
                </div>
                <h6>
                  {mainWeatherData
                    ? mainWeatherData.weather[0].description
                    : mainWeatherData && mainWeatherData.weather[0].main
                    ? mainWeatherData.weather[0].main
                    : null}
                </h6>
              </CurrentWeatherStatus>
              <CurrentWeatherInfo>
                <HighLowContainer>
                  <WeatherDegree>
                    <FaTemperatureHigh />
                    <div>
                      <Temperature
                        value={mainWeatherData.main.temp_max}
                        units={metricUnits}
                      />
                    </div>
                  </WeatherDegree>
                  <WeatherDegree>
                    <FaTemperatureLow />
                    <Temperature
                      value={mainWeatherData.main.temp_min}
                      units={metricUnits}
                    />
                  </WeatherDegree>
                </HighLowContainer>
                <InfoRow>
                  <div>
                    <WiHumidity /> Humidity
                  </div>
                  <span>{mainWeatherData.main.humidity}%</span>
                </InfoRow>
                <InfoRow>
                  <div>
                    <FaWind /> Wind / Gust
                  </div>
                  <span>
                    {metricUnits
                      ? `${mainWeatherData.wind.speed} / ${mainWeatherData.wind.gust}`
                      : kmToMile(mainWeatherData.wind.speed)}
                    {metricUnits ? " km/h" : " mph"}
                  </span>
                </InfoRow>
                <InfoRow>
                  <div>
                    <TbGauge /> Pressure
                  </div>
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

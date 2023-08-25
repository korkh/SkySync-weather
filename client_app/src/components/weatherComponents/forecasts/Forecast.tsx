import React, { useEffect, useState } from "react";
import { Title } from "../styled";
import { ForecastContainer, ForecastItems } from "./styled";
import ForecastBoard from "./ForecastBoard";
import { observer } from "mobx-react-lite";
import agent from "../../../api/agent";
import { DailyWeatherData } from "../../../interfaces/DailyWeatherData";
import { IUnits } from "../../../utils/unitsConverter";
import eventBus from "../../../api/EventBus";
import ForecastBoardMobile from "./ForecastBoardMobile";

interface Props {
  dailyWeather: DailyWeatherData[];
  tempUnits: IUnits;
}

const Forecast = ({ dailyWeather, tempUnits }: Props) => {
  const [data, setData] = useState<any>([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [expandedDates, setExpandedDates] = useState<{
    [date: string]: boolean;
  }>({});

  const transformData = async () => {
    try {
      const updatedData = agent.Services.dataTransformation(dailyWeather);
      setData(updatedData);
    } catch (error) {
      console.error("An error occurred during data transformation", error);
    }
  };

  useEffect(() => {
    if (!dailyWeather || dailyWeather.length === 0) {
      return;
    }
    transformData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyWeather]);

  useEffect(() => {
    try {
      const handleResize = () => setScreenSize(window.innerWidth);
      eventBus.win.on("resize", handleResize);
      return () => {
        eventBus.win.off("resize", handleResize);
      };
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <ForecastContainer>
      <Title>Daily weather forecast</Title>
      <ForecastItems>
        {data.map((item: any, i: number) => {
          const isExpanded = expandedDates[item.date];
          return (
            <React.Fragment key={i}>
              {screenSize > 768 ? (
                <ForecastBoard
                  day={item.day}
                  date={item.date}
                  time={item.time}
                  high={item.temp.temp_max}
                  low={item.temp.temp_min}
                  icon={item.weather.icon}
                  description={
                    item.weather
                      ? item.weather.description
                      : item.weather && item.weather.main
                      ? item.weather.main
                      : null
                  }
                  pop={item.pop}
                  precMm={item.rain && item.rain.precMm}
                  tempUnits={tempUnits}
                  onClick={() => {
                    setExpandedDates((prevState) => ({
                      ...prevState,
                      [item.date]: !prevState[item.date],
                    }));
                  }}
                  isExpanded={isExpanded}
                />
              ) : (
                <ForecastBoardMobile
                  day={item.day}
                  date={item.date}
                  time={item.time}
                  high={item.temp.temp_max}
                  low={item.temp.temp_min}
                  icon={item.weather.icon}
                  description={
                    item.weather
                      ? item.weather.description
                      : item.weather && item.weather.main
                      ? item.weather.main
                      : null
                  }
                  tempUnits={tempUnits}
                  onClick={() => {
                    setExpandedDates((prevState) => ({
                      ...prevState,
                      [item.date]: !prevState[item.date],
                    }));
                  }}
                  isExpanded={isExpanded}
                />
              )}
            </React.Fragment>
          );
        })}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default observer(Forecast);

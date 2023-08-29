import React, { useEffect, useState } from "react";
import { Title } from "../styled";
import { ForecastContainer, ForecastItems, ToggleAllButton } from "./styled";
import ForecastBoard from "./ForecastBoard";
import { observer } from "mobx-react-lite";
import agent from "../../../api/agent";
import { DailyWeatherData } from "../../../interfaces/DailyWeatherData";
import { IUnits } from "../../../utils/unitsConverter";
import eventBus from "../../../api/EventBus";
import ForecastBoardMobile from "./ForecastBoardMobile";
import ForecastMainBoard from "./ForecastMainBoard";
import { Icon } from "semantic-ui-react";

interface Props {
  dailyWeather: DailyWeatherData[];
  tempUnits: IUnits;
}

const Forecast = ({ dailyWeather, tempUnits }: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    if (!dailyWeather || dailyWeather.length === 0) {
      return;
    }
    try {
      const updatedData = agent.Services.dataTransformation(dailyWeather);
      setData(updatedData);
    } catch (error) {
      console.error("An error occurred during data transformation", error);
    }
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

  // Group forecast items by date
  const groupedData: { [date: string]: any[] } = {};
  data.forEach((item: any) => {
    const dateKey = `${item.month}-${item.day}`;
    if (!groupedData[dateKey]) {
      groupedData[dateKey] = [];
    }
    groupedData[dateKey].push(item);
  });

  // Sort the keys (date strings) in ascending order
  const sortedKeys = Object.keys(groupedData).sort();

  // Initialize expanded state
  const initialExpandedState: { [date: string]: boolean } = {};

  sortedKeys.forEach((dateKey, index) => {
    initialExpandedState[dateKey] = index === 0;
  });

  const [expandedIndexes, setExpandedIndexes] = useState(initialExpandedState);

  const handleToggle = () => {
    const resetState: { [date: string]: boolean } = {};
    Object.keys(expandedIndexes).forEach((date) => {
      resetState[date] = false;
    });
    setExpandedIndexes(resetState);
  };

  const toggleExpansionForDate = (day: string) => {
    setExpandedIndexes((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };
  // console.log("groupedData", groupedData);
  // console.log("initialExpandedState", initialExpandedState);
  // console.log("expandedIndexes", expandedIndexes);

  return (
    <ForecastContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title>Daily weather forecast</Title>
        <ToggleAllButton onClick={handleToggle}>
          {Object.values(expandedIndexes).every((value) => !value) ? (
            <Icon name="expand" />
          ) : (
            <Icon name="compress" />
          )}
        </ToggleAllButton>
      </div>
      <ForecastItems>
        {sortedKeys.map((day: string, i: number) => (
          <div key={i}>
            <ForecastMainBoard
              day={groupedData[day][0].day}
              month={groupedData[day][0].month}
              weekDay={groupedData[day][0].weekDay}
              time={groupedData[day][0].time}
              high={groupedData[day][0].temp.temp_max}
              low={groupedData[day][0].temp.temp_min}
              icon={groupedData[day][0].weather.icon}
              description={
                groupedData[day][0].weather
                  ? groupedData[day][0].weather.description
                  : groupedData[day][0].weather &&
                    groupedData[day][0].weather.main
                  ? groupedData[day][0].weather.main
                  : null
              }
              pop={groupedData[day][0].pop}
              precMm={
                groupedData[day][0].rain && groupedData[day][0].rain.precMm
              }
              tempUnits={tempUnits}
              isExpanded={expandedIndexes[day]}
              onClick={() => toggleExpansionForDate(day.toString())}
            />
            {expandedIndexes[day] &&
              groupedData[day].slice(1).map((item: any, j: number) => {
                // start from index 1
                // console.log(groupedData[day].slice(1));
                if (!item.day) {
                  return null;
                }
                const isExpanded = expandedIndexes[day];
                // console.log("isExpanded", isExpanded);
                return (
                  <React.Fragment key={j}>
                    {screenSize > 768 ? (
                      <ForecastBoard
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
                        isExpanded={isExpanded}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        ))}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default observer(Forecast);

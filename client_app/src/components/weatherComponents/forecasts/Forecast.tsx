import { Title } from "../styled";
import { ForecastContainer, ForecastItems } from "./styled";
import ForecastBoard from "./ForecastBoard";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import agent from "../../../api/agent";
import { DailyWeatherData } from "../../../interfaces/DailyWeatherData";
import { IUnits } from "../../../utils/unitsConverter";

interface Props {
  dailyWeather: DailyWeatherData[];
  tempUnits: IUnits;
}

const Forecast = ({ dailyWeather, tempUnits }: Props) => {
  const [data, setData] = useState<any>([]);

  const transformData = async () => {
    try {
      setData(agent.Services.dataTransformation(dailyWeather));
    } catch (error) {
      console.error("An error occured during data transformation", error);
    }
  };

  useEffect(() => {
    transformData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyWeather]);

  return (
    <ForecastContainer>
      <Title>Daily weather forecast</Title>
      <ForecastItems>
        {data.map((item: any, i: number) => {
          return (
            <ForecastBoard
              key={i}
              day={item.day}
              date={item.date}
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
            />
          );
        })}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default observer(Forecast);

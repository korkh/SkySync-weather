import { useStore } from "../../stores/store";
import { Title } from "../weatherComponents/styled";
import { ForecastContainer, ForecastItems } from "../forecasts/styled";
import ForecastBoard from "../forecasts/ForecastBoard";
import { Loader } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const Forecast = () => {
  const {
    appStore: { globalState },
    weatherStore: { weatherState },
  } = useStore();
  const { isInitial, isLoading } = globalState;
  const { extendedWeatherData } = weatherState;

  if (isInitial) return <></>;
  return (
    <ForecastContainer>
      <Title>Extended Forecast</Title>
      <ForecastItems>
        <Loader active={isLoading} />
        {extendedWeatherData.map((item, i) => {
          return (
            <ForecastBoard
              key={i}
              day={item.day}
              high={item.temp.temp_max}
              low={item.temp.temp_min}
              weatherCode={item.weather.id}
              main={item.weather.main}
            />
          );
        })}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default observer(Forecast);

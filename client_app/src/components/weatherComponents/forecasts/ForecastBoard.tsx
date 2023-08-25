import Temperature from "../Temperature";
import { ForecastItemContainer } from "./styled";
import WeatherIcon from "../WeatherIcon";
import { useEffect, useState } from "react";
import { IUnits } from "../../../utils/unitsConverter";
import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";

interface Props {
  day: string;
  date: string;
  high: IUnits;
  low: IUnits;
  description: string;
  icon: string;
  tempUnits: IUnits;
}

const ForecastBoard = ({
  day,
  date,
  high,
  low,
  description,
  icon,
  tempUnits,
}: Props) => {
  const [metricUnits, setMetricUnits] = useState<IUnits | undefined>(undefined);
  useEffect(() => {
    if (tempUnits) {
      setMetricUnits(IUnits.FAHRENHEIT);
    } else {
      setMetricUnits(IUnits.CELSIUS);
    }
  }, [tempUnits]);

  return (
    <ForecastItemContainer>
      <h6>{day}</h6>
      <h6>{date}</h6>
      <div>
        <WeatherIcon iconCode={icon} />
        <p>{description}</p>
        <span>
          <Icon name="thermometer half" size="large" />
          <Temperature value={high} units={metricUnits} />
          <small>&#10247;</small>
          <Temperature value={low} units={metricUnits} />
        </span>
      </div>
    </ForecastItemContainer>
  );
};

export default observer(ForecastBoard);

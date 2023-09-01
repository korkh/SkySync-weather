import Temperature from "../Temperature";
import { ForecastItemContainer } from "./styled";
import WeatherIcon from "../WeatherIcon";
import { CSSProperties, useEffect, useState } from "react";
import { IUnits } from "../../../utils/unitsConverter";
import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";

interface Props {
  time: string;
  high: IUnits;
  low: IUnits;
  description: string;
  icon: string;
  tempUnits: IUnits;
  pop: number;
  precMm: number | null;
  onClick?: () => void;
  isExpanded: boolean;
  style?: CSSProperties;
}

const ForecastBoard = ({
  time,
  high,
  low,
  description,
  icon,
  tempUnits,
  pop,
  precMm,
  onClick,
  isExpanded,
  style,
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
    <>
      {isExpanded && (
        <ForecastItemContainer onClick={onClick} style={style}>
          <span style={{ display: "block" }}>
            <h6 style={{ color: "grey" }}>{time}</h6>
          </span>
          <div>
            <WeatherIcon
              iconCode={icon}
              style={{ filter: "brightness(0.8)" }}
              size="tiny"
            />
            <p>{description}</p>
            <span>
              <p>Precip: {pop > 90 ? ">90" : pop}%</p>
              <p>{precMm}</p>
            </span>
            <span>
              <Icon name="thermometer half" size="large" />
              <Temperature value={high} units={metricUnits} />
              <small>&#10247;</small>
              <Temperature value={low} units={metricUnits} />
            </span>
          </div>
        </ForecastItemContainer>
      )}
    </>
  );
};

export default observer(ForecastBoard);

import Temperature from "../Temperature";
import WeatherIcon from "../WeatherIcon";
import { CSSProperties, useEffect, useState } from "react";
import { IUnits } from "../../../utils/unitsConverter";
import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import eventBus from "../../../api/EventBus";
import { ForecastMainItemContainer } from "./styled";

interface Props {
  day: string;
  weekDay: string;
  month: string;
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

const ForecastMainBoard = ({
  day,
  weekDay,
  month,
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
}: Props) => {
  const [metricUnits, setMetricUnits] = useState<IUnits | undefined>(undefined);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

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

  useEffect(() => {
    if (tempUnits) {
      setMetricUnits(IUnits.FAHRENHEIT);
    } else {
      setMetricUnits(IUnits.CELSIUS);
    }
  }, [tempUnits]);

  return (
    <>
      <ForecastMainItemContainer onClick={onClick}>
        <span style={{ display: "block" }}>
          {isExpanded ? (
            <Icon name="caret up" color="grey" size="large" />
          ) : (
            <Icon name="caret down" color="grey" size="large" />
          )}
          {month}
          <h3>{day}</h3>
          <h6>{weekDay}</h6>
          <h6 style={{ color: "grey" }}>{time}</h6>
        </span>
        <div>
          <WeatherIcon
            iconCode={icon}
            style={{ filter: "brightness(0.6)" }}
            size="tinyL"
          />
          <p>{description}</p>
          {screenSize > 768 && (
            <span>
              <p>Precip: {pop > 90 ? ">90" : pop}%</p>
              <p>{precMm}</p>
            </span>
          )}
          <span>
            <Icon name="thermometer half" size="large" />
            <Temperature value={high} units={metricUnits} />
            <small>&#10247;</small>
            <Temperature value={low} units={metricUnits} />
          </span>
        </div>
      </ForecastMainItemContainer>
    </>
  );
};

export default observer(ForecastMainBoard);

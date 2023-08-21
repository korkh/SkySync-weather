import { getWeatherFromCode } from "../../utils/weatherCodes";
import { ReactComponent as CloudyIcon } from "../../assets/weatherStates/cloudy.svg";
import { ReactComponent as FogIcon } from "../../assets/weatherStates/fog.svg";
import { ReactComponent as HeavyRainIcon } from "../../assets/weatherStates/heavyRain.svg";
import { ReactComponent as PartlyCloudyIcon } from "../../assets/weatherStates/partlyCloudy.svg";
import { ReactComponent as RainIcon } from "../../assets/weatherStates/rain.svg";
import { ReactComponent as SleetIcon } from "../../assets/weatherStates/sleet.svg";
import { ReactComponent as SnowIcon } from "../../assets/weatherStates/snow.svg";
import { ReactComponent as ClearSkyIcon } from "../../assets/weatherStates/clear.svg";
import { ReactComponent as ThunderstormIcon } from "../../assets/weatherStates/thunderstorm.svg";
import { ReactComponent as DrizzleIcon } from "../../assets/weatherStates/drizzle.svg";

interface Props {
  code: number;
  isBig?: boolean;
}
const WeatherIcon = ({ code, isBig }: Props) => {
  let Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const weatherCondition = getWeatherFromCode(code);
  switch (weatherCondition) {
    case "Clear":
      Icon = ClearSkyIcon;
      break;
    case "Partly cloudy":
      Icon = PartlyCloudyIcon;
      break;
    case "Cloudy":
      Icon = CloudyIcon;
      break;
    case "Rain":
      Icon = RainIcon;
      break;
    case "Heavy rain":
      Icon = HeavyRainIcon;
      break;
    case "Drizzle":
      Icon = DrizzleIcon;
      break;
    case "Thunderstorm":
      Icon = ThunderstormIcon;
      break;
    case "Snow":
      Icon = SnowIcon;
      break;
    case "Sleet":
      Icon = SleetIcon;
      break;
    case "Fog":
      Icon = FogIcon;
      break;
    default:
      Icon = ClearSkyIcon;
  }

  return isBig ? (
    <Icon style={{ width: "100px", height: "100px" }} />
  ) : (
    <Icon />
  );
};

export default WeatherIcon;

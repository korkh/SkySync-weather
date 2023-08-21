import { toast } from "react-toastify";

export function getWeatherFromCode(code: number) {
  let weatherCondition: string = "";
  if (!code) return toast.error("Weather code was not detected!");

  switch (code) {
    // Clear
    case 800:
      weatherCondition = "Clear";
      break;

    // Cloud
    case 801 | 802:
      weatherCondition = "Partly cloudy";
      break;
    case 803 | 804:
      weatherCondition = "Cloudy";
      break;

    // Rain
    case 500 | 501 | 520 | 521 | 511:
      weatherCondition = "Rain";
      break;
    case 502 | 503 | 504 | 522 | 531:
      weatherCondition = "Heavy rain";
      break;

    // Drizzle
    case 300 | 301 | 302 | 310 | 311 | 312 | 313 | 314 | 321:
      weatherCondition = "Drizzle";
      break;

    // Thunderstorm
    case 200 | 201 | 202 | 210 | 211 | 212 | 221 | 230 | 231 | 232:
      weatherCondition = "Thunderstorm";
      break;

    // Snow
    case 600 | 601 | 602 | 612 | 613 | 615 | 616 | 620 | 621 | 622:
      weatherCondition = "Snow";
      break;
    case 611:
      weatherCondition = "Sleet";
      break;

    // Atmosphere
    case 701 | 711 | 721 | 731 | 741 | 751 | 761 | 762 | 771 | 781:
      weatherCondition = "Fog";
      break;

    default:
      weatherCondition = "Clear";
  }
  return weatherCondition;
}

export function getWeatherFromCode(code: number) {
  let weatherCondition: string = "";
  if (!code) return;

  switch (code) {
    // Clear
    case 800:
      weatherCondition = "Clear";
      break;

    // Cloud
    case 801:
    case 802:
      weatherCondition = "Partly cloudy";
      break;
    case 803:
    case 804:
      weatherCondition = "Cloudy";
      break;

    // Rain
    case 500:
    case 501:
    case 520:
    case 521:
    case 511:
      weatherCondition = "Rain";
      break;
    case 502:
    case 503:
    case 504:
    case 522:
    case 531:
      weatherCondition = "Heavy rain";
      break;

    // Drizzle
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      weatherCondition = "Drizzle";
      break;

    // Thunderstorm
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      weatherCondition = "Thunderstorm";
      break;

    // Snow
    case 600:
    case 601:
    case 602:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      weatherCondition = "Snow";
      break;
    case 611:
      weatherCondition = "Sleet";
      break;

    // Atmosphere
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      weatherCondition = "Fog";
      break;

    default:
      weatherCondition = "Clear";
  }
  return weatherCondition;
}

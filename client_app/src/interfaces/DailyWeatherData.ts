export type DailyWeatherData = {
  day: string;
  date: string;
  temp: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    description: string;
    icon: string;
  };
};

export type DailyWeatherData = {
  day: string;
  date: string;
  time: string;
  temp: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    description: string;
    icon: string;
  };
  rain?: {
    precMm: number;
  };
  pop: number;
};

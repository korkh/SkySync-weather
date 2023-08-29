export type DailyWeatherData = {
  weekDay: string;
  day: number;
  month: string;
  year: number;
  time?: string;
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

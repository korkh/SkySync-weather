import { makeAutoObservable } from "mobx";
import { WeatherState } from "../interfaces/WeatherState";
// import { transformWeatherData } from "../utils/transformWeatherDataUtil";
import agent from "../api/agent";

export default class WeatherStore {
  weatherState: WeatherState = {
    weatherData: {
      main: {
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
      },
      name: "",
      sys: {
        country: "",
        sunrise: 0,
        sunset: 0,
      },
      weather: {
        id: 200,
        main: "",
        description: "",
        icon: "",
      },
      wind: {
        deg: 0,
        speed: 0,
      },
    },
    extendedWeatherData: [],
    isError: false,
  };
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  fetchWeatherData = async (place: string | { lat: number; lon: number }) => {
    this.setLoading(true);
    try {
      const response: any =
        typeof place === "string"
          ? await agent.Weather.getByCity(place)
          : await agent.WeatherExtended.getByPosition(place);
      this.setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      this.weatherState.isError = true;
      this.setLoading(false);
    }
  };

  fetchCities = async (params: URLSearchParams) => {
    try {
      const locations = await agent.Locations.get(params);
      return locations;
    } catch (error) {
      this.weatherState.isError = true;
    }
  };
}

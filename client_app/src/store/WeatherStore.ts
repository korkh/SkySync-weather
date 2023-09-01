import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { CurrentDate } from "../interfaces/CurrentDate";

export type WeatherState = {
  weatherData: any[];
  weatherDaily: any[];
  location: string | { lat: number; lon: number };
  isError: boolean;
  currentDate: CurrentDate;
};
export default class WeatherStore {
  weatherState: WeatherState = {
    weatherData: [],
    weatherDaily: [],
    isError: false,
    location: "",
    currentDate: {
      day: 0,
      weekDay: "",
      year: 0,
      month: "",
      time: "",
    },
  };
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading = (state: boolean) => {
    this.isLoading = state;
  };

  getPlace = async (searchTerm: string) => {
    try {
      const locations = await agent.Locations.getPlace(searchTerm);
      runInAction(() => {
        this.weatherState.location = locations;
      });
      return locations;
    } catch (error) {
      this.weatherState.isError = true;
    }
  };

  setPlace = (place: string) => {
    try {
      console.log("Place in store", place);
      this.weatherState.location = place;
    } catch (error) {
      this.weatherState.isError = true;
    }
  };

  fetchWeatherByPlace = async (searchTerm: string) => {
    this.setIsLoading(true);
    try {
      // const location = await this.getPlace(searchTerm);
      const response: any = await agent.Weather.getByPlace(searchTerm);
      runInAction(() => {
        this.setPlace(searchTerm);
        this.weatherState.weatherData = response;
        agent.Services.setWeather(response);
        this.setIsLoading(false);
      });
      return response;
    } catch (error) {
      console.log(error);
      this.weatherState.isError = true;
      this.setIsLoading(false);
    }
  };

  fetchWeatherByPosition = async () => {
    this.setIsLoading(true);
    try {
      const response: any = await agent.Weather.getByPosition();

      runInAction(() => {
        this.weatherState.weatherData = response;
        agent.Services.setWeather(response);
      });
      this.setIsLoading(false);
      return response;
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.weatherState.isError = true;
      });
      this.setIsLoading(false);
    }
  };

  fetchDailyWeatherByPlace = async (searchTerm: string) => {
    this.setIsLoading(true);
    try {
      const response: any = await agent.DailyWeather.getByPlace(searchTerm!);
      runInAction(() => {
        this.weatherState.location = searchTerm;
        this.weatherState.weatherData = response;
        agent.Services.setDailyWeather(response);
        this.setIsLoading(false);
      });

      return response;
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.weatherState.isError = true;
        this.setIsLoading(false);
      });
    }
  };

  fetchDailyWeatherByPosition = async () => {
    this.setIsLoading(true);
    try {
      const response: any = await agent.DailyWeather.getByPosition();

      runInAction(() => {
        this.weatherState.weatherDaily = response;
        this.setIsLoading(false);
      });
      return response;
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.weatherState.isError = true;
        this.setIsLoading(false);
      });
    }
  };

  getWeatherByPlace = async (searchTerm: string) => {
    this.setIsLoading(true);
    try {
      runInAction(async () => {
        await this.fetchWeatherByPlace(searchTerm);
        await this.fetchDailyWeatherByPlace(searchTerm);
        this.setIsLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.weatherState.isError = true;
        this.setIsLoading(false);
      });
    }
  };

  getWeatherByPosition = async () => {
    this.setIsLoading(true);
    try {
      runInAction(async () => {
        await this.fetchWeatherByPosition();
        await this.fetchDailyWeatherByPosition();
        this.setIsLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.weatherState.isError = true;
        this.setIsLoading(false);
      });
    }
  };

  getCurrentDate = (date: number) => {
    this.setIsLoading(true);
    try {
      const currentDateObj = agent.Services.getDate(date);
      console.log("current date object in store", currentDateObj);
      runInAction(() => {
        this.weatherState.currentDate = currentDateObj;
        this.setIsLoading(false);
      });
      return currentDateObj;
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.weatherState.isError = true;
        this.setIsLoading(false);
      });
    }
  };

  clearStore = () => {
    agent.Services.clearStore();
    runInAction(() => {
      this.weatherState = {
        weatherData: [],
        weatherDaily: [],
        isError: false,
        location: "",
        currentDate: {
          day: 0,
          weekDay: "",
          year: 0,
        },
      };
      this.isLoading = false;
    });
  };
}

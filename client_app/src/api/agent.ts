import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { getWeekDays } from "../utils/calendarUtils";
import { DailyWeatherData } from "../interfaces/DailyWeatherData";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const mainURL = process.env.REACT_APP_API_URL;
const cityURL = process.env.REACT_APP_API_CITY_URL;

const ax: AxiosInstance = axios.create();

//For city SearchElement
ax.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (process.env.NODE_ENV === "development") await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { status } = error.response as AxiosResponse;

    switch (status) {
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        toast.error("not found");
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const Locations = {
  getPlace: async (searchTerm: string) => {
    const search = new URLSearchParams({
      q: searchTerm,
      format: "json",
      addressdetails: "1",
      limit: "6",
    });

    try {
      const response: AxiosResponse = await ax.get(
        `${cityURL}?${search.toString()}`
      );

      const filteredData = response.data
        .filter((item: any) => item.addresstype === "city")
        .map((item: any) => {
          const city = item.display_name.split(",")[0];
          const countryIndex = item.display_name.split(",").length - 1;
          const country = item.display_name.split(",")[countryIndex].trim();
          return `${city}, ${country}`;
        });
      return filteredData;
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast.error("An error occured when tried to get location");
    }
  },
  getPosition: async () => {
    return new Promise<any>((resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ lat: latitude, lon: longitude });
          },
          (error) => {
            console.log("Error getting geolocation:", error);
            toast.error("Error getting geolocation.");
            reject(error);
          }
        );
      } catch (error) {
        console.log("Geolocation is not available in this browser.");
        toast.error("Geolocation is not available in this browser.");
        reject(error);
      }
    });
  },
};

const Weather = {
  getByPosition: async () => {
    try {
      const psn: { lat: number; lon: number } = await Locations.getPosition();
      Services.setLocationToStore(psn);
      const response: AxiosResponse = await ax.get(
        `${mainURL}/weather?lat=${psn.lat}&lon=${psn.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      Services.setWeather(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather by position: ", error);
      toast.error("Error fetching weather by position");
      return [];
    }
  },
  getByPlace: async (place: string) => {
    try {
      Services.setLocationToStore(place);
      const response: AxiosResponse = await ax.get(
        `${mainURL}/weather?q=${place}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather by place: ", error);
      toast.error("Error fetching weather by place");
      return [];
    }
  },
};

const DailyWeather = {
  getByPosition: async () => {
    try {
      const psn: { lat: number; lon: number } = await Locations.getPosition();
      const response: AxiosResponse = await ax.get(
        `${mainURL}/forecast?lat=${psn.lat}&lon=${psn.lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );
      Services.setDailyWeather(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching daily weather by position: ", error);
      toast.error("Error fetching daily weather by position ");
      return [];
    }
  },
  getByPlace: async (place: string) => {
    try {
      const response: AxiosResponse = await ax.get(
        `${mainURL}/forecast?q=${place}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Services.setDailyWeather(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching daily weather by plcae: ", error);
      toast.error("Error fetching daily weather by plcae ");
      return [];
    }
  },
};

const Services = {
  getWeather: (): any => {
    let storedData = localStorage.getItem("weather") || JSON.stringify([]);
    if (storedData) {
      return JSON.parse(storedData);
    }
  },
  getDailyWeather: (): any => {
    let storedData = localStorage.getItem("dailyWeather") || JSON.stringify([]);
    if (storedData) {
      return JSON.parse(storedData);
    }
  },
  setWeather: (data: any) => {
    if (localStorage.getItem("weather") === null) {
      let storedData = JSON.stringify(data);
      localStorage.setItem("weather", storedData);
    }
  },
  setDailyWeather: (data: any) => {
    if (localStorage.getItem("dailyWeather") === null) {
      let storedData = JSON.stringify(data);
      localStorage.setItem("dailyWeather", storedData);
    }
  },
  getLocationFromStore: (): any => {
    let storedData = localStorage.getItem("location") || JSON.stringify([]);
    if (storedData) {
      return JSON.parse(storedData);
    }
  },
  setLocationToStore: (data: any) => {
    if (localStorage.getItem("location") === null || "") {
      let storedData = JSON.stringify(data);
      localStorage.setItem("location", storedData);
    }
  },
  removeItemFromStore: (item?: string | null) => {
    if (typeof item === "string") {
      localStorage.removeItem(item);
    }
  },
  clearStore: () => {
    localStorage.clear();
  },
  dataTransformation: (data: any): DailyWeatherData[] => {
    console.log("Forecast data in agent", data);
    const forecast: DailyWeatherData[] = [];
    const week = getWeekDays(data.list.length);

    if (!data || !data.list || !Array.isArray(data.list)) {
      return forecast;
    }

    data.list.forEach((item: any, i: number) => {
      forecast.push({
        day: week[i],
        date: new Date(item.dt_txt).getDate().toString(),
        temp: {
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
        },
        weather: {
          id: item.weather[0].id,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        },
      });
    });

    console.log("forecast in agent", forecast);
    return forecast;
  },
};

const agent = {
  ax,
  Locations,
  Weather,
  DailyWeather,
  Services,
};

export default agent;

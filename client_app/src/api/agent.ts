import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { DailyWeatherData } from "../interfaces/DailyWeatherData";
import { CurrentDate } from "../interfaces/CurrentDate";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const mainURL = process.env.REACT_APP_API_URL; 
const cityURL = process.env.REACT_APP_API_CITY_URL;
const apiKey = process.env.REACT_APP_API_KEY;

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
        router.navigate("/");
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

      const filteredData = response.data.map((item: any) => {
        const parts = item.display_name.split(",");
        const city = parts[0];
        const country = parts[parts.length - 1].trim();
        return `${city}, ${country}`;
      });
      
      return filteredData;
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast.error("An error occurred when tried to get location");
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
      agent.Services.clearStore();
      const psn: { lat: number; lon: number } = await Locations.getPosition();

      Services.setLocationToStore(psn);
      const response: AxiosResponse = await ax.get(
        `${mainURL}/weather?lat=${psn.lat}&lon=${psn.lon}&units=metric&appid=${apiKey}`
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
      agent.Services.clearStore(); 
      Services.setLocationToStore(place);
      const response: AxiosResponse = await ax.get(
        `${mainURL}/weather?q=${place}&units=metric&appid=${apiKey}`
      );
      Services.setWeather(response.data);
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

      Services.setLocationToStore(psn);
      const response: AxiosResponse = await ax.get(
        `${mainURL}/forecast?lat=${psn.lat}&lon=${psn.lon}&units=metric&APPID=${apiKey}`
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
        `${mainURL}/forecast?q=${place}&units=metric&APPID=${apiKey}`
      );
      // await new Promise((resolve) => setTimeout(resolve, 2000));
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
    localStorage.setItem("weather", JSON.stringify(data));
},
setDailyWeather: (data: any) => {
    localStorage.setItem("dailyWeather", JSON.stringify(data));
},
  getLocationFromStore: (): any => {
    let storedData = localStorage.getItem("location") || JSON.stringify([]);
    if (storedData) {
      return JSON.parse(storedData);
    }
  },
 setLocationToStore: (data: any) => {
    localStorage.setItem("location", JSON.stringify(data));
  },
  setCurrentDateToStore: (data: CurrentDate) => {
    localStorage.setItem("currentDate", JSON.stringify(data));
  },
  getCurrentDateFromStore: (key: string): any => {
    let storedData = localStorage.getItem("currentDate");
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
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
    const forecast: DailyWeatherData[] = [];
    // const week = getWeekDays(data.list.length);

    if (!data || !data.list || !Array.isArray(data.list)) {
      return forecast;
    }

    data.list.forEach((item: any) => {
      const date = Services.getDate(item.dt);

      forecast.push({
        weekDay: date.weekDay,
        day: date.day,
        year: date.year,
        month: date.month,
        time: date.time,
        temp: {
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
        },
        weather: {
          id: item.weather[0].id,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        },
        pop: Math.round(item.pop * 100),
        rain: {
          precMm: item.rain?.["3h"],
        },
      });
    });
    return forecast;
  },
  getDate: (data: number) => {
    // Convert UNIX timestamp to milliseconds
    const timestampInMillis = data * 1000;

    // Create a new Date object using the converted timestamp
    const dateObject = new Date(timestampInMillis);

    // Extracting date, week day, month, year, and time from the Date object
    const day = dateObject.getDate();
    const weekDay = dateObject
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    const month = dateObject
      .toLocaleDateString("en-US", { month: "short" })
      .toUpperCase();
    const year = dateObject.getFullYear();

    const time = dateObject.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const currentDate = {
      day: day,
      weekDay: weekDay,
      month: month,
      year: year,
      time: time,
    };

    Services.setCurrentDateToStore(currentDate);
    return currentDate;
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

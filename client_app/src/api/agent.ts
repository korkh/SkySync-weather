import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../stores/store";
import { router } from "../router/Routes";

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
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        toast.error("not found");
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const Locations = {
  get: async (params: URLSearchParams) => {
    try {
      const response: AxiosResponse = await ax.get(
        `${cityURL}?${params.toString()}`
      );

      const filteredData = response.data
        .filter((item: any) => item.addresstype === "city")
        .map((item: any) => {
          const city = item.display_name.split(",")[0];
          const countryIndex = item.display_name.split(",").length - 1;
          const country = item.display_name.split(",")[countryIndex].trim();
          return `${city}, ${country}`;
        });
      console.log(filteredData);
      return filteredData;
    } catch (error) {
      console.error("Error fetching locations:", error);
      return [];
    }
  },
};

const Weather = {
  getByPosition: async (place: { lat: string; lon: string }) => {
    try {
      const response: AxiosResponse = await ax.get(
        `${mainURL}/weather?lat=${place.lat}&lon=${place.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching locations: ", error);
      return [];
    }
  },
  getByCity: async (place: string) => {
    try {
      const response: AxiosResponse = await ax.get(
        `${mainURL}/weather?q=${place}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching place: ", error);
      return [];
    }
  },
};

const WeatherExtended = {
  getByPosition: async (place: { lat: number; lon: number }) =>
    ax.get(
      `${mainURL}/forecast/daily?lat=${place.lat}&lon=${place.lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    ),
  getByCity: async (place: string) =>
    ax.get(
      `${mainURL}/forecast/daily?q=${place}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    ),
};

const agent = {
  ax,
  Locations,
  Weather,
  WeatherExtended,
};

export default agent;

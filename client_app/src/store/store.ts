import { createContext, useContext } from "react";
import WeatherStore from "./WeatherStore";
import AppStore from "./AppStore";

//Interface for all stores we created
interface Store {
  appStore: AppStore;
  weatherStore: WeatherStore;
}

export const store: Store = {
  appStore: new AppStore(),
  weatherStore: new WeatherStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

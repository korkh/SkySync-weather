import { createContext, useContext } from "react";
import AppStore from "./AppStore";
import WeatherStore from "./WeatherStore";
import CommonStore from "./CommonStore";
import ThemeStore from "./ThemeStore";
//interfaces for all stores
interface Store {
  appStore: AppStore;
  weatherStore: WeatherStore;
  commonStore: CommonStore;
  themeStore: ThemeStore;
}

export const store: Store = {
  appStore: new AppStore(),
  weatherStore: new WeatherStore(),
  commonStore: new CommonStore(),
  themeStore: new ThemeStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

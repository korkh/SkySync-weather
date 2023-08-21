import { makeAutoObservable } from "mobx";
import { TempUnit } from "../utils/unitsConverter";

interface IGlobalState {
  tempUnit: TempUnit;
  isLoading: boolean;
  isInitial: boolean;
  darkMode: boolean | null;
}
export default class AppStore {
  globalState: IGlobalState;

  constructor() {
    this.globalState = {
      tempUnit: TempUnit.CELSIUS,
      isLoading: false,
      isInitial: true,
      darkMode: null,
    };

    makeAutoObservable(this);
  }

  toggleDarkMode() {
    const newDarkModeValue =
      this.globalState.darkMode === null ? false : !this.globalState.darkMode;

    localStorage.setItem("darkMode", newDarkModeValue.toString());
    this.globalState.darkMode = newDarkModeValue;
  }

  setTempUnit() {
    this.globalState.tempUnit =
      this.globalState.tempUnit === TempUnit.CELSIUS
        ? TempUnit.FAHRENHEIT
        : TempUnit.CELSIUS;
  }

  setIsLoading(isLoading: boolean) {
    this.globalState.isLoading = isLoading;
  }

  setIsInitial(isInitial: boolean) {
    this.globalState.isInitial = isInitial;
  }
}

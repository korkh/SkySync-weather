import { makeAutoObservable } from "mobx";
import { IUnits } from "../utils/unitsConverter";

interface IGlobalState {
  tempUnit: IUnits;
  isLoading: boolean;
  isInitial: boolean;
}
export default class AppStore {
  globalState: IGlobalState;

  constructor() {
    this.globalState = {
      tempUnit: IUnits.CELSIUS,
      isLoading: false,
      isInitial: true,
    };

    makeAutoObservable(this);
  }

  setTempUnit() {
    this.globalState.tempUnit =
      this.globalState.tempUnit === IUnits.CELSIUS
        ? IUnits.FAHRENHEIT
        : IUnits.CELSIUS;
  }

  setIsLoading(isLoading: boolean) {
    this.globalState.isLoading = isLoading;
  }

  setIsInitial(isInitial: boolean) {
    this.globalState.isInitial = isInitial;
  }
}

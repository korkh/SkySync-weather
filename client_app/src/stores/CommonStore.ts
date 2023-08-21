import { makeAutoObservable } from "mobx";
import { IServerError } from "../interfaces/IServerError";

export default class CommonStore {
  error: IServerError | null = null;
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  setServerError(error: IServerError) {
    this.error = error;
  }

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}

import { makeAutoObservable } from "mobx";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export default class ThemeStore {
  themeMode: ThemeMode = ThemeMode.LIGHT;

  constructor() {
    makeAutoObservable(this);
  }

  toggleTheme() {
    this.themeMode =
      this.themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
  }
}

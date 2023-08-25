export interface ITheme {
  titleColor: string;
  backgroundImage?: any;
  backgroundGradient: {
    color1: string;
    color2: string;
  };
  container_BgColor: string;
  container_TitleColor: string;
  forecastPanelBgColor: string;
  searchInput: {
    color: string;
    placeholderColor: string;
  };
  temperatureSwitch: {
    backgroundColor: string;
    sliderColor: string;
    textColor: string;
  };
  searchSuggestion: {
    backgroundColor: string;
    hoverBackgroundColor: string;
    seperatorLineColor: string;
  };
  smallIconColor: string;
  smallIconTextColor: string;
}

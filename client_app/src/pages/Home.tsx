import LoadingComponent from "../components/Loaders/LoadingComponent";
import Footer from "../components/footer/Footer";
import Forecast from "../components/forecasts/Forecast";
import Header from "../components/header/Header";
import PlaceSearch from "../components/inputs/PlaceSearch";
import WeatherDashboard from "../components/weatherComponents/WeatherDashboard";
import { useStore } from "../stores/store";

const Home = () => {
  const {
    appStore: { globalState },
  } = useStore();
  const { isLoading } = globalState;

  return (
    <>
      {isLoading && <LoadingComponent />}
      <Header />
      <PlaceSearch />
      <WeatherDashboard />
      <Forecast />
      <Footer />
    </>
  );
};

export default Home;

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import PlaceSearch from "../components/inputs/PlaceSearch";
import WeatherDashboard from "../components/weatherComponents/WeatherDashboard";
import { observer } from "mobx-react-lite";

const Home = () => {
  return (
    <>
      <Header />
      <PlaceSearch />
      <WeatherDashboard />
      <Footer />
    </>
  );
};

export default observer(Home);

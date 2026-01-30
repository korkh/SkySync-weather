import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import WeatherDashboard from "../components/weatherComponents/WeatherDashboard";
import { observer } from "mobx-react-lite";

const Home = () => {
  return (
    <>
      <Header />      
      <WeatherDashboard />
      <Footer />
    </>
  );
};

export default observer(Home);

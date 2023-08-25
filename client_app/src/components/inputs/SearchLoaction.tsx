import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import { useState } from "react";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import DebounceInput from "./DebounceInput";

const SearchLoaction = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const {
    weatherStore: { fetchWeatherByPlace, getWeatherByPosition, getPlace },
  } = useStore();

  const handleInputChange = async (value: string) => {
    setInputValue(value);

    try {
      const response = await getPlace(inputValue).then((res) => {
        setSuggestions(res);
      });
      console.log("Suggestions inside search component", suggestions);
      return response;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast.error("Error fetching suggestions");
    }
  };

  const handleSelectSuggestion = async (selectedSuggestion: string) => {
    // Fetch weather data using selectedSuggestion and OpenWeatherMap API
    // Display weather data or trigger weather component activation here
    console.log("Selected suggestion:", selectedSuggestion);

    try {
      const weatherResp = await fetchWeatherByPlace(selectedSuggestion);
      agent.Services.setWeather(weatherResp);
      return weatherResp;
    } catch (error) {
      console.error("Error occured when fetching weather:", error);
      toast.error("Error occured when fetching weather");
    }
  };

  return (
    <div>
      <DebounceInput
        value={inputValue}
        delay={300}
        onChange={handleInputChange}
        placeholder="Search for location here.."
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(SearchLoaction);

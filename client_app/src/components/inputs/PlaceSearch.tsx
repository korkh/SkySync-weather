import { useEffect, useRef, useState } from "react";
import { LocationButton, SearchElement, SearchResult } from "./styled";
import useOutsideClick from "../../hooks/useOutsideClick";
import SearchSuggestion from "../inputs/SearchSuggestions";
import { toast } from "react-toastify";
import { useStore } from "../../store/store";
import DebounceInput from "./DebounceInput";
import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
const PlaceSearch = () => {
  const suggestionRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {
    weatherStore: { getWeatherByPlace, getWeatherByPosition, getPlace },
  } = useStore();

  const handleInputChange = async (value: string) => {
    setInputValue(value);

    try {
      await getPlace(inputValue).then((res) => {
        setSuggestions(res);
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast.error("Error fetching suggestions");
    }
  };

  const handleWeatherForecastByPlace = async (place: string) => {
    try {
      await getWeatherByPlace(place).then((res) => {
        console.log("response inside plcaesearch", res);
      });
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Error fetching cities");
    }
  };

  const getWeatherByPsn = async () => {
    try {
      await getWeatherByPosition();
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Error fetching cities");
    }
  };

  useEffect(() => {
    if (!inputValue) return;

    setShowSuggestions(true);
  }, [inputValue]);

  useOutsideClick({
    element: suggestionRef,
    callBack: () => setShowSuggestions(false),
  });

  return (
    <SearchElement>
      <Icon name="search" size="large" color="teal" />
      <DebounceInput
        value={inputValue}
        delay={300}
        onChange={handleInputChange}
        placeholder="Search for location here.."
      />
      <LocationButton onClick={getWeatherByPsn}>
        <Icon name="crosshairs" size="large" color="teal" />
      </LocationButton>
      {showSuggestions && (
        <SearchResult ref={suggestionRef}>
          {suggestions?.slice(0, 6)?.map((suggestion, index) => (
            <SearchSuggestion
              key={index}
              label={suggestion}
              hide={() => {
                setShowSuggestions(false);
                handleWeatherForecastByPlace(suggestion);
              }}
            />
          ))}
        </SearchResult>
      )}
    </SearchElement>
  );
};

export default observer(PlaceSearch);

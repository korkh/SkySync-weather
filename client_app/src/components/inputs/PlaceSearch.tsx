import React, { useEffect, useRef, useState } from "react";
import {
  LocationButton,
  SearchElement,
  SearchResult,
  SuggestionItem,
} from "./styled";
import useOutsideClick from "../../hooks/useOutsideClick";
import { toast } from "react-toastify";
import { useStore } from "../../store/store";
import DebounceInput from "./DebounceInput";
import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";

const PlaceSearch = () => {
  const suggestionRef = useRef(null);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {
    weatherStore: { getWeatherByPosition, getPlace, getWeatherByPlace },
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

  const getWeatherByPsn = async () => {
    try {
      await getWeatherByPosition();
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Error fetching cities");
    }
  };

  const handleSelectSuggestion = async (place: string) => {
    try {
      await getWeatherByPlace(place);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error occurred when fetching weather:", error);
      toast.error("Error occurred when fetching weather");
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.trim() !== "") {
        setShowSuggestions(false);

        handleSelectSuggestion(inputValue);
      }
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
        ref={inputRef}
        value={inputValue}
        delay={300}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="Search for location here.."
      />
      <LocationButton onClick={getWeatherByPsn}>
        <Icon name="crosshairs" size="large" color="teal" />
      </LocationButton>
      {showSuggestions && (
        <SearchResult ref={suggestionRef}>
          {suggestions?.slice(0, 6)?.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </SearchResult>
      )}
    </SearchElement>
  );
};

export default observer(PlaceSearch);

import { useEffect, useRef, useState } from "react";
import { LocationButton, SearchElement, SearchResult } from "./styled";
import useOutsideClick from "../../hooks/useOutsideClick";
import { handleLocation } from "../../utils/locationUtils";
import SearchSuggestion from "../inputs/SearchSuggestions";
import DebounceInput from "./DebounceInput";
import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useStore } from "../../stores/store";

const PlaceSearch = () => {
  const {
    weatherStore: { fetchCities },
  } = useStore();
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState<any>();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      return;
    }

    const search = new URLSearchParams({
      q: searchTerm,
      format: "json",
      addressdetails: "1",
      limit: "6",
    });

    const fetchCitiesData = async () => {
      try {
        setShowSuggestions(true);
        const res = await fetchCities(search);
        setSuggestions(res);
      } catch (error) {
        // Handle the error here
        console.error("Error fetching cities:", error);
        toast.error("Error fetching cities");
      }
    };

    fetchCitiesData();
  }, [fetchCities, searchTerm]);

  useOutsideClick({
    element: suggestionRef,
    callBack: () => setShowSuggestions(false),
  });

  const onSearchInputChanged = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <SearchElement>
      <Icon name="search" size="big" color="teal" />
      <DebounceInput
        onChange={onSearchInputChanged}
        placeholder="Search for location"
        delay={200}
      />
      <LocationButton onClick={handleLocation}>
        <Icon name="location arrow" size="big" color="teal" />
      </LocationButton>
      {showSuggestions && (
        <SearchResult ref={suggestionRef}>
          {suggestions?.slice(0, 6)?.map((s: any, i: any) => (
            <SearchSuggestion
              key={i}
              label={s}
              hide={() => {
                setShowSuggestions(false);
              }}
            />
          ))}
        </SearchResult>
      )}
    </SearchElement>
  );
};

export default observer(PlaceSearch);

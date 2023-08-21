import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { SuggestionItem } from "./styled";

interface Props {
  label: string;
  hide: () => void;
}

const SearchSuggestion = ({ label, hide }: Props) => {
  const {
    weatherStore: { fetchWeatherData },
  } = useStore();
  function handleOnClick() {
    fetchWeatherData(label.split(",")[0]);
    setTimeout(() => {
      hide();
    }, 500);
  }
  return <SuggestionItem onClick={handleOnClick}>{label}</SuggestionItem>;
};

export default observer(SearchSuggestion);

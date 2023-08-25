import { SuggestionItem } from "./styled";
import agent from "../../api/agent";

interface Props {
  label: string;
  hide: () => void;
}

const SearchSuggestion = ({ label, hide }: Props) => {
  function handleOnClick() {
    agent.Weather.getByPlace(label.split(",")[0]);
    setTimeout(() => {
      hide();
    }, 400);
  }
  return <SuggestionItem onClick={handleOnClick}>{label}</SuggestionItem>;
};

export default SearchSuggestion;

import { SuggestionItem } from "./styled";

interface Props {
  label: string;
  hide: () => void;
}

const SearchSuggestion = ({ label, hide }: Props) => {
  function handleOnClick() {
    setTimeout(() => {
      hide();
    }, 400);
  }
  return <SuggestionItem onClick={handleOnClick}>{label}</SuggestionItem>;
};

export default SearchSuggestion;

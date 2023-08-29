import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import PlaceSearch from "../inputs/PlaceSearch";
import { HeaderContainer, HeaderTitle } from "./styled";

const Header = () => {
  const {
    weatherStore: { clearStore },
  }: any = useStore();

  const handleResetAll = () => {
    clearStore();
  };

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleResetAll} />
      <PlaceSearch />
    </HeaderContainer>
  );
};

export default observer(Header);

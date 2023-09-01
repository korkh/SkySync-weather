import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import PlaceSearch from "../inputs/PlaceSearch";
import { HeaderContainer, HeaderTitle } from "./styled";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate: NavigateFunction = useNavigate();
  const {
    weatherStore: { clearStore },
  }: any = useStore();

  const handleResetAll = () => {
    clearStore();
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleResetAll} />
      <PlaceSearch />
    </HeaderContainer>
  );
};

export default observer(Header);

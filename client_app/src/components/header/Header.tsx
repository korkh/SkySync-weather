import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import {
  HeaderContainer,
  HeaderTitle,
  HeaderIconsContainer,
  GithubLink,
} from "./styled";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  const { appStore } = useStore();
  const {
    globalState: { darkMode },
  } = appStore;
  console.log("appStore:", darkMode);

  //   const handleToggleDarkModde = () => {
  //     console.log("handleToggleDarkMode called"); // Add this line
  //     try {
  //       toggleDarkMode();
  //     } catch (error) {
  //       console.log("Error occured when toggleDarkMode", error);
  //     }
  //   };

  return (
    <HeaderContainer>
      <HeaderTitle>SkySync Weather</HeaderTitle>
      <HeaderIconsContainer>
        <GithubLink href="https://github.com/korkh/SkySync-WheatherApp">
          <FaGithub />
        </GithubLink>
      </HeaderIconsContainer>
    </HeaderContainer>
  );
};

export default observer(Header);

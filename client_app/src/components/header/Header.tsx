import {
  HeaderContainer,
  HeaderTitle,
  HeaderIconsContainer,
  GithubLink,
} from "./styled";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>SkySync Weather</HeaderTitle>
      <HeaderIconsContainer>
        <GithubLink href="https://github.com/korkh/SkySync-Weather">
          <FaGithub style={{ fontSize: 24 }} />
        </GithubLink>
      </HeaderIconsContainer>
    </HeaderContainer>
  );
};

export default Header;

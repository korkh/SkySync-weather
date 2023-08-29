import { Container, GithubLink } from "./styled";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <Container>
      <p>
        Developed By <span>Aleksander Korkh</span>
        <GithubLink href="https://github.com/korkh/SkySync-Weather">
          <FaGithub style={{ fontSize: 24 }} />
        </GithubLink>
      </p>
    </Container>
  );
};

export default Footer;

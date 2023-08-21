import styled from "styled-components";

export const Container = styled.footer`
  p {
    padding: 1rem 0;
    font-size: 1rem;
    text-align: center;
    color: #165d7b;
    span {
      color: #072e3d;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <p>
        Developed By <span>Aleksander Korkh</span>
      </p>
    </Container>
  );
};

export default Footer;

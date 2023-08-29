import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  margin-top: 1rem;
  bottom: 0;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;
export const HeaderTitle = styled.div`
  color: ${({ theme }) => theme.appTitleColor};
  font-size: 2.2rem;
  text-align: center;
  align-items: center;
  background-image: url(${require("../../assets/logo4.png")});
  width: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  height: 10rem;
  cursor: pointer;
`;

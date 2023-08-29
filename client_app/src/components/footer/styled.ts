import { styled } from "styled-components";

export const Container = styled.footer`
  p {
    padding: 1rem 0;
    font-size: 1rem;
    text-align: center;
    justify-items: center;
    color: #165d7b;
    span {
      color: #072e3d;
    }
  }
`;

export const GithubLink = styled.a`
  margin-left: 1rem;
  &:hover svg {
    fill: #20546a;
  }
`;

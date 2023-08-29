import { createGlobalStyle } from "styled-components";
import { ITheme } from "../interfaces/ITheme";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background: url(${require("../assets/skyBg.jpg")}) no-repeat center center fixed;
    background-size: cover;
  }
  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(230, 230, 255, 0.5);
    z-index: -1;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style-type: none;
  }
  #root {
  max-width: 960px;
  width: 100%;
  margin: auto 0;
  padding: 0 1rem;
}
`;

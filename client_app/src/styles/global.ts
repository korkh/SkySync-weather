import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
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
    background: whitesmoke;
    background-size: auto;
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

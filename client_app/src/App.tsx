import { ThemeProvider } from "styled-components";
import { mainTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <GlobalStyles />   
      <Outlet /> 
    </ThemeProvider>
  );
}

export default observer(App);

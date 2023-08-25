import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import { mainTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
}

export default observer(App);

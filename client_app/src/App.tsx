import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import { darkTheme, lightTheme } from "./styles/theme";
import { useStore } from "./stores/store";
import GlobalStyles from "./styles/global";
import { ToastContainer } from "react-toastify";

function App() {
  const {
    appStore: { globalState },
  } = useStore();
  const { darkMode } = globalState;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Home />
    </ThemeProvider>
  );
}

export default App;

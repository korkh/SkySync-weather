import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StoreContext, store } from "./stores/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);

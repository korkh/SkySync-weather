import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";
import "react-toastify/dist/ReactToastify.min.css";
import "semantic-ui-css/semantic.min.css";
import { StoreContext, store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);

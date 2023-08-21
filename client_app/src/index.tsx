import ReactDOM from "react-dom/client";
import { StoreContext, store } from "./stores/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);

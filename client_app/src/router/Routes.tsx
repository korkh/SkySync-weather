import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
// import NotFound from "../pages/NotFound";
// import ServerError from "../pages/ServerError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "not-found", element: <NotFound /> },
      // { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

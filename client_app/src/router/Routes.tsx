import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
// import NotFound from "../pages/NotFound";
// import ServerError from "../pages/ServerError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "not-found", element: <NotFound /> },
      // { path: "server-error", element: <ServerError /> },
      { path: "", element: <Home /> }, 
      // { path: "dashboard", element: <WeatherDashboard /> }, 
      { path: "*", element: <Navigate replace to="/" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

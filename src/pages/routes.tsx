import { lazy } from "react";
import ErrorPage from "../common/components/Error/ErrorPage";
import { routes as publicRoutes } from "../layout/routes";

const Public = lazy(() => import("../layout/public"));

export const routes = [
  {
    path: "/",
    element: <Public />,
    errorElement: <ErrorPage />,
    children: [...publicRoutes],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

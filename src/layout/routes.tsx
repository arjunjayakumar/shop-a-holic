import { lazy } from "react";

const LandingPage = lazy(() => import("../pages/landing"));
const CartPage = lazy(() => import("../pages/cart"));

const routes = [
  {
    path: "",
    element: <LandingPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
];

export { routes };

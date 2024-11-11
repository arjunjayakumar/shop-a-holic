import { lazy } from "react";

const LandingPage = lazy(() => import("../pages/landing"));
const CartPage = lazy(() => import("../pages/cart"));
const DetailPage = lazy(() => import("../pages/detail"));

const routes = [
  {
    path: "",
    element: <LandingPage />,
  },
  { path: ":productID/detail", element: <DetailPage /> },
  {
    path: "cart",
    element: <CartPage />,
  },
];

export { routes };

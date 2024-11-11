import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./pages/routes";
import { store } from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./common/components/Spinner/Spinner";

const router = createBrowserRouter([...routes]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <ToastContainer
          position="top-center"
          autoClose={3500}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          closeButton={false}
        />
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);

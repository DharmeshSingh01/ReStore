import { Navigate, createBrowserRouter } from "react-router-dom";
import { App } from "../layout";
import { HomePage } from "../../features/home";
import { CataLog, ProductDetails } from "../../features/catalog";
import { AboutUsPage } from "../../features/about";
import { ContactUsPage } from "../../features/contact";
import ServerError from "../../error/ServerError";
import NotFound from "../../error/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <CataLog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "contact", element: <ContactUsPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "basket", element: <BasketPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);

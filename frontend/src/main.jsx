import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home, PrivacyPolicy, RefundPolicy, TermsAndConditions } from "./pages";
import { AuthLayout } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <AuthLayout authentication={false}>
            <PrivacyPolicy />
          </AuthLayout>
        ),
      },
      {
        path: "/refund-policy",
        element: (
          <AuthLayout authentication={false}>
            <RefundPolicy />
          </AuthLayout>
        ),
      },
      {
        path: "/terms-and-conditions",
        element: (
          <AuthLayout authentication={false}>
            <TermsAndConditions />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);

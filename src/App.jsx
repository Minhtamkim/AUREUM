import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./components/dashboard";
import ManageProduct from "./pages/admin/manage-product";
import ManageAccount from "./pages/admin/manage-account";
import LoginPage from "./pages/Login";
import Layout from "./components/layout";
import ProfileAccount from "./pages/profileAccount/profile";
import RegisterPage from "./pages/Register";
import PoliciesPage from "./pages/aboutaureum/policies";
import AccountPage from "./pages/aboutaureum/account";
import PrivacyPolicyPage from "./pages/aboutaureum/privacypolicy";
import DeliveryPolicyPage from "./pages/aboutaureum/deliverypolicy";
import TermsofusePage from "./pages/aboutaureum/termsofuse";
import ReturnPolicyPage from "./pages/aboutaureum/returnpolicy";
import FrequentlyaskedquestionsPage from "./pages/aboutaureum/frequentlyaskedquestions";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "profile",
          element: <ProfileAccount />,
        },
        {
          path: "policies",
          element: <PoliciesPage />,
        },
        {
          path: "account",
          element: <AccountPage />,
        },
        {
          path: "privacypolicy",
          element: <PrivacyPolicyPage />,
        },
        {
          path: "deliverypolicy",
          element: <DeliveryPolicyPage />,
        },
        {
          path: "termsofuse",
          element: <TermsofusePage />,
        },
        {
          path: "returnpolicy",
          element: <ReturnPolicyPage />,
        },
        {
          path: "frequentlyaskedquestions",
          element: <FrequentlyaskedquestionsPage />,
        },
      ],
    },

    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },

    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "product",
          element: <ManageProduct />,
        },
        {
          path: "account",
          element: <ManageAccount />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

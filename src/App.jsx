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
import AccountPage from "./pages/aboutAureum/policyAccount";
import PrivacyPolicyPage from "./pages/aboutAureum/policyPrivacy";
import DeliveryPolicyPage from "./pages/aboutAureum/policyDelivery";
import TermsofusePage from "./pages/aboutaureum/termsofuse";
import ReturnPolicyPage from "./pages/aboutAureum/policyReturn";
import FrequentlyaskedquestionsPage from "./pages/aboutaureum/frequentlyaskedquestions";
import BlogPost from "./pages/Blog";
import Cart from "./pages/cart";
import ProductDetail from "./pages/product";
import ContactPage from "./pages/aboutaureum/contact";
import AccountInfor from "./pages/AccountInfor";
import AccountInfoPage from "./pages/AccountInfor";

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
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "blog",
          element: <BlogPost />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "product",
          element: <ProductDetail />,
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
      path: "accountinfor",
      element: <AccountInfoPage />,
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

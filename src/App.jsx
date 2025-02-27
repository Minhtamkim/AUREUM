import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./components/dashboard";
import ManageProduct from "./pages/admin/manage-product";
import ManageAccount from "./pages/admin/manage-account";
import LoginPage from "./pages/Login";
import Layout from "./components/layout";
import ProfileAccount from "./pages/profileAccount/profile";
import RegisterPage from "./pages/Register";
import BlogPost from "./pages/Blog";
import Cart from "./pages/cart";
import ProductDetail from "./pages/product";
import PoliciesShipping from "./pages/policies/policyShipping";
import AccountPage from "./pages/policies/policyAccount";
import PrivacyPolicyPage from "./pages/policies/policyPrivacy";
import DeliveryPolicyPage from "./pages/policies/policyDelivery";
import ReturnPolicyPage from "./pages/policies/policyReturn";
import ContactPage from "./pages/policies/contact";
import FrequentlyaskedquestionsPage from "./pages/policies/faq";
import TermsOfUsePage from "./pages/policies/termsOfUse";
import AboutUs from "./pages/aboutUs";
<<<<<<< HEAD
=======
import QuizPage from "./pages/Quiz";

import ProductsPage from "./pages/product/product_category";
import ManageCategory from "./pages/admin/manage-category";
>>>>>>> 98061225bcff844526f71e38bbb9b4ff93df66c6

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
          path: "policiesShipping",
          element: <PoliciesShipping />,
        },
        {
          path: "account",
          element: <AccountPage />,
        },
        {
          path: "privacyPolicy",
          element: <PrivacyPolicyPage />,
        },
        {
          path: "deliveryPolicy",
          element: <DeliveryPolicyPage />,
        },
        {
          path: "termsOfUse",
          element: <TermsOfUsePage />,
        },
        {
          path: "returnPolicy",
          element: <ReturnPolicyPage />,
        },
        {
          path: "frequentlyAskedQuestions",
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
        {
          path: "aboutUs",
          element: <AboutUs />,
        },
<<<<<<< HEAD
=======
        {
          path: "quiz",
          element: <QuizPage />,
        },

        {
          path: "products/:category_id",
          element: <ProductsPage />,
        },
>>>>>>> 98061225bcff844526f71e38bbb9b4ff93df66c6
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
        {
          path: "category",
          element: <ManageCategory />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

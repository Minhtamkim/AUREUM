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
import QuizPage from "./pages/Quiz";

import ProductsPage from "./pages/product/product_category";
import ManageCategory from "./pages/admin/manage-category";
import ManageIngredient from "./pages/admin/manage-ingredient";
import ManageBrand from "./pages/admin/manage-brand";
import QuizDetail from "./pages/Quiz/QuizDetail";
import QuizResult from "./pages/Quiz/QuizResult";
import ProductsBrandPage from "./pages/product/product_brand";
import ProductDetailPage from "./pages/product/product_details";
import BlogPost04 from "./pages/Blog/blog-details-4";
import BlogPost0 from "./pages/Blog/blog-details-0";
import BlogPost1 from "./pages/Blog/blog-details-1";
import BlogPost2 from "./pages/Blog/blog-details-2";
import BlogPost3 from "./pages/Blog/blog-details-3";
import BlogPost05 from "./pages/Blog/blog-details-5";
import BlogPost06 from "./pages/Blog/blog-details-6";
import BlogPostAll from "./pages/Blog/blog-details-all";
import HistoryOrders from "./pages/profileAccount/historyOrders";
import CategorySidebar from "./pages/Comparison/SidebarComparison";
import ProductList from "./pages/Comparison/ProductList";
import ProductComparison from "./pages/Comparison/productComparison";
import PaymentResult from "./pages/paymentResult";
import PrivateRoute from "./components/privateRouter";

function App() {
  const router = createBrowserRouter([
    // Nếu Người dùng chưa đăng kí tài khoản, truy câpj được những trang này
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "policiesShipping",
          element: <PoliciesShipping />,
        },
        {
          path: "accountPolicy",
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
          path: "blogs/cot-loi-cua-viec-chong-lao-hoa-nam-o-dau",
          element: <BlogPost0 />,
        },
        {
          path: "blogs/quang-tham-mat-va-cach-khac-phuc-hieu-qua",
          element: <BlogPost1 />,
        },
        {
          path: "blogs/3-lieu-phap-toi-uu-hieu-qua-dieu-tri-tham-sam-nam",
          element: <BlogPost2 />,
        },
        {
          path: "blogs/tat-tan-tat-ve-tay-te-bao-chet-hoa-hoc",
          element: <BlogPost3 />,
        },
        {
          path: "blogs/chuong-trinh-ung-hong-khong-cu-do-chung-tay-cham-soc-tre-em-vung-cao",
          element: <BlogPost04 />,
        },
        {
          path: "/blogs/chuong-trinh-cung-aureum-song-xanh-moi-ngay",
          element: <BlogPost05 />,
        },
        {
          path: "/blogs/chung-tay-cuu-tro-cho-meo-lang-thang",
          element: <BlogPost06 />,
        },
        {
          path: "/blogs/tat-ca-bai-viet",
          element: <BlogPostAll />,
        },
        {
          path: "products",
          element: <ProductDetail />,
        },
        {
          path: "aboutUs",
          element: <AboutUs />,
        },
        {
          path: "products/:type/:id",
          element: <ProductsPage />,
        },
        {
          path: "products/brand/:brand_id",
          element: <ProductsBrandPage />,
        },
        {
          path: "products/details/:product_id",
          element: <ProductDetailPage />,
        },
        {
          path: "productList/:category_id",
          element: <ProductList />,
        },
      ],
    },

    // người dùng phải đăng nhập mới có thể sử dụng các chức năng này
    {
      path: "",
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "profile",
          element: <ProfileAccount />,
        },
        {
          path: "historyOrders",
          element: <HistoryOrders />,
        },
        {
          path: "quiz",
          element: <QuizPage />,
        },
        {
          path: "quizDetail",
          element: <QuizDetail />,
        },
        {
          path: "quizResult",
          element: <QuizResult />,
        },
        {
          path: "categorySidebar",
          element: <CategorySidebar />,
        },
        {
          path: "productComparison",
          element: <ProductComparison />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "payment-result",
          element: <PaymentResult />,
        },
      ],
    },

    // phải là admin mới có quyền truy cập
    {
      path: "dashboard",
      element: (
        <PrivateRoute adminOnly={true}>
          <Dashboard />
        </PrivateRoute>
      ),
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
        {
          path: "ingredient",
          element: <ManageIngredient />,
        },
        {
          path: "brand",
          element: <ManageBrand />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

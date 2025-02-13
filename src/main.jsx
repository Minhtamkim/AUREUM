import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/index.jsx";
import RegisterPage from "./pages/Register/index.jsx";
import Dashboard from "./components/dashboard/index.jsx";
// import TestComponent from "./pages/Test/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello ae</h1>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);

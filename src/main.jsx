import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/index.jsx";
import RegisterPage from "./pages/Register/index.jsx";
import TestComponent from "./pages/Test/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TestComponent />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);

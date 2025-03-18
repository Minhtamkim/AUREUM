import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("roleEnum");

  if (adminOnly && (!token || role === "CUSTOMER")) {
    alert("Bạn không có quyền được truy cập!");
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("roleEnum");
    localStorage.removeItem("skinType");
    return <Navigate to="/login" />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;

import { useState } from "react";
import { DashboardOutlined, LogoutOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { TbBrandCodesandbox } from "react-icons/tb";
import { BsHandbag } from "react-icons/bs";
import { BiLeaf } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineTags } from "react-icons/ai";
import { Avatar, Breadcrumb, Divider, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { MdFace4 } from "react-icons/md";
import { clearCart } from "../../redux/features/cartSlice";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";
import "./index.scss";

const { Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Lấy user từ Redux
  const userRole = user?.roleEnum; // Lấy role của user

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label: <Link to={key}>{label}</Link>,
    };
  }

  const items = [
    // ...(userRole === "ADMIN" ? [getItem("Accounts", "/dashboard/accounts", <UserOutlined />)] : []),
    ...(userRole === "ADMIN" || userRole === "MANAGER"
      ? [
          getItem("Overview", "/dashboard/overview", <TbBrandCodesandbox />),
          getItem("Accounts", "/dashboard/accounts", <UserOutlined />),
          getItem("Products", "/dashboard/products", <FaListUl />),
          getItem("Categories", "/dashboard/categories", <AiOutlineTags />),
          getItem("Ingredients", "/dashboard/ingredients", <BiLeaf />),
          getItem("Brands", "/dashboard/brands", <TbBrandCodesandbox />),
          getItem("Vouchers", "/dashboard/vouchers", <IoTicketOutline />),
        ]
      : []),
    ...(userRole === "ADMIN" || userRole === "MANAGER" || userRole === "STAFF"
      ? [
          getItem("Orders", "/dashboard/orders", <BsHandbag />),
          getItem("Reports", "/dashboard/reports", <MdOutlineReport />),
          getItem("Questions", "/dashboard/questions", <FaQuestion />),
          getItem("Answers", "/dashboard/answers", <MdOutlineQuestionAnswer />),
        ]
      : []),
  ];

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // State lưu trữ mục được chọn

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    localStorage.removeItem("token");
    localStorage.removeItem("roleEnum");
    localStorage.removeItem("skinType");
  };

  const userMenu = (
    <Menu className="w-48 shadow-2xs rounded-4xl">
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Thông tin tài khoản</Link>
      </Menu.Item>
      <Menu.Item key="history" icon={<ShoppingOutlined />}>
        <Link to="/profile?tab=history">Lịch sử mua hàng</Link>
      </Menu.Item>
      <Menu.Item key="routine" icon={<MdFace4 />}>
        <Link to="/redirecttoskinPage">Lộ trình chăm sóc da </Link>
      </Menu.Item>
      {(userRole === "ADMIN" || userRole === "MANAGER" || userRole === "STAFF") && (
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Manage Dashboard</Link>
        </Menu.Item>
      )}

      <Divider className="my-2" />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // Lưu trữ key của mục đang chọn
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "auto",
          background: "white",
        }}
      >
        <div className="logo-container flex justify-center p-4">
          <img className="h-12 cursor-pointer" src="/images/logo-aureum.jpg" alt="Logo" onClick={() => navigate("/")} />
        </div>
        {/* <div className="demo-logo-vertical" /> */}
        <Menu
          theme="light"
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={handleMenuClick} // Đặt sự kiện click để thay đổi mục được chọn
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <div className="bg-white flex justify-end w-[100%] p-5 sticky top-0 z-10">
          <div>
            {user ? (
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <div className="flex items-center cursor-pointer text-black gap-2.5 font-semibold pr-3 pt-1.5">
                  <Avatar icon={<UserOutlined />} className="mr-2" />
                  <span className="font-semibold text-black">Hi, {user?.fullName || "User"}</span>
                </div>
              </Dropdown>
            ) : (
              <div className="pl-3">
                <span
                  className="text-black underline cursor-pointer transition-all duration-200 hover:text-gray-300 hover:underline-offset-4"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </span>
              </div>
            )}
          </div>
        </div>
        <Content style={{ margin: "25px" }}>
          <Breadcrumb style={{ margin: "5px 0" }}>
            <Breadcrumb.Item>{userRole}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              background: "#f0f2f5",
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

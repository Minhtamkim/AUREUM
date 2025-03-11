import { useState } from "react";
import {
  DashboardOutlined,
  LogoutOutlined,
  PieChartOutlined,
  ProductOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TbBrandCodesandbox } from "react-icons/tb";
import { BiLeaf } from "react-icons/bi";
import { Avatar, Breadcrumb, Divider, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={key}>{label}</Link>,
  };
}

const items = [
  getItem("Account", "/dashboard/account", <UserOutlined />),
  getItem("Product", "/dashboard/product", <ProductOutlined />),
  getItem("Category", "/dashboard/category", <PieChartOutlined />),
  getItem("Ingredient", "/dashboard/ingredient", <BiLeaf />),
  getItem("Brand", "/dashboard/brand", <TbBrandCodesandbox />),
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Lấy user từ Redux
  const userRole = user?.roleEnum; // Lấy role của user

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userMenu = (
    <Menu className="w-48 shadow-2xs rounded-4xl">
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Thông tin tài khoản</Link>
      </Menu.Item>
      <Menu.Item key="history" icon={<ShoppingOutlined />}>
        <Link to="/historyOrders">Lịch sử mua hàng</Link>
      </Menu.Item>
      {(userRole === "ADMIN" || userRole === "MANAGER" || userRole === "STAFF") && (
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Manage Dashboard</Link>
        </Menu.Item>
      )}

      <Divider className="my-2" />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></Header> */}
        <div className="bg-white flex justify-between w-[100%] p-3">
          <img className="h-12 " src="/images/logo-aureum.jpg" alt="" onClick={() => navigate("/")} />
          <div>
            {user ? (
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <div className="flex items-center cursor-pointer text-black gap-2.5 font-semibold pr-3 pt-1.5">
                  <Avatar icon={<UserOutlined />} className="mr-2" />
                  <span>Hi, {user?.fullName || "User"}</span>
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
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Manage</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
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

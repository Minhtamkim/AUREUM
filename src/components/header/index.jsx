/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, use } from "react";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useLocation, Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { Avatar, Divider, Dropdown, Menu } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { addToCart, clearCart } from "../../redux/features/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { MdFace4 } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [cart, setCart] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const timeoutRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const totalQuantity = useSelector((state) => state.cart?.totalQuantity || 0);
  const [skin, setSkin] = useState([]);

  useEffect(() => {
    setSearchTerm("");
    setFilteredProducts([]);
    setShowDropdown(false);
  }, [location]); // Reset mỗi khi route thay đổi

  const handleProductClick = (product) => {
    setSearchTerm(""); // Xóa nội dung ô input
    setFilteredProducts([]); // Xóa danh sách gợi ý
    setShowDropdown(false); // Ẩn dropdown
    navigate(`/products/details/${product.id}`); // Chuyển sang trang chi tiết sản phẩm

    setTimeout(() => {
      navigate(`/products/details/${product.id}`); // Điều hướng sau khi cập nhật state
    }, 100); // Đợi một chút để React cập nhật state
  };

  const handleMouseEnter = (id) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(id);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  useEffect(() => {
    api
      .get("product") // Thay bằng API thực tế
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      // Chuẩn hóa từ khóa tìm kiếm
      const normalizedSearchTerm = removeDiacritics(searchTerm.toLowerCase());

      // Lọc sản phẩm dựa trên tên sản phẩm đã chuẩn hóa
      setFilteredProducts(
        products.filter((product) =>
          removeDiacritics(product.name.toLowerCase()).includes(
            normalizedSearchTerm
          )
        )
      );
    }
  }, [searchTerm, products]);

  const menuItems = [
    { id: 1, name: "Trang Chủ", path: "/" },
    { id: 2, name: "Sản Phẩm", path: "/products", hasDropdown: true },
    { id: 3, name: "Bài Viết", path: "/blog" },
    { id: 4, name: "Về Chúng Tôi", path: "/aboutUs" },
    { id: 5, name: "Xác Định Loại Da", path: "/quiz" },
    { id: 6, name: "So Sánh Sản Phẩm", path: "/categorySidebar" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("category");
      const responses = await api.get("brand");
      const responsese = await api.get("ingredient");
      const responseses = await api.get("skin");
      setIngredient(responsese.data);
      setBrand(responses.data);
      setCategories(response.data);
      setSkin(responseses.data);
    };
    fetchData();
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Lấy user từ Redux
  const userRole = user?.roleEnum; // Lấy role của user

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleEnum");
    localStorage.removeItem("skinType");
    dispatch(logout());
    dispatch(clearCart());
  };
  const userMenu = (
    <Menu className="w-48 shadow-2xs rounded-4xl">
      <Menu.Item className="font-bold">
        <p>Hi, {user?.fullName || "User"}</p>
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile?tab=account">Thông tin tài khoản</Link>
      </Menu.Item>
      <Menu.Item key="history" icon={<ShoppingOutlined />}>
        <Link to="/profile?tab=history">Lịch sử mua hàng</Link>
      </Menu.Item>
      <Menu.Item key="routine" icon={<MdFace4 />}>
        <Link to="/redirecttoskinPage">Lộ trình chăm sóc da </Link>
      </Menu.Item>
      {(userRole === "ADMIN" ||
        userRole === "MANAGER" ||
        userRole === "STAFF") && (
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Manage Dashboard</Link>
        </Menu.Item>
      )}
      <Divider className="my-2" />
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        danger
        onClick={handleLogout}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="w-full bg-[#2d2d2b] shadow-md h-4-">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-2 ">
          <a href="/">
            <img
              src="/images/logoAureum.png"
              alt="Logo"
              className="h-20 w-auto"
            />
          </a>
        </div>
        <div className="flex items-center py-4">
          {/* Desktop Navigation */}
          {/* Navigate*/}
          <nav
            className="hidden md:flex items-center space-x-8 justify-center flex-1 pl-30
          hover:shadow-lg  ease-in-out cursor-pointer"
          >
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() =>
                  item.hasDropdown && handleMouseEnter(item.id)
                }
                onMouseLeave={(e) => item.hasDropdown && handleMouseLeave(e)}
              >
                <a
                  href={item.path}
                  className="text-white font-medium relative transition
                  after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-[#e3d0b1] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </a>

                {openDropdown === item.id && (
                  <div className="absolute left-[-100px] top-full mt-4 bg-black/20 backdrop-blur-lg p-6 shadow-xl rounded-xl grid grid-cols-2 md:grid-cols-4 gap-6 min-w-[850px] z-50">
                    <div>
                      <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-3">
                        Sản Phẩm
                      </h3>
                      {categories.map((category) => (
                        <a
                          key={category.id}
                          className="block text-white -600 hover:text-amber-200 transition-all duration-300 ease-in-out mt-1 text-sm"
                          onClick={() =>
                            navigate(`/products/category/${category.id}`)
                          }
                        >
                          {category.name}
                        </a>
                      ))}
                      <a
                        href="/products"
                        className="block text-black font-semibold mt-3 text-sm uppercase hover:text-black-400 transition-all duration-300  hover:text-white"
                      >
                        Tất cả sản phẩm &rarr;
                      </a>
                    </div>

                    <div className="border-l border-gray-400 pl-5">
                      <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-3">
                        Thương Hiệu
                      </h3>
                      {brand.map((brand) => (
                        <a
                          key={brand.id}
                          className="block text-white -400 hover:text-amber-200 transition-all duration-300 mt-1 text-sm"
                          onClick={() =>
                            navigate(`/products/brand/${brand.id}`)
                          }
                        >
                          {brand.name}
                        </a>
                      ))}
                    </div>

                    <div className="border-l border-gray-400 pl-5">
                      <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-3">
                        Thành phần
                      </h3>
                      {ingredient.slice(0, 15).map((ingredient) => (
                        <a
                          key={ingredient.id}
                          className="block text-white -400 hover:text-amber-200 transition-all duration-300 mt-1 text-sm"
                          onClick={() =>
                            navigate(`/products/ingredient/${ingredient.id}`)
                          }
                        >
                          {ingredient.name}
                        </a>
                      ))}
                    </div>

                    <div className="border-l border-gray-400 pl-5">
                      <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-3">
                        Loại da
                      </h3>
                      {skin.slice(0, 15).map((skin) => (
                        <a
                          key={skin.id}
                          className="block text-white -400 hover:text-amber-200 transition-all duration-300 mt-1 text-sm"
                          onClick={() => navigate(`/products/skin/${skin.id}`)}
                        >
                          {skin.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* H-D}

          {/* Right Icons */}
          <div className="flex items-center space-x-2 ">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-blue-400 transition-colors duration-200"
              aria-label="Search"
            >
              <FiSearch className="w-6 h-6" />
            </button>
            {/* <div className="relative">
              <button onClick={() => navigate("/cart")} className="relative p-2 text-gray-600 hover:text-gray-800">
                <FaShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </button>
            </div> */}

            <div className="relative">
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 text-white hover:text-blue-400"
              >
                <FiShoppingCart className="w-6 h-6" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>

            {user ? (
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <div className="flex items-center cursor-pointer text-white">
                  <Avatar icon={<UserOutlined />} className="mr-2" />
                </div>
              </Dropdown>
            ) : (
              <div className="pl-3">
                <span
                  className="text-white underline cursor-pointer transition-all duration-200 hover:text-gray-300 hover:underline-offset-4"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-blue-400 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="relative w-full py-3">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 bg-gray-50 dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && filteredProducts.length > 0 && (
              <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                {filteredProducts.map(
                  (
                    product // Hiển thị tất cả các sản phẩm
                  ) => (
                    <div
                      key={product.id}
                      className="flex items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {product.brand.name} - {product.price}K
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* User Modal */}
        {isUserModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Account</h2>
                <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/src/pages/login")}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign In
                </button>
                <button className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect, useRef } from "react";
import { FiUser, FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState([]);

  const timeoutRef = useRef(null);
  const navigate = useNavigate();

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
  const menuItems = [
    { id: 1, name: "Trang Chủ", path: "/" },
    { id: 2, name: "Sản Phẩm", path: "product", hasDropdown: true },
    { id: 3, name: "Bài Viết", path: "blog" },
    { id: 4, name: "Về Chúng Tôi", path: "aboutUs" },
    { id: 5, name: "Xác Định Loại Da", path: "#" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("category");
      setCategories(response.data);
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

  return (
    <header className="w-full bg-[#2d2d2b] shadow-md h-4-">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-2">
          <a href="/">
            <img src="/images/aureum.png" alt="Logo" className="h-24 w-auto object-contain" />
          </a>
        </div>
        <div className="flex items-center py-4">
          {/* Desktop Navigation */}
          {/* Navigate*/}
          <nav
            className="hidden md:flex items-center space-x-8 justify-center flex-1 pl-35
          hover:shadow-lg  ease-in-out cursor-pointer"
          >
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
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
                  <div className="absolute left-[-100px]  top-full mt-2 bg-black/20 backdrop-blur-md p-6  shadow-lg grid grid-cols-[2fr_3fr_2fr] gap-12 min-w-[900px] z-50">
                    <div>
                      <h3 className="text-white font-bold text-lg uppercase tracking-wide">Sản Phẩm</h3>
                      {categories.map((category) => (
                        <a
                          key={category.id}
                          className="block text-gray-200 hover:text-white mt-2 text-sm"
                          onClick={() => navigate(`products/${category.id}`)}
                        >
                          {category.name}
                        </a>
                      ))}
                      <a
                        href="/product"
                        className="block text-black -400 hover:text-black -300 font-semibold mt-2 text-sm uppercase"
                      >
                        Tất cả sản phẩm &rarr;
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* H-D}

          {/* Right Icons */}
          <div className="flex items-center space-x-6 ">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-blue-400 transition-colors duration-200"
              aria-label="Search"
            >
              <FiSearch className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-white hover:text-blue-400 transition-colors duration-200"
              aria-label="User account"
            >
              <FiUser className="w-6 h-6" />
            </button>

            <div className="relative">
              <button
                className="text-white hover:text-blue-400 transition-colors duration-200"
                aria-label="Shopping cart"
              >
                <FiShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-blue-400 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
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
          <div className="py-4 px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 bg-gray-50 dark:bg-gray-800"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}

        {/* User Modal */}
        {isUserModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Account</h2>
                <button onClick={() => setIsUserModalOpen(false)} className="text-gray-600 hover:text-blue-600">
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

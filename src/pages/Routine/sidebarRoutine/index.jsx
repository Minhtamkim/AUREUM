import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";
import api from "../../../config/axios";
import { getUserById } from "../../../services/api.user";
import { useNavigate } from "react-router-dom";

function SidebarRoutine() {
  const [showToc, setShowToc] = useState(true);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user?.id);
  const [userSkin, setUserSkin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoryRes, productRes, userRes] = await Promise.all([
          api.get("category"),
          api.get("product"),
          getUserById(userId),
        ]);

        const userSkinType = userRes?.skin?.name || null;
        setUserSkin(userSkinType);

        setCategories(categoryRes.data.filter((cat) => !cat.name.toLowerCase().includes("chống nắng")));

        const groupedProducts = {};
        categoryRes.data.forEach((cat) => {
          groupedProducts[cat.id] = productRes.data.filter(
            (product) =>
              product.category.id === cat.id &&
              product.skin?.name?.toLowerCase() === userSkinType?.toLowerCase() &&
              !product.name.toLowerCase().includes("chống nắng") &&
              !product.description?.toLowerCase().includes("chống nắng")
          );
        });

        setProductsByCategory(groupedProducts);
      } catch (err) {
        console.error("Lỗi API:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-600">Đang tải dữ liệu...</p>;
  }

  if (!userSkin) {
    return (
      <div className="bg-[#f8f9fa] min-h-screen flex justify-center items-center">
        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 font-semibold">
            Bạn chưa làm bài test! Hãy làm bài test để có lộ trình phù hợp với loại da của bạn.
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Làm bài test ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex">
      {/* Sidebar - Nội dung bài viết */}
      <div className="hidden md:block w-80 sticky top-20 h-200 bg-white shadow-md rounded-lg p-5 mr-6">
        <div
          className="flex justify-between items-center cursor-pointer text-gray-700 font-semibold text-lg border-b pb-3"
          onClick={() => setShowToc(!showToc)}
        >
          <span>Nội dung bài viết</span>
          {showToc ? (
            <ChevronUp size={24} className="text-gray-500" />
          ) : (
            <ChevronDown size={24} className="text-gray-500" />
          )}
        </div>
        {showToc && (
          <ul className="mt-3 text-gray-700 space-y-2">
            {categories.map((cat, index) => (
              <li
                key={cat.id}
                className="cursor-pointer hover:text-amber-500 transition flex items-center gap-2 py-1"
                onClick={() => document.getElementById(`category-${cat.id}`)?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>Bước</span> {index + 1}. {cat.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SidebarRoutine;

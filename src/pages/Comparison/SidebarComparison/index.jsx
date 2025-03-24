import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";

function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category_id } = useParams(); // <-- tên đúng phải khớp với useParams trong ProductList
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("category");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="w-64 p-4 border-r bg-white shadow-md min-h-screen">
      <h2 className="text-lg font-bold text-gray-800">Danh mục sản phẩm</h2>

      {loading ? (
        <p className="text-gray-500 mt-2">Đang tải danh mục...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500 mt-2">Không có danh mục nào.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`block w-full text-left p-2 rounded-md transition duration-300 ${
                  Number(category_id) === category.id
                    ? "bg-blue-400 text-white font-semibold"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => navigate(`/productList/${category.id}`)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategorySidebar;

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";

const ProductsPage = () => {
  const { category_id } = useParams(); // Lấy category_id từ URL
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Dùng để điều hướng

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API lấy danh sách danh mục
        const categoryRes = await api.get("category");
        setCategories(categoryRes.data);
        console.log("Danh sách danh mục:", categoryRes.data);

        // Gọi API lấy danh sách sản phẩm
        const productRes = await api.get("product");
        console.log("Dữ liệu sản phẩm:", productRes.data);

        // Tìm danh mục có id tương ứng
        const selectedCategory = categoryRes.data.find(
          (cat) => cat.id === Number(category_id)
        );

        if (!selectedCategory) {
          setError("Danh mục không tồn tại!");
          return;
        }

        // Lọc sản phẩm theo danh mục (dựa trên tên nếu không có `category_id`)
        const filteredProducts = productRes.data.filter((product) =>
          product.name
            .toLowerCase()
            .includes(selectedCategory.name.toLowerCase())
        );

        setProducts(filteredProducts);
      } catch (err) {
        console.error(
          "Lỗi API:",
          err.response ? err.response.data : err.message
        );
        setError("Không thể tải sản phẩm. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category_id]);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;
  if (!products.length) return <p>Không có sản phẩm nào trong danh mục này.</p>;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sản Phẩm</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 text-center
                hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/products/details/${product.id}`)} // Điều hướng khi bấm vào sản phẩm
          >
            <div
              className={`p-2 flex items-center justify-center brightness-100 `}
            >
              <img src={product.image} alt={product.title} className="h-70" />
            </div>
            <p className="font-semibold mt-2">{product.name}</p>
            <p className="text-sm text-gray-500 whitespace-pre-line">
              {product.price + ".000đ"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

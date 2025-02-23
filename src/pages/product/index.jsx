import { useEffect, useState } from "react";
import api from "../../config/axios";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("product"); // Lấy toàn bộ danh sách sản phẩm
        console.log("Dữ liệu API:", response.data); // Kiểm tra dữ liệu trả về

        // Lọc sản phẩm có code là "PD001"
        const selectedProduct = response.data.find((p) => p.code === "PD001");

        setProduct(selectedProduct); // Cập nhật state với sản phẩm tìm được
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  if (!product) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#fdf8f3] rounded-lg shadow-lg">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col items-center">
        <img src={product.image} alt={product.name} className="rounded-lg shadow-md w-full object-cover" />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-4">
        <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-lg text-gray-500">{product.brand}</p>
        <p className="text-2xl font-semibold text-red-500 mt-2">{product.price}.000 đ</p>

        <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

        {/* Icons mô tả */}
        <div className="flex flex-wrap gap-3 mt-5 text-sm text-gray-700">
          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">✅ Không chứa cồn</span>
          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">✅ Không sulfate</span>
          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">✅ Không dầu khoáng</span>
        </div>

        {/* Nút thêm vào giỏ */}
        <button className="mt-6 w-full bg-black text-white py-3 text-lg rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2">
          🛒 Thêm vào giỏ – {product.price}.000 đ
        </button>
      </div>
    </div>
  );
}

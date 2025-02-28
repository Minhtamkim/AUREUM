import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../config/axios";

const ProductDetailPage = () => {
  const { product_id } = useParams(); // Lấy product_id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Gọi API để lấy thông tin sản phẩm
        const productRes = await api.get(`product/${product_id}`);
        setProduct(productRes.data);
      } catch (err) {
        console.error("Lỗi API:", err.response ? err.response.data : err.message);
        setError("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (loading) return <p>Đang tải thông tin sản phẩm...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row items-center">
        <img src={product.image} alt={product.name} className="w-80 h-80 object-cover rounded-lg shadow-md" />
        <div className="ml-6">
          <p className="text-lg text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-red-500 mt-4">{product.price}.000đ</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

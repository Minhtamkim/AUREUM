/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";

const ProductsBrandPage = () => {
  const { brand_id } = useParams(); // Lấy brand_id từ URL
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Dùng để điều hướng

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API lấy danh sách thương hiệu
        const brandRes = await api.get("brand");
        setBrands(brandRes.data);
        console.log("Danh sách thương hiệu:", brandRes.data);

        // Gọi API lấy danh sách sản phẩm
        const productRes = await api.get("product");
        console.log("Dữ liệu sản phẩm:", productRes.data);

        // Tìm thương hiệu có id tương ứng
        const selectedBrand = brandRes.data.find(
          (brand) => brand.id === Number(brand_id)
        );
        if (!selectedBrand) {
          setError("Thương hiệu không tồn tại!");
          return;
        }

        // Lọc sản phẩm theo brand_id
        const filteredProducts = productRes.data.filter(
          (product) => product.brand?.id === Number(selectedBrand.id)
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
  }, [brand_id]);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;
  if (!products.length)
    return <p>Không có sản phẩm nào thuộc thương hiệu này.</p>;

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
            <div className="p-2 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="h-70" />
            </div>
            <p className="font-semibold mt-2">{product.name}</p>
            <p className="text-sm text-gray-500">{product.price}.000đ</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsBrandPage;

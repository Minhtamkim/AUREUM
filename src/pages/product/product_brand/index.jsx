/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";

const ProductsBrandPage = () => {
  const { brand_id } = useParams(); // Lấy brand_id từ URL
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentPage = 8;
  const totalPage = Math.ceil(products.length / currentPage);
  const currentProduct = products.slice(
    (page - 1) * currentPage,
    page * currentPage
  );

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
      <div className="flex items-center">
        <h1 className="font-semibold mt-6 mb-8">
          <Link to={"/products"}>Sản Phẩm &gt;</Link> Cocoon
        </h1>
      </div>
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
            <p className="font-semibold items-center justify-center mt-2 min-h-[52px]">
              {product.name}
            </p>
            <p className="text-sm font-bold whitespace-pre-line mt-1">
              {" "}
              {`${product.price.toLocaleString("vi-VN")}`}VND
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          &larr; Trước
        </button>
        <span>
          {page} / {totalPage}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
          disabled={page === totalPage}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Sau &rarr;
        </button>
      </div>
    </div>
  );
};

export default ProductsBrandPage;

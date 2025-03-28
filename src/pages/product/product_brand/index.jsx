/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";

const ProductsBrandPage = () => {
  const { brand_id } = useParams();
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Lưu dữ liệu gốc
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState("asc"); // Trạng thái lọc giá
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPage = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandRes = await api.get("brand");
        setBrands(brandRes.data);

        const productRes = await api.get("product");

        const selectedBrand = brandRes.data.find(
          (brand) => brand.id === Number(brand_id)
        );
        if (!selectedBrand) {
          setError("Thương hiệu không tồn tại!");
          return;
        }

        const filteredProducts = productRes.data.filter(
          (product) => product.brand?.id === Number(selectedBrand.id)
        );

        setOriginalProducts(filteredProducts);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [brand_id]);

  // Lọc theo giá
  useEffect(() => {
    let sortedProducts = [...originalProducts];

    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts);
  }, [sortOrder, originalProducts]);

  // Phân trang
  const currentProduct = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;
  if (!products.length)
    return <p>Không có sản phẩm nào thuộc thương hiệu này.</p>;

  return (
    <div className="container mx-auto p-6 min-h-screen bg-[#F3E8E0]">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold mt-6 mb-8">
          <Link to={"/products"}>Sản Phẩm &gt;</Link>{" "}
          {brands.find((b) => b.id === Number(brand_id))?.name}
        </h1>

        {/* Bộ lọc giá */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="asc">Giá từ thấp đến cao</option>
          <option value="desc">Giá từ cao đến thấp</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProduct.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 text-center
                hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/products/details/${product.id}`)}
          >
            <div className="p-2 flex items-center justify-center brightness-100">
              <img src={product.image} alt={product.name} className="h-70" />
            </div>
            <p className="font-semibold mt-2 min-h-[52px]">{product.name}</p>
            <p className="text-sm font-bold mt-1">
              {`${product.price.toLocaleString("vi-VN")}`} VND
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

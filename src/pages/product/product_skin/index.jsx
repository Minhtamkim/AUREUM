import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../../config/axios";

const SkinProducts = () => {
  const { skin_id } = useParams(); // Lấy ID loại da từ URL
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Lưu dữ liệu gốc
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState("asc"); // Trạng thái lọc giá
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPage = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách loại da
        const skinRes = await api.get("skin");
        setSkins(skinRes.data);

        // Lấy danh sách sản phẩm
        const productRes = await api.get("product");

        // Tìm loại da đã chọn theo id
        const selectedSkin = skinRes.data.find((skin) => skin.id === Number(skin_id));
        if (!selectedSkin) {
          setError("Loại da không tồn tại!");
          return;
        }

        // Lọc sản phẩm theo loại da
        const filteredProducts = productRes.data.filter((product) => product.skin?.id === Number(selectedSkin.id));

        setOriginalProducts(filteredProducts);
      } catch (err) {
        console.error("Lỗi API:", err.response ? err.response.data : err.message);
        setError("Không thể tải sản phẩm. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [skin_id]);

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
  const currentProduct = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) return <p className="text-center mt-4">Đang tải sản phẩm...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!products.length) return <p className="text-center mt-4">Không có sản phẩm nào cho loại da này.</p>;

  return (
    <div className="px-15 min-h-screen bg-[#FCF9F6]">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold mt-6 mb-8">
          <Link to={"/products"}>Sản Phẩm &gt;</Link> {skins.find((s) => s.id === Number(skin_id))?.name}
        </h1>

        {/* Bộ lọc giá */}
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded-md">
          <option value="asc">Giá từ thấp đến cao</option>
          <option value="desc">Giá từ cao đến thấp</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProduct.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/products/details/${product.id}`)}
          >
            <div className="p-2 flex items-center justify-center brightness-100">
              <img src={product.image} alt={product.name} className="h-70" />
            </div>
            <p className="font-semibold mt-2 min-h-[52px]">{product.name}</p>
            <p className="text-sm font-bold mt-1">{`${product.price.toLocaleString("vi-VN")}`} VND</p>
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

export default SkinProducts;

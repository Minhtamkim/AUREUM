import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Lưu toàn bộ dữ liệu gốc
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // Mặc định từ thấp đến cao
  const navigate = useNavigate();

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        `product/pageable?currentPage=0&pageSize=100` // Lấy nhiều sản phẩm để có dữ liệu đầy đủ
      );
      setOriginalProducts(response.data.content);
      setTotalPages(Math.ceil(response.data.content.length / itemsPerPage));
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sortedProducts = [...originalProducts];

    // Sắp xếp theo giá
    sortedProducts.sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

    // Cắt ra theo trang
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    setProducts(paginatedProducts);
  }, [sortOrder, page, originalProducts]);

  // Thay đổi thứ tự lọc giá
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1); // Khi thay đổi cách sắp xếp, reset về trang 1
  };

  return (
    <div className="px-10 my-6 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mt-10 mb-8">Sản Phẩm &gt; Tất Cả Sản Phẩm</h2>

        {/* Dropdown Lọc Giá */}
        <select value={sortOrder} onChange={handleSortChange} className="p-2 border rounded-md">
          <option value="asc">Giá từ thấp đến cao</option>
          <option value="desc">Giá từ cao đến thấp</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 text-center
                hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/products/details/${product.id}`)}
          >
            <div className={`p-2 flex items-center justify-center brightness-100 `}>
              <img src={product.image} alt={product.title} className="h-70" />
            </div>
            <p className="font-semibold items-center justify-center mt-2 min-h-[52px]">{product.name}</p>
            <p className="text-sm font-bold whitespace-pre-line mt-2">
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
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";
import CategorySidebar from "../SidebarComparison";

function ProductList() {
  const { category_id } = useParams(); // Lấy ID danh mục từ URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]); // Lưu sản phẩm đã chọn
  const itemsPerPage = 20;
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async (categoryId) => {
      setLoading(true);
      setError(null);

      try {
        const [categoryRes, productRes] = await Promise.all([api.get("category"), api.get("product")]);

        setCategories(categoryRes.data);
        let filteredProducts = productRes.data;

        // Lọc sản phẩm theo danh mục
        const selectedCategory = categoryRes.data.find((cat) => cat.id === Number(categoryId));
        if (!selectedCategory) {
          setError("Danh mục không tồn tại!");
          return;
        }

        filteredProducts = productRes.data.filter((product) => product.category.id === selectedCategory.id);

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Lỗi API:", err);
        setError("Không thể tải sản phẩm. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    if (category_id) {
      fetchData(category_id);
    }
  }, [category_id]); // Chạy lại khi category_id thay đổi

  // Xử lý chọn/bỏ chọn sản phẩm
  const toggleSelectProduct = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.some((p) => p.id === product.id)) {
        return prevSelected.filter((p) => p.id !== product.id); // Bỏ chọn nếu đã chọn trước đó
      } else if (prevSelected.length < 2) {
        return [...prevSelected, product]; // Chọn tối đa 2 sản phẩm
      } else {
        return prevSelected; // Nếu đã đủ 2 sản phẩm, không thêm nữa
      }
    });
  };

  // Chuyển hướng đến trang so sánh
  const compareProducts = () => {
    if (selectedProducts.length === 2) {
      navigate(`/productComparison?product1=${selectedProducts[0].id}&product2=${selectedProducts[1].id}`);
    }
  };

  const totalPage = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  {
    !products?.length ? (
      <p className="text-center text-gray-500 mt-6">Không có sản phẩm nào trong danh mục này.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-white shadow-md rounded-lg p-4 text-center cursor-pointer
            hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out
            ${selectedProducts.some((p) => p.id === product.id) ? "border-2 border-blue-500" : ""}`}
            onClick={() => toggleSelectProduct(product)}
          >
            <div className="p-2 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="h-40 object-cover" />
            </div>
            <p className="font-semibold mt-2">{product.name}</p>
            <p className="text-sm text-gray-500 whitespace-pre-line">{product.price.toLocaleString()} VND</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Danh Mục */}
      <div className="w-1/4">
        <CategorySidebar />
      </div>

      {/* Nội dung chính */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Sản Phẩm</h1>

        {/* Nút So Sánh */}
        <div className="flex mt-6 pb-8">
          <button
            onClick={compareProducts}
            disabled={selectedProducts.length !== 2}
            className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            So sánh
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500 mt-6">Đang tải...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : !products?.length ? (
          <p className="text-center text-gray-500 mt-6">Không có sản phẩm nào trong danh mục này.</p>
        ) : (
          <>
            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white shadow-md rounded-lg p-4 text-center cursor-pointer
                    hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out
                    ${selectedProducts.some((p) => p.id === product.id) ? "border-2 border-blue-500" : ""}`}
                  onClick={() => toggleSelectProduct(product)}
                >
                  <div className="p-2 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="h-40 object-cover" />
                  </div>
                  <p className="font-semibold mt-2">{product.name}</p>
                  <p className="text-sm text-gray-500 whitespace-pre-line">{product.price.toLocaleString()} VND</p>
                </div>
              ))}
            </div>

            {/* Phân trang */}
            {totalPage > 1 && (
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default ProductList;

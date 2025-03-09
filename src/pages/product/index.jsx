import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const currentPage = 20;
  const navigate = useNavigate(); // Dùng để điều hướng

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("product");
      setProducts(response.data);
    };
    fetchData();
  }, []);

  const totalPage = Math.ceil(products.length / currentPage);
  const currentProduct = products.slice((page - 1) * currentPage, page * currentPage);

  return (
    <div className="px-10 my-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-6">
        {currentProduct.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 text-center
                hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/products/details/${product.id}`)} // Điều hướng khi bấm vào sản phẩm
          >
            <div className={`p-2 flex items-center justify-center brightness-100 `}>
              <img src={product.image} alt={product.title} className="h-70" />
            </div>
            <p className="font-semibold mt-2">{product.name}</p>
            <p className="text-sm text-gray-500 whitespace-pre-line">{product.price + ".000đ"}</p>
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

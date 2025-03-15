import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import PrivateRoute from "../../../components/privateRouter";

const ProductDetailPage = () => {
  const { product_id } = useParams(); // Lấy product_id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Dùng để điều hướng
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerRow = 4;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("product");
      setProducts(response.data);
    };
    fetchData();
  }, []);

  // Tăng số lượng
  const increaseQuantity = () => setQuantity(quantity + 1);

  // Giảm số lượng (tối thiểu là 1)
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

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

  // Xử lý khi bấm nút Next (qua 1 sản phẩm)
  const nextSlide = () => {
    if (startIndex + 1 <= products.length - itemsPerRow) {
      setStartIndex(startIndex + 1);
    }
  };

  // Xử lý khi bấm nút Prev (lùi 1 sản phẩm)
  const prevSlide = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleAddToCart = (product) => {
    // setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const plain = { ...product, quantityPlain: quantity, pricePlain: quantity * product.price };
      dispatch(addToCart(plain));
      console.log("Adding to cart:", product); // Kiểm tra dữ liệu
    }
  };

  return (
    <div className="my-6 min-h-screen">
      <div className="max-w-6xl mx-auto p-8 bg-white">
        <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg shadow-lg">
          {/* Ảnh sản phẩm */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={product.image} alt={product.name} className="w-96 h-96 object-cover rounded-lg shadow-md" />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-10">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

            <div className=" mt-2.5 h-1 flex items-center justify-center">
              <div className="w-[80%] max-w-4xl">
                <hr className="border-t border-gray-400" />
              </div>
            </div>

            <p className="text-2xl font-semibold text-gray-900 mt-4">{`${product.price.toLocaleString("vi-VN")}`}VND</p>
            <h2 className="my-4 text-lg font-semibold">Chi tiết sản phẩm</h2>
            <p className=" text-gray-500 mt-3">{product.description}</p>

            <div className="flex items-center mt-4">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-300 text-gray-800 px-3 py-2 rounded-l-lg hover:bg-gray-400"
              >
                -
              </button>
              <span className="px-4 py-2 bg-white border text-lg">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-300 text-gray-800 px-3 py-2 rounded-r-lg hover:bg-gray-400"
              >
                +
              </button>
            </div>

            {/* Nút thêm vào giỏ */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-6 bg-[#835229] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
            >
              Thêm vào giỏ - {`${product.price.toLocaleString("vi-VN")}`}VND
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-black mb-2">Tìm hiểu thêm</h2>
        <h3 className="text-xl font-light text-black">Có thể bạn cũng thích</h3>
        <div className="relative max-w-6xl mx-auto">
          {/* Danh sách sản phẩm */}
          <div className="grid grid-cols-4 gap-6 overflow-hidden transition-transform duration-300 ease-in-out">
            {products.slice(startIndex, startIndex + itemsPerRow).map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                onClick={() => navigate(`/products/details/${product.id}`)}
              >
                <div className="p-2 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="h-70" />
                </div>
                <p className="font-semibold mt-2">{product.name}</p>
                <p className="text-sm text-gray-500">{`${product.price.toLocaleString("vi-VN")}`}VND</p>
              </div>
            ))}
          </div>

          {/* Nút mũi tên điều hướng */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-md hover:bg-gray-400 transition"
            disabled={startIndex === 0}
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-md hover:bg-gray-400 transition"
            disabled={startIndex + itemsPerRow >= products.length}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

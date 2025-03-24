import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../../config/axios";
import CategorySidebar from "../SidebarComparison";
import { getSkinType } from "../../../services/api.skin";
import { getUserById } from "../../../services/api.user"; // Lấy thông tin người dùng
import { useSelector } from "react-redux";
import { getProductById } from "../../../services/api.product";
import { MdError } from "react-icons/md";

function ProductComparison() {
  const [searchParams] = useSearchParams();
  const product1Id = searchParams.get("product1");
  const product2Id = searchParams.get("product2");
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [skinTypes, setSkinTypes] = useState([]);
  const [userSkinType, setUserSkinType] = useState(null); // Loại da của người dùng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user?.id);
  const navigate = useNavigate(); // Khai báo navigate

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!product1Id || !product2Id) {
        setError("Vui lòng chọn 2 sản phẩm để so sánh!");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Lấy thông tin người dùng
        const user = await getUserById(userId);
        console.log("Loại da của người dùng:", user.skinType);
        setUserSkinType(user.skin ? user.skin.name : null);

        // Gọi API lấy thông tin sản phẩm từ service
        const [res1, res2] = await Promise.all([getProductById(product1Id), getProductById(product2Id)]);

        if (!res1 || !res2) {
          setError("Không tìm thấy sản phẩm!");
          setLoading(false);
          return;
        }

        setProduct1(res1);
        setProduct2(res2);

        // Gọi API lấy danh sách loại da
        const skinData = await getSkinType();
        setSkinTypes(skinData || []);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        setError("Không thể tải thông tin sản phẩm.");
      }

      setLoading(false);
    };

    fetchProductDetails();
  }, [product1Id, product2Id]);

  if (loading) return <p className="text-center text-gray-500 mt-6 min-h-screen">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-300 mt-6">{error}</p>;
  if (!product1 || !product2) return <p className="text-center text-gray-500 mt-6">Không tìm thấy sản phẩm.</p>;

  // Hàm kiểm tra sản phẩm có phù hợp không
  const isSuitable = (product) => {
    if (!userSkinType) return null; // Nếu chưa có loại da, trả về null
    if (!product.skin || !product.skin.name) return false;
    console.log(`So sánh: ${userSkinType} với ${product.skin.name}`);
    return userSkinType.toLowerCase() === product.skin.name.toLowerCase();
  };

  return (
    <div className="flex min-h-screen min-w-screen">
      {/* Sidebar Danh Mục */}
      <div className="w-1/4">
        <CategorySidebar />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-center">So sánh sản phẩm</h2>

        {/* Button quay lại */}
        <button
          onClick={() => navigate(-1)} // Quay lại trang trước
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4 hover:bg-gray-400 transition duration-300"
        >
          Quay lại
        </button>

        {/* Hiển thị lỗi nếu sản phẩm khác category nhưng vẫn hiển thị so sánh */}
        {product1.category?.id !== product2.category?.id && (
          <div className="bg-yellow-400 text-white p-4 rounded-md mt-6 flex items-center justify-center space-x-2">
            <MdError className="text-xl" /> {/* Icon lỗi */}
            <p className="font-semibold">Hai sản phẩm thuộc danh mục khác nhau. Cân nhắc!</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-20 mt-6 auto-rows-fr">
          {/* Sản phẩm 1 */}
          <div className="border p-3 shadow-md rounded-lg flex flex-col items-center max-w-sm min-h-[450px]">
            <img src={product1.image} alt={product1.name} className="w-80 h-80 object-cover rounded-md" />
            <h3 className="mt-2 font-semibold text-center">{product1.name}</h3>
            <p
              className={`text-lg font-semibold ${product1.price < product2.price ? "text-green-600" : "text-red-400"}`}
            >
              Giá: {product1.price.toLocaleString()} VND
            </p>
            <p className="text-gray-600">Loại da: {product1.skin ? product1.skin.name : "Không xác định"}</p>

            {/* Giữ phần kiểm tra sản phẩm phù hợp ở cuối */}
            <div className="flex-grow flex flex-col justify-end items-center w-full">
              {userSkinType === null ? (
                <div className="text-center">
                  <p className="text-yellow-500 font-semibold">
                    Hãy làm bài test để có lựa chọn tốt hơn cho da của bạn
                  </p>
                  <a href="/quiz" className="text-blue-500 underline font-medium hover:text-blue-700 transition">
                    Làm bài test ngay
                  </a>
                </div>
              ) : isSuitable(product1) ? (
                <div className="text-center">
                  <p className="text-green-600 font-semibold"> Phù hợp với da của bạn</p>
                  <a
                    href={`/products/details/${product1.id}`}
                    className="text-blue-500 underline font-medium hover:text-blue-700 transition"
                  >
                    Xem chi tiết
                  </a>
                </div>
              ) : (
                <p className="text-red-500 font-semibold"> Không phù hợp với da của bạn</p>
              )}
              <p className="text-gray-600">
                Đánh giá:{" "}
                {product1.totalReviews > 0 ? (
                  <span className="font-semibold">{product1.averageRating.toFixed(1)} ⭐</span>
                ) : (
                  <span className="italic text-gray-500">Chưa có đánh giá</span>
                )}
              </p>
            </div>
          </div>

          {/* Sản phẩm 2 */}
          <div className="border p-3 shadow-md rounded-lg flex flex-col items-center max-w-sm min-h-[450px]">
            <img src={product2.image} alt={product2.name} className="w-80 h-80 object-cover rounded-md" />
            <h3 className="mt-2 font-semibold text-center">{product2.name}</h3>
            <p
              className={`text-lg font-semibold ${product2.price < product1.price ? "text-green-600" : "text-red-400"}`}
            >
              Giá: {product2.price.toLocaleString()} VND
            </p>
            <p className="text-gray-600">Loại da: {product2.skin ? product2.skin.name : "Không xác định"}</p>

            {/* Giữ phần kiểm tra sản phẩm phù hợp ở cuối */}
            <div className="flex-grow flex flex-col justify-end items-center w-full">
              {userSkinType === null ? (
                <div className="text-center">
                  <p className="text-yellow-500 font-semibold">
                    Hãy làm bài test để có lựa chọn tốt hơn cho da của bạn
                  </p>
                  <a href="/quiz" className="text-blue-500 underline font-medium hover:text-blue-700 transition">
                    Làm bài test ngay
                  </a>
                </div>
              ) : isSuitable(product2) ? (
                <div className="text-center">
                  <p className="text-green-600 font-semibold"> Phù hợp với da của bạn</p>
                  <a
                    href={`/products/details/${product2.id}`}
                    className="text-blue-500 underline font-medium hover:text-blue-700 transition"
                  >
                    Xem chi tiết
                  </a>
                </div>
              ) : (
                <p className="text-red-500 font-semibold"> Không phù hợp với da của bạn</p>
              )}
              <p className="text-gray-600">
                Đánh giá:{" "}
                {product2.totalReviews > 0 ? (
                  <span className="font-semibold">{product2.averageRating.toFixed(1)} ⭐</span>
                ) : (
                  <span className="italic text-gray-500">Chưa có đánh giá</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductComparison;

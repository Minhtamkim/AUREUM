import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../services/api.user";
import api from "../../../../config/axios";
import SidebarRoutine from "../../sidebarRoutine";

const SensitiveskinPage = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user?.id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoryRes, productRes, userRes] = await Promise.all([
          api.get("category"),
          api.get("product"),
          getUserById(userId),
        ]);

        setCategories(categoryRes.data.filter((cat) => !cat.name.toLowerCase().includes("chống nắng")));
        const userSkin = userRes?.skin?.name || null;

        const groupedProducts = {};
        categoryRes.data.forEach((cat) => {
          groupedProducts[cat.id] = productRes.data.filter(
            (product) =>
              product.category.id === cat.id &&
              product.skin?.name?.toLowerCase() === userSkin?.toLowerCase() &&
              !product.name.toLowerCase().includes("chống nắng") &&
              !product.description?.toLowerCase().includes("chống nắng")
          );
        });

        setProductsByCategory(groupedProducts);
      } catch (err) {
        console.error("Lỗi API:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex">
      <div className="h-fit sticky top-20">
        <SidebarRoutine />
      </div>

      {/* Nội dung chính */}
      <div className="max-w-5xl mx-auto w-3/4">
        <div className="relative w-full h-60 md:h-80 overflow-hidden rounded-xl shadow-lg">
          <img
            src="https://www.shutterstock.com/image-photo/rosacea-couperose-redness-skin-red-260nw-2273468811.jpg"
            alt="Chăm sóc da"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
            <h1 className="text-white text-4xl font-bold drop-shadow-lg text-center">LỘ TRÌNH CHĂM SÓC DA NHẠY CẢM</h1>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center text-lg mt-6">Đang tải...</p>
        ) : error ? (
          <p className="text-red-500 text-center text-lg mt-6">{error}</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="bg-white shadow-lg rounded-lg p-6 mt-6">
              <h2 id={`category-${cat.id}`} className="text-2xl font-bold text-amber-600 mb-4 border-b pb-3">
                {`${categories.findIndex((c) => c.id === cat.id) + 1}. ${cat.name}`}
              </h2>
              <p className="text-gray-800 mb-4">
                {cat.name.toLowerCase() === "tẩy trang" &&
                  "Để làm dịu da mặt, bước quan trọng nhất là làn sạch da, giúp lỗ chân lông được thông thoáng. Thay vì chọn những sản phẩm chứa hương liệu, chứa cồn và các chất có khả năng tẩy rửa mạnh gây mất cân bằng da, ngứa rát da, tốt nhất bạn nên sử dụng các sản phẩm tẩy trang được làm từ các thành phần tự nhiên.  trang là bước quan trọng và đầu tiên trong các bước skincare cho da dầu ban đêm. Đối với da khô, hãy chọn loại tẩy trang dạng nước để tránh làm mất đi độ ẩm tự nhiên. Các chất tẩy rửa gốc nước nhẹ nhàng hơn so với các chất tẩy rửa gốc dầu, khiến chúng trở nên lý tưởng để duy trì độ ẩm tự nhiên của da."}
                {cat.name.toLowerCase() === "sữa rửa mặt" &&
                  "Theo các chuyên gia da liễu, bạn cần rửa mặt tối đa 2 lần/ngày. Theo đó, sữa rửa mặt sẽ giúp bạn rửa trôi lớp cặn makeup và bụi bẩn, làm sạch sâu và mang lại làn da khô thoáng, mịn màng. Nếu sở hữu làn da nhạy cảm với nhiều đặc tính của cả da dầu và da khô, bạn nên sử dụng 2 loại sữa rửa mặt khác nhau cho buổi sáng và buổi tối. Cụ thể: Buổi sáng: Nên sử dụng sữa rửa mặt dịu nhẹ và lành tính, có độ pH trong khoảng 5 - 5.5 và Buổi tối: Để loại bỏ bụi bẩn, tạp chất tích tụ trong ngày hiệu quả, các bạn nên chọn những loại sữa rửa mặt có khả năng sạch sâu. "}
                {cat.name.toLowerCase() === "tẩy tế bào chết" &&
                  "Khi lấy đi các tế bào chết, lỗ chân lông sẽ thông thoáng, từ đó ngăn ngừa mụn và giảm thiểu tình trạng mụn lây lan, đem lại làn da sạch khỏe, dễ dàng hấp thụ các dưỡng chất chăm sóc da ở các bước tiếp theo."}
                {cat.name.toLowerCase() === "serum" &&
                  "Serum là giải pháp tuyệt vời để cung cấp độ ẩm cho da một cách hiệu quả. Hãy tìm những loại serum chứa cả lớp dầu và lớp nước, giúp tạo hàng rào bảo vệ ngăn ngừa tình trạng mất nước. Serum thấm sâu vào da, cung cấp độ ẩm mạnh mẽ và giúp da giữ được độ ẩm ngay cả trong điều kiện khô hanh."}
                {cat.name.toLowerCase() === "nước hoa hồng/cân bằng" &&
                  "Nước cân bằng giúp ổn định môi trường trên bề mặt da. Từ đó, làm dịu đi những dấu hiệu bất thường sau bước làm sạch."}
                {cat.name.toLowerCase() === "mặt nạ" &&
                  "Cung cấp dưỡng chất và độ ẩm, giúp da mềm mại và sáng khỏe hơn."}
                {cat.name.toLowerCase() === "dưỡng ẩm" &&
                  "Làn da nhạy cảm rất cần đến kem dưỡng ẩm đấy! Kem dưỡng sẽ giúp khóa lại tất cả dưỡng chất thấm sâu vào da mà không bay hơi đi mất. "}
              </p>
              {productsByCategory[cat.id]?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {productsByCategory[cat.id].map((product) => (
                    <div
                      key={product.id}
                      className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl cursor-pointer"
                      onClick={() => navigate(`/products/details/${product.id}`)}
                    >
                      <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                      <div className="p-4 text-center">
                        <p className="font-semibold text-lg">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.price.toLocaleString()} VND</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-4 text-center">Không có sản phẩm phù hợp.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SensitiveskinPage;

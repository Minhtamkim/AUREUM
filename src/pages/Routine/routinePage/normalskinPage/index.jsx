import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../services/api.user";
import api from "../../../../config/axios";
import SidebarRoutine from "../../sidebarRoutine";

const NormalskinPage = () => {
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
            src="https://t3.ftcdn.net/jpg/04/33/59/60/360_F_433596020_JDCvlL1q50dVTmCprbCIkXfxWQMLLcgU.jpg"
            alt="Chăm sóc da"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
            <h1 className="text-white text-4xl font-bold drop-shadow-lg text-center">LỘ TRÌNH CHĂM SÓC DA THƯỜNG</h1>
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
                  "Tẩy trang là bước quan trọng và đầu tiên trong các bước skincare cho da. Hãy chọn loại tẩy trang dạng nước để tránh làm mất đi độ ẩm tự nhiên. Các chất tẩy rửa gốc nước nhẹ nhàng hơn so với các chất tẩy rửa gốc dầu, khiến chúng trở nên lý tưởng để duy trì độ ẩm tự nhiên của da."}
                {cat.name.toLowerCase() === "sữa rửa mặt" &&
                  "Dùng sữa rửa mặt làm sạch da là bước tiếp theo trong thứ tự skincare. Việc rửa mặt sạch sẽ giúp loại bỏ bụi bẩn, bã nhờn trên da, giúp lỗ chân lông thông thoáng."}
                {cat.name.toLowerCase() === "tẩy tế bào chết" &&
                  "Việc tẩy tế bào chết sẽ giúp bạn loại bỏ lớp sừng trên da, giúp da không bị bít tắc lỗ chân lông. Từ đó, việc hấp thụ các dưỡng chất tốt hơn. Đối với bước tẩy tế bào chết, bạn chỉ nên thực hiện 1 đến 2 lần/tuần để tránh làm mòn da."}
                {cat.name.toLowerCase() === "serum" &&
                  "Serum thường có kết cấu dạng lỏng. Khi thoa tinh chất serum xong, bạn nên cho da nghỉ từ 5 đến 7 phút để tinh chất thẩm thấu hoàn toàn vào da rồi mới thực hiện bước skincare tiếp theo."}
                {cat.name.toLowerCase() === "nước hoa hồng/cân bằng" &&
                  "Cân bằng độ pH, giúp da hấp thu dưỡng chất từ các bước dưỡng tiếp theo."}
                {cat.name.toLowerCase() === "mặt nạ" &&
                  "Đắp mặt nạ cũng là khoảng thời gian giúp bạn thư giãn sau một ngày dài hoạt động. Việc đắp mặt nạ không chỉ giúp da sạch hơn, cung cấp độ ẩm, mà còn điều trị các vấn đề về da như thâm mụn, lỗ chân lông lớn, làm đều màu da,... Thế nhưng, bạn không nên lạm dụng đắp mặt nạ quá nhiều trong tuần. Bạn chỉ nên đắp khoảng 2 đến 3 lần/tuần là đủ."}
                {cat.name.toLowerCase() === "dưỡng ẩm" &&
                  "Kem dưỡng ẩm giúp da cân bằng độ ẩm, giữ nước. Đồng thời tạo một lớp màng bảo vệ giúp các dưỡng chất đã bôi ở các bước trước đó không bị bốc hơi."}
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

export default NormalskinPage;

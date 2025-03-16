import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../services/api.user";
import api from "../../../../config/axios";
import SidebarRoutine from "../../sidebarRoutine";

const OilyskinPage = () => {
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
            src="https://www.herocosmetics.us/cdn/shop/articles/oilyskin.jpg?v=1581713352"
            alt="Chăm sóc da"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
            <h1 className="text-white text-4xl font-bold drop-shadow-lg text-center">LỘ TRÌNH CHĂM SÓC DA DẦU</h1>
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
                  "Tẩy trang là bước quan trọng và đầu tiên trong các bước skincare cho da dầu ban đêm. Tẩy trang đúng cách cho da dầu thật kỹ giúp lấy đi lớp makeup, bụi bẩn, bã nhờn trên da. Dùng bông tẩy trang, thấm nước tẩy trang dịu nhẹ phù hợp cho da dầu mụn để làm sạch da. Chú ý ở những vị trí khó tẩy trang như hốc mắt, cánh mũi, 2 bên xương hàm và đây là các vị trí mụn dễ hình thành."}
                {cat.name.toLowerCase() === "sữa rửa mặt" &&
                  "Rửa mặt cho da dầu nên được thực hiện một cách khéo léo và nhẹ nhàng. Đầu tiên, lấy một lượng nhỏ sữa rửa mặt vừa đủ vào lòng bàn tay, nhẹ nhàng xoa đều và áp lên da. Thực hiện massage nhẹ nhàng khắp khuôn mặt theo chiều xoắn ốc để loại bỏ chất bẩn. Thời gian rửa mặt nên kéo dài từ 20 đến 30 giây. Sau khi rửa mặt, sử dụng một khăn bông mềm để nhẹ nhàng thấm khô da mà không gây tác động mạnh lên các nốt mụn trên da."}
                {cat.name.toLowerCase() === "tẩy tế bào chết" &&
                  "Khi lấy đi các tế bào chết, lỗ chân lông sẽ thông thoáng, từ đó ngăn ngừa mụn và giảm thiểu tình trạng mụn lây lan, đem lại làn da sạch khỏe, dễ dàng hấp thụ các dưỡng chất chăm sóc da ở các bước tiếp theo."}
                {cat.name.toLowerCase() === "serum" &&
                  "Mở lỗ chân lông, giúp loại bỏ bã nhờn và hỗ trợ hấp thu dưỡng chất tốt hơn."}
                {cat.name.toLowerCase() === "nước hoa hồng/cân bằng" &&
                  "Cân bằng độ pH, giúp da hấp thu dưỡng chất từ các bước dưỡng tiếp theo."}
                {cat.name.toLowerCase() === "mặt nạ" &&
                  "Cung cấp dưỡng chất và độ ẩm, giúp da mềm mại và sáng khỏe hơn."}
                {cat.name.toLowerCase() === "dưỡng ẩm" &&
                  "Sử dụng kem dưỡng da dầu là một trong các bước skincare cho da dầu mụn nhằm cân bằng độ ẩm, kiểm soát hoạt động của tuyến bã nhờn, giúp da không bị khô quá mức bởi vì nếu làn da trở nên khô ráp sẽ kích thích tuyến bã nhờn tiết dầu nhiều hơn, làm tình trạng mụn nghiêm trọng hơn. Đồng thời kem dưỡng ẩm còn hỗ trợ giúp da luôn căng mịn, đàn hồi, bổ sung dưỡng chất ngăn ngừa mụn tái phát và làm mờ mụn thâm."}
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

export default OilyskinPage;

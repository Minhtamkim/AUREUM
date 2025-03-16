import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../services/api.user";
import api from "../../../../config/axios";
import SidebarRoutine from "../../sidebarRoutine";

const CombinationskinPage = () => {
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
            src="https://media.istockphoto.com/id/1262617279/photo/young-pretty-asian-caucasian-afro-woman-posing-cheerful-together-on-brown-background.jpg?s=612x612&w=0&k=20&c=tlPD2HHr3-QCjqWzoqsXIHknLJ8X6Ubpd9ublsyH-dk="
            alt="Chăm sóc da"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
            <h1 className="text-white text-4xl font-bold drop-shadow-lg text-center">LỘ TRÌNH CHĂM SÓC DA HỖN HỢP</h1>
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
                  "Làm sạch da với nước tẩy trang đều đặn mỗi ngày là bước không thể thiếu khi skincare da hỗn hợp.Ưu tiên các sản phẩm sữa có chiết xuất thiên nhiên, an toàn và lành tính với làn da hỗn hợp. "}
                {cat.name.toLowerCase() === "sữa rửa mặt" &&
                  "Bạn nên ưu tiên các loại sữa rửa mặt dịu nhẹ.Ưu tiên các sản phẩm sữa có chiết xuất thiên nhiên, an toàn và lành tính với làn da hỗn hợp."}
                {cat.name.toLowerCase() === "tẩy tế bào chết" &&
                  "Khi lấy đi các tế bào chết, lỗ chân lông sẽ thông thoáng, từ đó ngăn ngừa mụn và giảm thiểu tình trạng mụn lây lan, đem lại làn da sạch khỏe, dễ dàng hấp thụ các dưỡng chất chăm sóc da ở các bước tiếp theo."}
                {cat.name.toLowerCase() === "serum" &&
                  "Serum là giải pháp tuyệt vời để cung cấp độ ẩm cho da một cách hiệu quả. Hãy tìm những loại serum chứa cả lớp dầu và lớp nước, giúp tạo hàng rào bảo vệ ngăn ngừa tình trạng mất nước. Serum thấm sâu vào da, cung cấp độ ẩm mạnh mẽ và giúp da giữ được độ ẩm ngay cả trong điều kiện khô hanh."}
                {cat.name.toLowerCase() === "nước hoa hồng/cân bằng" &&
                  "Đây lại là bước vô cùng quan trọng, đặc biệt với làn da hỗn hợp. Dùng toner giúp làm sạch sâu, chống oxy hoá, se khít lỗ chân lông và cải thiện bề mặt da hiệu quả. Nếu bạn sở hữu làn da hỗn hợp có mụn, toner chính là sản phẩm có khả năng kháng khuẩn, làm dịu và ngăn ngừa mụn hình thành trên da."}
                {cat.name.toLowerCase() === "mặt nạ" &&
                  "Các loại mặt nạ phù hợp để skincare da hỗn hợp chính là các loại như đất sét, bùn, khoáng… giúp lỗ chân lông thông thoáng và cấp ẩm tức thì cho làn da. Đắp mặt nạ dưỡng da đều đặn 2 - 3 lần/ tuần, đặc biệt vào mùa đông là cách giúp làn da luôn mịn màng, căng sáng rạng rỡ. "}
                {cat.name.toLowerCase() === "dưỡng ẩm" &&
                  "Kem dưỡng ẩm là một trong các bước skincare cho da hỗn hợp vô cùng quan trọng để khóa nước và giữ cho làn da mềm mại, mịn màng. Hãy chọn loại kem dưỡng ẩm có khả năng dưỡng ẩm mạnh mẽ và bảo vệ da trước các điều kiện môi trường khắc nghiệt. Một loại kem dưỡng ẩm tốt sẽ đảm bảo làn da của bạn được ngậm nước suốt cả ngày, bất kể thời tiết."}
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

export default CombinationskinPage;

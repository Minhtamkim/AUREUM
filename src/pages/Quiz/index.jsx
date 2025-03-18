import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4"
      style={{
        backgroundImage: "url('/images/anhnenSkin.jpg')", // Đổi đường dẫn ảnh phù hợp
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Lớp phủ màu để làm mờ nền nếu cần */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>

      {/* Nội dung chính */}
      <div className="max-w-3xl w-full bg-white/60 backdrop-blur-md border border-white border-opacity-30 shadow-2xl rounded-2xl p-10 md:p-14 relative z-10">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">Khám phá loại da của bạn</h1>

        {/* Ảnh mới thêm vào */}
        <div className="flex justify-center mt-4">
          <img
            src="/images/loaida.jpg" // Đường dẫn ảnh, đổi thành ảnh bạn muốn
            alt="Skincare illustration"
            className="w-full max-w-120 rounded-lg shadow-md"
          />
        </div>

        <p className="text-gray-600 text-lg md:text-xl mt-4">
          Bạn đã bao giờ thực sự hiểu rõ về loại da của mình chưa? Hãy tham gia bài kiểm tra được thiết kế bởi các
          chuyên gia da liễu với hơn 15 năm kinh nghiệm. Chỉ với vài câu hỏi ngắn, bạn sẽ nhận được đánh giá chính xác
          về tình trạng da của mình cùng những gợi ý chăm sóc phù hợp.
        </p>

        {/* Nút CTA */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => navigate("/quizDetail")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-gradient-to-r from-[#C8A45D] to-black text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105 ${
              isHovered ? "animate-glow" : ""
            }`}
          >
            Bắt đầu bài kiểm tra
          </button>
        </div>
        {/* Quote */}
        <blockquote className="italic text-gray-500 mt-6">
          "Healthy skin is a reflection of overall wellness."
        </blockquote>
      </div>
    </div>
  );
};

export default QuizPage;

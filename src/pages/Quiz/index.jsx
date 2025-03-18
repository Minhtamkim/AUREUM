import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [skinType, setSkinType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Giả sử loại da được lưu trong localStorage hoặc state từ backend
    const storedSkinType = localStorage.getItem("skinType");
    if (storedSkinType) {
      setSkinType(storedSkinType);
    }
  }, []);

  const handleStartQuiz = () => {
    navigate("/quizDetail");
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4"
      style={{
        backgroundImage: "url('/images/anhnenSkin.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>

      <div className="max-w-3xl w-full bg-white/60 backdrop-blur-md border border-white border-opacity-30 shadow-2xl rounded-2xl p-10 md:p-14 relative z-10">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          {skinType ? "Bạn muốn làm lại bài kiểm tra?" : "Khám phá loại da của bạn"}
        </h1>

        <div className="flex justify-center mt-4">
          <img src="/images/loaida.jpg" alt="Skincare illustration" className="w-full max-w-120 rounded-lg shadow-md" />
        </div>

        {skinType ? (
          <p className="text-gray-600 text-lg md:text-xl mt-4">
            Bạn đã xác định loại da của mình là <strong>{skinType}</strong>. Bạn có muốn làm lại bài kiểm tra để cập
            nhật kết quả mới?
          </p>
        ) : (
          <p className="text-gray-600 text-lg md:text-xl mt-4">
            Bạn đã bao giờ thực sự hiểu rõ về loại da của mình chưa? Hãy tham gia bài kiểm tra được thiết kế bởi các
            chuyên gia da liễu với hơn 15 năm kinh nghiệm. Chỉ với vài câu hỏi ngắn, bạn sẽ nhận được đánh giá chính xác
            về tình trạng da của mình cùng những gợi ý chăm sóc phù hợp.
          </p>
        )}

        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handleStartQuiz}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-gradient-to-r from-[#C8A45D] to-black text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105 ${
              isHovered ? "animate-glow" : ""
            }`}
          >
            {skinType ? "Làm lại bài kiểm tra" : "Bắt đầu bài kiểm tra"}
          </button>
        </div>

        <blockquote className="italic text-gray-500 mt-6">
          "Healthy skin is a reflection of overall wellness."
        </blockquote>
      </div>
    </div>
  );
};

export default QuizPage;

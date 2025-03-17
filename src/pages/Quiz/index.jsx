// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const QuizPage = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();
//   return (
//     <div className="max-w-full w-screen h-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
//       <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
//         <div className="flex items-center justify-center gap-3 mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Bài kiểm tra xác định loại da</h1>
//         </div>

//         <div className="space-y-6">
//           <p className="text-gray-600 text-lg md:text-xl text-center leading-relaxed">
//             Bạn đã bao giờ thực sự hiểu rõ về loại da của mình chưa? Hãy tham gia bài kiểm tra được thiết kế bởi các
//             chuyên gia da liễu với hơn 15 năm kinh nghiệm. Chỉ với vài câu hỏi ngắn, bạn sẽ nhận được đánh giá chính xác
//             về tình trạng da của mình cùng những gợi ý chăm sóc phù hợp. Bắt đầu ngay hôm nay!"
//           </p>

//           <div className="flex flex-col items-center space-y-4">
//             <blockquote className="italic text-gray-500 text-center">
//               "Healthy skin is a reflection of overall wellness."
//             </blockquote>

//             <button
//               onClick={() => navigate("/quizDetail")}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               className={`mt-8 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold text-lg md:text-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${
//                 isHovered ? "animate-pulse" : ""
//               }`}
//             >
//               Bắt đầu làm bài kiểm tra
//             </button>
//           </div>
//         </div>

//         <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
//           <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full blur-xl" />
//           <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-300 rounded-full blur-xl" />
//           <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-300 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default QuizPage;

/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#FAF0E8] text-center relative overflow-hidden">
      {/* Hiệu ứng ánh sáng nền */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 opacity-30 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-96 h-96 opacity-30 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      {/* Nội dung chính */}
      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-md border border-white border-opacity-30 shadow-2xl rounded-2xl p-10 md:p-14 relative z-10">
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold text-gray-800 leading-tight">Khám phá loại da của bạn</h1>
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

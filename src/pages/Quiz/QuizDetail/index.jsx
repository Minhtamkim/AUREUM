import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import React from "react";
import { toast } from "react-toastify";

const questions = [
  {
    id: 1,
    question: "Câu hỏi 1: Khi thức dậy vào buổi sáng, bạn cảm thấy da mặt mình như thế nào ?",
    options: [
      { text: "Mềm mại, không quá dầu hay quá khô", value: "A", points: 5 },
      { text: "Nhờn và bóng, đặc biệt ở vùng chữ T", value: "B" },
      { text: " Khô, căng hoặc bong tróc", value: "C" },
      { text: "Nhờn ở vùng chữ T nhưng khô ở hai bên má", value: "D" },
      { text: "Dễ đỏ, kích ứng hoặc ngứa", value: "E" },
    ],
  },
  {
    id: 2,
    question: "Câu hỏi 2: Bạn có thường xuyên bị mụn không ?",
    options: [
      { text: "Hiếm khi", value: "A" },
      { text: "Thường xuyên, đặc biệt là mụn đầu đen và mụn trứng cá", value: "B" },
      { text: "Rất hiếm khi, nhưng đôi khi bị mụn do da quá khô", value: "C" },
      { text: "Có nhưng chỉ ở vùng chữ T", value: "D" },
      { text: "Thường bị kích ứng hơn là mụn", value: "E" },
    ],
  },
  {
    id: 3,
    question: "Câu hỏi 3: Khi rửa mặt xong, da bạn cảm thấy như thế nào ?",
    options: [
      { text: "Dễ chịu, không căng rát", value: "A" },
      { text: "Cảm giác nhờn quay lại rất nhanh", value: "B" },
      { text: "Căng và khô rát", value: "C" },
      { text: "Một số vùng khô, một số vùng dầu", value: "D" },
      { text: "Đỏ và châm chích nhẹ", value: "E" },
    ],
  },
  {
    id: 4,
    question: "Câu hỏi 4: Bạn cảm thấy lỗ chân lông của mình như thế nào ?",
    options: [
      { text: "Nhỏ và không quá rõ rệt", value: "A" },
      { text: "To, dễ nhìn thấy, đặc biệt ở mũi và trán", value: "B" },
      { text: "Rất nhỏ, đôi khi có cảm giác bị bí da", value: "C" },
      { text: "To ở vùng chữ T, nhỏ ở hai bên má", value: "D" },
      { text: "Dễ bị đỏ hoặc viêm khi tiếp xúc với sản phẩm mới", value: "E" },
    ],
  },
  {
    id: 5,
    question: "Câu hỏi 5: Da bạn trông như thế nào vào cuối ngày ?",
    options: [
      { text: "Vẫn bình thường, không quá bóng hay khô", value: "A" },
      { text: "Rất bóng nhờn, đặc biệt là vùng trán và mũi", value: "B" },
      { text: "Cảm giác căng và có thể bong tróc", value: "C" },
      { text: "Dầu ở trán và mũi, nhưng khô ở hai bên má", value: "D" },
      { text: "Dễ bị đỏ hoặc kích ứng khi tiếp xúc với nắng gió", value: "E" },
    ],
  },
  {
    id: 6,
    question: "Câu hỏi 6: Bạn có thường xuyên sử dụng kem dưỡng ẩm không ?",
    options: [
      { text: "Đôi khi nhưng không quá cần thiết", value: "A" },
      { text: "Rất ít vì da đã đủ dầu", value: "B" },
      { text: "Luôn cần vì da dễ bị khô", value: "C" },
      { text: "Chỉ dùng cho những vùng da khô", value: "D" },
      { text: "Cẩn thận lựa chọn vì dễ kích ứng", value: "E" },
    ],
  },
  {
    id: 7,
    question: "Câu hỏi 7: Khi trang điểm, lớp nền của bạn giữ được bao lâu ?",
    options: [
      { text: "Cả ngày mà không cần chỉnh sửa nhiều", value: "A" },
      { text: "Trôi nhanh do dầu trên da", value: "B" },
      { text: "Dễ bị mốc hoặc bong tróc", value: "C" },
      { text: "Trôi ở vùng chữ T nhưng khô ở vùng má", value: "D" },
      { text: "Dễ bị kích ứng với một số loại mỹ phẩm", value: "E" },
    ],
  },
  {
    id: 8,
    question: "Câu hỏi 8: Bạn có cảm thấy da mình thay đổi theo mùa không ?",
    options: [
      { text: "Không thay đổi nhiều", value: "A" },
      { text: "Dễ bị nhờn hơn vào mùa hè", value: "B" },
      { text: "Cực kỳ khô vào mùa đông", value: "C" },
      { text: "Mùa hè thì dầu, mùa đông thì khô", value: "D" },
      { text: "Luôn nhạy cảm bất kể thời tiết", value: "E" },
    ],
  },
  {
    id: 9,
    question: "Câu hỏi 9: Khi tiếp xúc với ánh nắng mặt trời, da bạn phản ứng như thế nào ?",
    options: [
      { text: "Không có phản ứng đặc biệt", value: "A" },
      { text: "Dầu hơn bình thường", value: "B" },
      { text: "Dễ bị khô và bong tróc", value: "C" },
      { text: "Vùng chữ T bóng dầu hơn, vùng má vẫn bình thường", value: "D" },
      { text: "Đỏ rát hoặc dễ bị kích ứng", value: "E" },
    ],
  },
  {
    id: 10,
    question: "Câu hỏi 10: Bạn có dễ bị kích ứng với mỹ phẩm hoặc các sản phẩm chăm sóc da không ?",
    options: [
      { text: "Hiếm khi", value: "A" },
      { text: "Không, da tôi khá khỏe", value: "B" },
      { text: "Đôi khi nếu sản phẩm có cồn", value: "C" },
      { text: "Một số vùng nhạy cảm hơn các vùng khác", value: "D" },
      { text: "Rất dễ bị kích ứng", value: "E" },
    ],
  },
  {
    id: 11,
    question: "Câu hỏi 11: Khi chạm tay vào mặt, da bạn cảm thấy thế nào ?",
    options: [
      { text: "Mềm mại, mịn màng", value: "A" },
      { text: "Nhờn, trơn bóng", value: "B" },
      { text: "Khô ráp hoặc bong tróc", value: "C" },
      { text: "Một số vùng nhờn, một số vùng khô", value: "D" },
      { text: "Nhạy cảm, dễ mẩn đỏ", value: "E" },
    ],
  },
  {
    id: 12,
    question: "Câu hỏi 12: Bạn có thấy da mình sáng bóng một cách tự nhiên không ?",
    options: [
      { text: "Có, vừa phải", value: "A" },
      { text: "Rất bóng nhờn, đặc biệt là vùng trán và mũi", value: "B" },
      { text: "Không, thường xỉn màu và khô", value: "C" },
      { text: "Chỉ bóng ở vùng chữ T", value: "D" },
      { text: "Không, da dễ bị đỏ hơn là bóng", value: "E" },
    ],
  },
  {
    id: 13,
    question: "Câu hỏi 13: Khi sử dụng giấy thấm dầu trên mặt, bạn thấy gì ?",
    options: [
      { text: "Dầu rất ít", value: "A" },
      { text: "Giấy thấm dầu ướt đẫm", value: "B" },
      { text: "Không có dầu hoặc rất ít", value: "C" },
      { text: "Chỉ có dầu ở vùng chữ T", value: "D" },
      { text: "Không thấm dầu nhưng có thể thấy da bị đỏ", value: "E" },
    ],
  },
  {
    id: 14,
    question: "Câu hỏi 14: Bạn có thấy da mình dễ bong tróc không ?",
    options: [
      { text: "Không", value: "A" },
      { text: "Hiếm khi, trừ khi dùng sản phẩm mạnh", value: "B" },
      { text: "Thường xuyên, đặc biệt là vào mùa lạnh", value: "C" },
      { text: "Chỉ ở hai bên má", value: "D" },
      { text: "Đôi khi do kích ứng mỹ phẩm", value: "E" },
    ],
  },
  {
    id: 15,
    question: "Câu hỏi 15: Bạn có thường xuyên bị sạm da không ?",
    options: [
      { text: "Rất ít", value: "A" },
      { text: "Không, da thường sáng bóng do dầu", value: "B" },
      { text: "Có, da dễ xỉn màu nếu không dưỡng ẩm đủ", value: "C" },
      { text: "Một số vùng sạm nhanh hơn", value: "D" },
      { text: "Thỉnh thoảng do nhạy cảm với ánh nắng", value: "E" },
    ],
  },
  {
    id: 16,
    question: "Câu hỏi 16: Khi thay đổi sản phẩm chăm sóc da, da bạn phản ứng ra sao ?",
    options: [
      { text: "Không có vấn đề gì", value: "A" },
      { text: "Không ảnh hưởng nhiều", value: "B" },
      { text: "Có thể bị khô hơn nếu không hợp", value: "C" },
      { text: "Một số vùng dễ bị kích ứng hơn", value: "D" },
      { text: "Dễ bị đỏ hoặc nổi mụn", value: "E" },
    ],
  },
  {
    id: 17,
    question: "Câu hỏi 17: Bạn có cảm thấy da mình thiếu nước không?",
    options: [
      { text: "Không", value: "A" },
      { text: "Không, nhưng da vẫn rất dầu", value: "B" },
      { text: "Có, da tôi rất khô", value: "C" },
      { text: "Một số vùng khô, một số vùng dầu", value: "D" },
      { text: "Dễ bị khô do nhạy cảm", value: "E" },
    ],
  },
  {
    id: 18,
    question: "Câu hỏi 18: Bạn có thích cảm giác sau khi dùng kem dưỡng ẩm không ?",
    options: [
      { text: "Có, nhưng không cảm thấy cần quá nhiều", value: "A" },
      { text: "Không, vì da tôi đã đủ dầu", value: "B" },
      { text: "Rất thích vì giúp da bớt khô", value: "C" },
      { text: "Chỉ cần ở một số vùng nhất định", value: "D" },
      { text: "Cẩn thận vì dễ kích ứng", value: "E" },
    ],
  },
  {
    id: 19,
    question: "Câu hỏi 19: Bạn có cảm thấy cần dùng kem chống nắng mỗi ngày không ?",
    options: [
      { text: "Có, để bảo vệ da", value: "A" },
      { text: "Có, nhưng chủ yếu để kiểm soát dầu", value: "B" },
      { text: "Có, nếu không da dễ khô hơn", value: "C" },
      { text: "Có, nhưng tôi chỉ bôi ở một số vùng", value: "D" },
      { text: "Có, vì da dễ kích ứng với ánh nắng", value: "E" },
    ],
  },
  {
    id: 20,
    question: "Câu hỏi 20: Bạn thường chọn sản phẩm chăm sóc da theo tiêu chí nào ?",
    options: [
      { text: "Cân bằng giữa dưỡng ẩm và kiểm soát dầu", value: "A" },
      { text: "Giảm dầu và ngừa mụn", value: "B" },
      { text: "Cung cấp độ ẩm cao", value: "C" },
      { text: "Phù hợp với từng vùng trên mặt", value: "D" },
      { text: "Dịu nhẹ và không gây kích ứng", value: "E" },
    ],
  },
];

// const QuizDetail = () => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [answers, setAnswers] = useState(new Array(40).fill(null));
//   const [error, setError] = useState(null);
//   const questionsPerPage = 10;
//   const totalPages = Math.ceil(questions.length / questionsPerPage);

//   const questionRefs = useRef(questions.map(() => React.createRef()));

//   const handleNextPage = () => {
//     setCurrentPage((prev) => {
//       const nextPage = Math.min(prev + 1, totalPages - 1);
//       window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang mượt mà
//       return nextPage;
//     });
//   };

//   const handleAnswer = (questionIndex, option) => {
//     setAnswers((prevAnswers) => {
//       const updatedAnswers = [...prevAnswers];
//       updatedAnswers[questionIndex] = prevAnswers[questionIndex]?.value === option.value ? null : option;
//       return updatedAnswers;
//     });
//     setError(null);
//   };

//   const handleSubmit = () => {
//     const unansweredIndex = questions.findIndex((_, index) => !answers[index]);

//     if (unansweredIndex !== -1) {
//       const newPage = Math.floor(unansweredIndex / questionsPerPage);
//       setCurrentPage(newPage);

//       toast.error("Bạn chưa trả lời hết câu hỏi! Vui lòng hoàn thành tất cả trước khi nộp bài.");
//       // Chờ cập nhật trang rồi cuộn đến câu hỏi
//       setTimeout(() => {
//         questionRefs.current[unansweredIndex]?.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//         });
//       }, 100);
//       return;
//     }
//     const isConfirmed = window.confirm("Bạn có chắc chắn muốn nộp bài không?");
//     if (!isConfirmed) return;

//     // Chuyển đến trang kết quả với dữ liệu câu trả lời
//     navigate("/quizResult", { state: { answers } });
//   };
//   const startIndex = currentPage * questionsPerPage;
//   const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

//   return (
//     <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
//       <div className="max-w-2xl w-full mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
//         <div className="flex items-center justify-center gap-3 mb-8">
//           <FaHeart className="text-pink-400 text-2xl md:text-3xl animate-pulse" />
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Bài kiểm tra xác định loại da</h1>
//         </div>

//         {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}

//         <div className="space-y-6">
//           {currentQuestions.map((question, index) => {
//             const globalIndex = startIndex + index;
//             return (
//               <div key={globalIndex} ref={questionRefs.current[globalIndex]} className="bg-gray-50 p-6 rounded-xl">
//                 <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
//                 <div className="space-y-3">
//                   {question.options.map((option) => (
//                     <button
//                       key={option.value}
//                       onClick={() => handleAnswer(globalIndex, option)}
//                       className={`w-full text-left p-4 rounded-lg transition-colors ${
//                         answers[globalIndex]?.value === option.value
//                           ? "bg-purple-100 border-2 border-purple-400"
//                           : "bg-white hover:bg-gray-100 border-2 border-gray-200"
//                       }`}
//                     >
//                       {option.value}. {option.text}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}

//           <div className="flex justify-between mt-8">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//               disabled={currentPage === 0}
//               className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold disabled:opacity-50"
//             >
//               Trang trước
//             </button>

//             {currentPage === totalPages - 1 ? (
//               <button
//                 onClick={handleSubmit}
//                 className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
//               >
//                 Hoàn thành
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextPage}
//                 className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
//               >
//                 Trang tiếp theo
//               </button>
//             )}
//           </div>

//           <div className="mt-4 text-center text-gray-500">
//             Trang {currentPage + 1}/{totalPages}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const QuizDetail = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(questions.map(() => null));
  const questionsPerPage = 10;
  const totalPages = questions.map(() => 1).reduce((acc) => acc + 1, 0) / questionsPerPage;
  const questionRefs = useRef(questions.map(() => React.createRef()));

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnswer = (questionIndex, option) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = option;
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    const unansweredIndex = questions.findIndex((_, index) => !answers[index]);
    if (unansweredIndex !== -1) {
      const newPage = Math.floor(unansweredIndex / questionsPerPage);
      setCurrentPage(newPage);
      toast.error("Bạn chưa trả lời hết câu hỏi! Vui lòng hoàn thành tất cả trước khi nộp bài.");
      setTimeout(() => {
        questionRefs.current[unansweredIndex]?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn nộp bài không?")) {
      navigate("/quizResult", { state: { answers } });
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
      <div className="max-w-2xl w-full mx-auto bg-[#F5F1EB] backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaHeart className="text-amber-400 text-2xl md:text-3xl animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Bài kiểm tra xác định loại da</h1>
        </div>

        <div className="space-y-6">
          {currentQuestions.map((question, index) => {
            const globalIndex = startIndex + index;
            return (
              <div key={globalIndex} ref={questionRefs.current[globalIndex]} className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name={`question-${globalIndex}`}
                        value={option.value}
                        checked={answers[globalIndex] === option}
                        onChange={() => handleAnswer(globalIndex, option)}
                        className="form-radio h-5 w-5 text-purple-400"
                      />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0))}
              disabled={currentPage === 0}
              className={`px-6 py-3 rounded-full font-semibold ${
                currentPage === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              Trang trước
            </button>

            {currentPage === totalPages - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-[#C8A45D] to-black text-white rounded-full font-semibold"
              >
                Hoàn thành
              </button>
            ) : (
              <button
                onClick={handleNextPage}
                className="px-6 py-3 bg-gradient-to-r from-[#C8A45D] to-black text-white rounded-full font-semibold"
              >
                Trang tiếp theo
              </button>
            )}
          </div>
          <div className="mt-4 text-center text-gray-500">
            Trang {currentPage + 1}/{totalPages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;

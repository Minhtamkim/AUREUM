import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import React from "react";

const questions = [
  {
    id: 1,
    question: "Câu hỏi 1: Sau khi rửa mặt 30 phút, da bạn cảm thấy thế nào ?",
    options: [
      { text: "Vẫn mềm mại, không thay đổi", value: "A", points: 5 },
      { text: "Hơi căng nhẹ nhưng không khó chịu", value: "B", points: 10 },
      { text: "Rất căng, có cảm giác khô ráp", value: "C", points: 15 },
      { text: "Bong tróc, cần dưỡng ngay", value: "D", points: 20 },
      { text: "Chỉ khô vào mùa đông", value: "E", points: 12.5 },
    ],
  },
  {
    id: 2,
    question: "Câu hỏi 2: Bạn có cảm thấy da mặt bóng dầu vào giữa ngày không ?",
    options: [
      { text: "Không bao giờ", value: "A", points: 5 },
      { text: "Chỉ vùng chữ T", value: "B", points: 10 },
      { text: "Khá nhiều dầu, nhất là vào buổi chiều", value: "C", points: 15 },
      { text: "Rất nhiều dầu, phải dùng giấy thấm dầu", value: "D", points: 20 },
      { text: "Chỉ khi trời nóng", value: "E", points: 12.5 },
    ],
  },
  {
    id: 3,
    question: "Câu hỏi 3: Khi không dưỡng ẩm, da bạn có thay đổi không ?",
    options: [
      { text: "Không có gì thay đổi", value: "A", points: 5 },
      { text: "Hơi khô một chút", value: "B", points: 10 },
      { text: "Rất khô, có vảy trắng", value: "C", points: 15 },
      { text: "Rất khô, căng rát", value: "D", points: 20 },
      { text: "Chỉ khi trời lạnh", value: "E", points: 12.5 },
    ],
  },
  {
    id: 4,
    question: "Câu hỏi 4: Lỗ chân lông của bạn trông như thế nào ?",
    options: [
      { text: "Nhỏ, khó nhìn thấy", value: "A", points: 5 },
      { text: "Trung bình, chỉ rõ ở vùng chữ T", value: "B", points: 10 },
      { text: "To hơn mức trung bình, dễ nhìn thấy", value: "C", points: 15 },
      { text: "Rất to, dễ bít tắc", value: "D", points: 20 },
      { text: "Chỉ thấy rõ khi nhìn gần", value: "E", points: 12.5 },
    ],
  },
  {
    id: 5,
    question: "Câu hỏi 5: Bạn có thường xuyên bị mụn đầu đen hoặc mụn ẩn không ?",
    options: [
      { text: "Không có", value: "A", points: 5 },
      { text: "Chỉ có ở vùng mũi", value: "B", points: 10 },
      { text: "Nhiều mụn đầu đen ở chữ T", value: "C", points: 15 },
      { text: "Rất nhiều mụn ẩn, mụn đầu đen", value: "D", points: 20 },
      { text: "Chỉ khi ăn đồ dầu mỡ", value: "E", points: 12.5 },
    ],
  },
  {
    id: 6,
    question: "Câu hỏi 6: Bạn có thấy da mình dễ bị nứt nẻ, bong tróc không ?",
    options: [
      { text: "Không bao giờ", value: "A", points: 5 },
      { text: "Đôi khi, khi thời tiết lạnh", value: "B", points: 10 },
      { text: "Rất dễ bị khô, bong tróc", value: "C", points: 15 },
      { text: "Luôn khô căng, cần dưỡng ẩm mạnh", value: "D", points: 20 },
      { text: "Chỉ khi không uống đủ nước", value: "E", points: 12.5 },
    ],
  },
  {
    id: 7,
    question: "Câu hỏi 7:  Khi bạn trang điểm, da bạn phản ứng như thế nào ?",
    options: [
      { text: "Lớp nền giữ nguyên cả ngày", value: "A", points: 5 },
      { text: "Hơi xuống tông ở vùng chữ T", value: "B", points: 10 },
      { text: "Nhanh xuống tông, có vết loang dầu", value: "C", points: 15 },
      { text: "Lớp nền bị chảy, bóng nhờn rất nhanh", value: "D", points: 20 },
      { text: "Chỉ khi không dùng phấn phủ", value: "E", points: 12.5 },
    ],
  },
  {
    id: 8,
    question: "Câu hỏi 8: Khi bạn thức dậy vào buổi sáng, da bạn có bóng dầu không ?",
    options: [
      { text: "Không, da bình thường", value: "A", points: 5 },
      { text: "Chỉ vùng mũi và trán", value: "B", points: 10 },
      { text: "Rất nhiều dầu trên mặt", value: "C", points: 15 },
      { text: "Dầu khắp mặt, có thể thấy bóng nhờn", value: "D", points: 20 },
      { text: "Chỉ vào mùa hè", value: "E", points: 12.5 },
    ],
  },
  {
    id: 9,
    question: "Câu hỏi 9: Bạn có cảm thấy da thiếu nước nhưng vẫn có dầu không ?",
    options: [
      { text: "Không, da cân bằng", value: "A", points: 5 },
      { text: "Đôi khi", value: "B", points: 10 },
      { text: "Thường xuyên", value: "C", points: 15 },
      { text: "Luôn cảm thấy dầu nhưng mất nước", value: "D", points: 20 },
      { text: "Chỉ khi ngủ không đủ", value: "E", points: 12.5 },
    ],
  },
  {
    id: 10,
    question: "Câu hỏi 10: Bạn có cần dùng kem dưỡng ẩm dày để tránh da bị khô không ?",
    options: [
      { text: "Không, dùng loại nhẹ là đủ", value: "A", points: 5 },
      { text: "Chỉ dùng vào mùa đông", value: "B", points: 10 },
      { text: "Luôn cần kem dưỡng ẩm mạnh", value: "C", points: 15 },
      { text: "Nếu không dưỡng, da bị bong tróc", value: "D", points: 20 },
      { text: "Chỉ khi ngồi điều hòa lâu", value: "E", points: 12.5 },
    ],
  },
  {
    id: 11,
    question: "Câu hỏi 11: Sau khi rửa mặt bằng sữa rửa mặt, da bạn có cảm giác như thế nào ?",
    options: [
      { text: "Khô căng, châm chích", value: "A", points: 5 },
      { text: "Hơi khô nhưng không khó chịu lắm", value: "B", points: 10 },
      { text: "Bình thường, không có cảm giác đặc biệt", value: "C", points: 15 },
      { text: "Mềm mịn, sảng khoái", value: "D", points: 20 },
      { text: "Hơi khô nhẹ nhưng nhanh phục hồi", value: "E", points: 12.5 },
    ],
  },
  {
    id: 12,
    question: "Câu hỏi 12: Da bạn có dễ bị đỏ hoặc kích ứng khi thay đổi sản phẩm chăm sóc da không ?",
    options: [
      { text: "Rất dễ, chỉ cần đổi sản phẩm là da phản ứng ngay", value: "A", points: 5 },
      { text: "Đôi khi có kích ứng nhẹ nhưng không thường xuyên", value: "B", points: 10 },
      { text: "Hiếm khi bị kích ứng", value: "C", points: 15 },
      { text: "Không bao giờ bị kích ứng", value: "D", points: 20 },
      { text: "Chỉ có phản ứng nhẹ trong vài lần đầu sử dụng sản phẩm mới", value: "E", points: 12.5 },
    ],
  },
  {
    id: 13,
    question:
      "Câu hỏi 13: Bạn có cảm thấy da bị nóng rát khi tiếp xúc với môi trường ô nhiễm, nắng gắt hoặc nước máy không ?",
    options: [
      { text: "Rất thường xuyên, da đỏ rát ngay lập tức", value: "A", points: 5 },
      { text: "Đôi khi bị kích ứng nhẹ", value: "B", points: 10 },
      { text: "Hiếm khi có phản ứng này", value: "C", points: 15 },
      { text: "Không bao giờ bị", value: "D", points: 20 },
      { text: "Chỉ bị khi tiếp xúc quá lâu hoặc thời tiết quá khắc nghiệt", value: "E", points: 12.5 },
    ],
  },
  {
    id: 14,
    question: "Câu hỏi 14: Bạn có dễ bị dị ứng mỹ phẩm hoặc một số thành phần nhất định trong mỹ phẩm không ?",
    options: [
      { text: "Hầu hết các loại mỹ phẩm đều gây kích ứng", value: "A", points: 5 },
      { text: "Một số sản phẩm nhất định gây kích ứng", value: "B", points: 10 },
      { text: "Hiếm khi gặp vấn đề với mỹ phẩm", value: "C", points: 15 },
      { text: "Không có vấn đề gì với mỹ phẩm", value: "D", points: 20 },
      { text: "Thỉnh thoảng có phản ứng nhưng không đáng kể", value: "E", points: 12.5 },
    ],
  },
  {
    id: 15,
    question: "Câu hỏi 15: Da bạn có dễ bị khô, bong tróc hoặc đỏ khi thời tiết thay đổi không ?",
    options: [
      { text: "Rất dễ, da bong tróc hoặc đỏ ngay khi trời thay đổi ", value: "A", points: 5 },
      { text: "Đôi khi bị nhưng không nghiêm trọng", value: "B", points: 10 },
      { text: "Hiếm khi bị ảnh hưởng", value: "C", points: 15 },
      { text: "Không bao giờ bị", value: "D", points: 20 },
      { text: "Chỉ bị khô nhẹ nhưng nhanh phục hồi", value: "E", points: 12.5 },
    ],
  },
  {
    id: 16,
    question: "Câu hỏi 16: Bạn có thường xuyên bị mẩn đỏ ở má hoặc vùng chữ T không ?",
    options: [
      { text: "Rất thường xuyên, vùng má đỏ nhiều", value: "A", points: 5 },
      { text: "Đôi khi bị đỏ nhẹ nhưng hết nhanh", value: "B", points: 10 },
      { text: "Chỉ bị khi tiếp xúc với nhiệt độ cao hoặc căng thẳng", value: "C", points: 15 },
      { text: "Không bị đỏ da bao giờ", value: "D", points: 20 },
      { text: "Đỏ nhẹ nhưng không kéo dài lâu", value: "E", points: 12.5 },
    ],
  },
  {
    id: 17,
    question: "Câu hỏi 17: Khi rửa mặt bằng nước lạnh, da bạn phản ứng thế nào ?",
    options: [
      { text: "Đỏ lên ngay lập tức và cảm giác rát", value: "A", points: 5 },
      { text: "Hơi căng nhẹ nhưng không đau rát", value: "B", points: 10 },
      { text: "Bình thường, không có phản ứng gì", value: "C", points: 15 },
      { text: "Da cảm thấy sảng khoái, dễ chịu", value: "D", points: 20 },
      { text: "Hơi kích ứng nhưng giảm nhanh sau vài phút", value: "E", points: 12.5 },
    ],
  },
  {
    id: 18,
    question:
      "Câu hỏi 18: Bạn có dễ bị nổi mụn nước hoặc phát ban khi tiếp xúc với môi trường ô nhiễm hoặc bụi bẩn không ?",
    options: [
      { text: "Rất dễ, da tôi phản ứng ngay lập tức", value: "A", points: 5 },
      { text: "Đôi khi bị nhưng không thường xuyên ", value: "B", points: 10 },
      { text: "Hiếm khi bị ảnh hưởng", value: "C", points: 15 },
      { text: "Không bao giờ bị", value: "D", points: 20 },
      { text: "Chỉ bị khi tiếp xúc trong thời gian dài", value: "E", points: 12.5 },
    ],
  },
  {
    id: 19,
    question:
      "Câu hỏi 19: Bạn có thường cảm thấy da mình yếu, dễ tổn thương khi tiếp xúc với mỹ phẩm, khí hậu hoặc nước không ?",
    options: [
      { text: "Luôn luôn cảm thấy da yếu, dễ tổn thương", value: "A", points: 5 },
      { text: "Thỉnh thoảng, nhưng không quá nghiêm trọng", value: "B", points: 10 },
      { text: "Hiếm khi có vấn đề", value: "C", points: 15 },
      { text: "Không bao giờ cảm thấy da yếu", value: "D", points: 20 },
      { text: "Có đôi lúc nhạy cảm nhưng hồi phục nhanh", value: "E", points: 12.5 },
    ],
  },
  {
    id: 20,
    question:
      "Câu hỏi 20: Bạn có bị đỏ hoặc kích ứng khi uống rượu bia, ăn đồ cay hoặc khi thời tiết thay đổi đột ngột không ?",
    options: [
      { text: "Rất dễ bị đỏ và nóng rát", value: "A", points: 5 },
      { text: "Đôi khi bị nhưng không quá nghiêm trọng", value: "B", points: 10 },
      { text: "Chỉ bị khi uống rượu hoặc ăn cay nhiều", value: "C", points: 15 },
      { text: "Không bị đỏ hay kích ứng bao giờ ", value: "D", points: 20 },
      { text: "Bị đỏ nhẹ nhưng nhanh hết", value: "E", points: 12.5 },
    ],
  },

  // Note: Add remaining 39 questions following the same structure
];

// const QuizDetail = () => {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState(new Array(40).fill(null));
//   const [isComplete, setIsComplete] = useState(false);

//   const handleAnswer = (selectedOption) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = selectedOption;
//     setAnswers(newAnswers);
//   };

//   const handleNext = () => {
//     if (currentQuestion < 39) {
//       setCurrentQuestion((curr) => curr + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((curr) => curr - 1);
//     }
//   };

//   const handleSubmit = () => {
//     if (answers.every((answer) => answer !== null)) {
//       setIsComplete(true);
//       navigate("/quizResult", { state: { answers } });
//       // Calculate results here
//     } else {
//       alert("Vui lòng trả lời tất cả câu hỏi trước khi nộp bài!");
//     }
//   };

//   return (
//     <div className="max-w-full w-screen h-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
//       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
//         <div className="flex items-center justify-center gap-3 mb-8">
//           <FaHeart className="text-pink-400 text-2xl md:text-3xl animate-pulse" />
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Bài kiểm tra xác định loại da</h1>
//         </div>

//         {!isComplete ? (
//           <div className="space-y-6">
//             <div className="bg-gray-50 p-6 rounded-xl">
//               <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
//               <div className="space-y-3">
//                 {questions[currentQuestion].options.map((option, index) => (
//                   <button
//                     key={option.value}
//                     onClick={() => handleAnswer(option)}
//                     className={`w-full text-left p-4 rounded-lg transition-colors ${
//                       answers[currentQuestion]?.value === option.value
//                         ? "bg-purple-100 border-2 border-purple-400"
//                         : "bg-white hover:bg-gray-100 border-2 border-gray-200"
//                     }`}
//                   >
//                     {option.value}. {option.text}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-between mt-8">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentQuestion === 0}
//                 className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold disabled:opacity-50"
//               >
//                 Câu trước đó
//               </button>
//               {currentQuestion === 39 ? (
//                 <button
//                   onClick={handleSubmit}
//                   className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
//                 >
//                   Hoàn thành
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleNext}
//                   className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
//                 >
//                   Câu tiếp theo
//                 </button>
//               )}
//             </div>

//             <div className="mt-4 text-center text-gray-500">Câu {currentQuestion + 1}/40</div>
//           </div>
//         ) : (
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-green-600 mb-4">Bạn đã hoàn thành bài kiểm tra!</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const QuizDetail = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(new Array(40).fill(null));
  const [error, setError] = useState(null);
  const questionsPerPage = 10;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // const handleAnswer = (questionIndex, option) => {
  //   setAnswers({ ...answers, [questionIndex]: option });
  //   setError(null); // Xóa lỗi khi người dùng chọn câu trả lời
  // };

  // const handleAnswer = (questionIndex, option) => {
  //   setAnswers((prevAnswers) => {
  //     // Nếu người dùng nhấn vào đáp án đã chọn => Xóa nó (hủy chọn)
  //     if (prevAnswers[questionIndex]?.value === option.value) {
  //       const updatedAnswers = { ...prevAnswers };
  //       delete updatedAnswers[questionIndex]; // Xóa đáp án đã chọn
  //       return updatedAnswers;
  //     }
  //     // Nếu chọn đáp án mới => Cập nhật bình thường
  //     return { ...prevAnswers, [questionIndex]: option };
  //   });
  //   setError(null); // Xóa lỗi khi chọn lại đáp án
  // };

  const questionRefs = useRef(questions.map(() => React.createRef()));

  const handleAnswer = (questionIndex, option) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = prevAnswers[questionIndex]?.value === option.value ? null : option;
      return updatedAnswers;
    });
    setError(null);
  };

  // const handlePreviousPage = () => {
  //   setError(null); // Xóa lỗi khi chuyển trang
  //   if (currentPage > 0) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleSubmit = () => {
  //   const unansweredIndex = questions.findIndex((_, index) => !answers[index]);

  //   if (unansweredIndex !== -1) {
  //     // Nếu có câu chưa trả lời, điều hướng đến trang chứa câu đó
  //     const newPage = Math.floor(unansweredIndex / questionsPerPage);
  //     setCurrentPage(newPage);
  //     setError(`Bạn chưa trả lời hết câu hỏi! Vui lòng hoàn thành tất cả trước khi nộp bài.`);
  //   } else {
  //     alert("Bạn đã hoàn thành bài kiểm tra!");
  //   }
  // };

  const handleSubmit = () => {
    const unansweredIndex = questions.findIndex((_, index) => !answers[index]);

    if (unansweredIndex !== -1) {
      const newPage = Math.floor(unansweredIndex / questionsPerPage);
      setCurrentPage(newPage);
      setError("Bạn chưa trả lời hết câu hỏi! Vui lòng hoàn thành tất cả trước khi nộp bài.");

      // Chờ cập nhật trang rồi cuộn đến câu hỏi
      setTimeout(() => {
        questionRefs.current[unansweredIndex]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
      return;
    }

    // Chuyển đến trang kết quả với dữ liệu câu trả lời
    navigate("/quizResult", { state: { answers } });
  };
  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  // return (
  //   <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
  //     <div className="max-w-2xl w-full mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
  //       <div className="flex items-center justify-center gap-3 mb-8">
  //         <FaHeart className="text-pink-400 text-2xl md:text-3xl animate-pulse" />
  //         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Bài kiểm tra xác định loại da</h1>
  //       </div>

  //       {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}

  //       <div className="space-y-6">
  //         {currentQuestions.map((question, index) => {
  //           const globalIndex = startIndex + index;
  //           return (
  //             <div key={globalIndex} className="bg-gray-50 p-6 rounded-xl">
  //               <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
  //               <div className="space-y-3">
  //                 {question.options.map((option) => (
  //                   <button
  //                     key={option.value}
  //                     onClick={() => handleAnswer(globalIndex, option)}
  //                     className={`w-full text-left p-4 rounded-lg transition-colors ${
  //                       answers[globalIndex]?.value === option.value
  //                         ? "bg-purple-100 border-2 border-purple-400"
  //                         : "bg-white hover:bg-gray-100 border-2 border-gray-200"
  //                     }`}
  //                   >
  //                     {option.value}. {option.text}
  //                   </button>
  //                 ))}
  //               </div>
  //             </div>
  //           );
  //         })}

  //         <div className="flex justify-between mt-8">
  //           <button
  //             onClick={handlePreviousPage}
  //             disabled={currentPage === 0}
  //             className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold disabled:opacity-50"
  //           >
  //             Trang trước
  //           </button>

  //           {currentPage === totalPages - 1 ? (
  //             <button
  //               onClick={handleSubmit}
  //               className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
  //             >
  //               Hoàn thành
  //             </button>
  //           ) : (
  //             <button
  //               onClick={handleNextPage}
  //               className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
  //             >
  //               Trang tiếp theo
  //             </button>
  //           )}
  //         </div>

  //         <div className="mt-4 text-center text-gray-500">
  //           Trang {currentPage + 1}/{totalPages}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
      <div className="max-w-2xl w-full mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaHeart className="text-pink-400 text-2xl md:text-3xl animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Bài kiểm tra xác định loại da</h1>
        </div>

        {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}

        <div className="space-y-6">
          {currentQuestions.map((question, index) => {
            const globalIndex = startIndex + index;
            return (
              <div key={globalIndex} ref={questionRefs.current[globalIndex]} className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(globalIndex, option)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        answers[globalIndex]?.value === option.value
                          ? "bg-purple-100 border-2 border-purple-400"
                          : "bg-white hover:bg-gray-100 border-2 border-gray-200"
                      }`}
                    >
                      {option.value}. {option.text}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold disabled:opacity-50"
            >
              Trang trước
            </button>

            {currentPage === totalPages - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
              >
                Hoàn thành
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
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

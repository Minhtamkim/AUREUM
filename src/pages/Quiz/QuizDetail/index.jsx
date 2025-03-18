import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import React from "react";
import { toast } from "react-toastify";
import { getQuestions } from "../../../services/api.question";
import { getAnswers } from "../../../services/api.answer";
import { determineSkinType, getSkinType } from "../../../services/api.skin";
import { getUser } from "../../../services/api.user";

const QuizDetail = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [skins, setSkins] = useState([]);
  const questionsPerPage = 10;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const questionRefs = useRef(questions.map(() => React.createRef()));

  // const fetchQuestions = async () => {
  //   const data = await getQuestions();
  //   setQuestions(data);
  // };

  const fetchSkins = async () => {
    const data = await getSkinType();
    setSkins(data);
  };

  const fetchUsers = async () => {
    try {
      const data = await getUser();
      if (Array.isArray(data) && data.length > 0) {
        setUsers(data);
      } else {
        console.warn("No users found!");
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin người dùng:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const data = await getAnswers();

      const questionsMap = {};
      data.forEach((item) => {
        if (!questionsMap[item.question.id]) {
          questionsMap[item.question.id] = {
            questionId: item.question.id, // Lưu ID câu hỏi
            questionText: item.question.questionText,
            answers: [],
          };
        }
        questionsMap[item.question.id].answers.push({
          id: item.id, // Lưu ID đáp án
          text: item.answerText,
        });
      });

      const formattedQuestions = Object.values(questionsMap);
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  useEffect(() => {
    fetchAnswers();
    fetchUsers();
    fetchSkins();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      console.log("User data is ready:", users);
    }
  }, [users]);

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

  const handleSubmit = async () => {
    if (users.length === 0) {
      toast.error("Không thể xác định người dùng!");
      return;
    }

    const currentUser = users[0]; // Lấy user đầu tiên
    if (!currentUser || !currentUser.id) {
      toast.error("Không thể xác định ID người dùng!");
      return;
    }

    const userId = currentUser.id;

    // Chuyển danh sách câu trả lời thành danh sách ID
    const answerIds = questions
      .map((question, index) => {
        if (!answers[index]) return null;
        const selectedAnswer = question.answers.find((a) => a.text === answers[index]);
        return selectedAnswer ? selectedAnswer.id : null;
      })
      .filter((id) => id !== null);

    if (answerIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một câu trả lời!");
      return;
    }

    try {
      const result = await determineSkinType(answerIds, userId);
      console.log("Kết quả loại da:", result);

      if (result && result.name) {
        toast.success(`Loại da của bạn là: ${result.name}`);
        navigate("/quizResult", { state: { skinType: result.name } });
      } else {
        toast.error("Không nhận diện được loại da!");
      }
    } catch (error) {
      console.error("Lỗi khi xác định loại da:", error);
      toast.error("Lỗi khi xác định loại da. Vui lòng thử lại!");
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
          <div>
            {questions.map((question, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">{question.questionText}</h2>
                <div className="space-y-3">
                  {question.answers.map((option, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option.text}
                        checked={answers[index] === option.text}
                        onChange={() => handleAnswer(index, option.text)}
                        className="form-radio h-5 w-5 text-purple-400"
                      />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

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

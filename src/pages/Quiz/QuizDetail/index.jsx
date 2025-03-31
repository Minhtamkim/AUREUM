import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import React from "react";
import { toast } from "react-toastify";
import { getAnswers } from "../../../services/api.answer";
import { determineSkinType, getSkinById, getSkinType } from "../../../services/api.skin";
import { updateUserSkin } from "../../../services/api.user";
import { useDispatch, useSelector } from "react-redux";
import { setSkin } from "../../../redux/features/userSlice";
import { showMessage } from "../../../utils/message";

const QuizDetail = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [skins, setSkins] = useState([]);
  const userId = useSelector((state) => state.user?.id); // Sử dụng useSelector để lấy userId từ store
  const dispatch = useDispatch();

  const questionRefs = useRef([]);

  useEffect(() => {
    questionRefs.current = questions.map(() => React.createRef());
  }, [questions]);

  const fetchSkins = async () => {
    const data = await getSkinType();
    setSkins(data);
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
    fetchSkins();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      console.log("User data is ready:", users);
    }
  }, [users]);

  const handleAnswer = (questionIndex, option) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = option;
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("Không thể xác định người dùng!");
      return;
    }

    // Kiểm tra câu hỏi chưa được trả lời
    const unansweredQuestions = questions.filter((question, index) => !answers[index]);

    if (unansweredQuestions.length > 0) {
      // Hiển thị thông báo lỗi cho câu hỏi chưa trả lời
      showMessage({
        content: `Vui lòng trả lời tất cả các câu hỏi. Câu hỏi chưa trả lời: ${unansweredQuestions
          .map((q) => q.questionId)
          .join(", ")}`,
        type: "error", // Đặt type là "error" cho thông báo lỗi
      });

      // Lấy questionId của câu hỏi chưa trả lời đầu tiên
      const firstUnansweredQuestionId = unansweredQuestions[0].questionId;

      // Tìm ra câu hỏi tương ứng trong ref
      const questionIndex = questions.findIndex((q) => q.questionId === firstUnansweredQuestionId);

      // Cuộn đến câu hỏi chưa trả lời
      if (questionRefs.current[questionIndex]) {
        questionRefs.current[questionIndex].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    // Chuyển danh sách câu trả lời thành danh sách ID
    const answerIds = questions
      .map((question, index) => {
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

      if (result && result.id) {
        const newUserSkin = await updateUserSkin(userId, result.id);
        console.log("Cập nhật loại da cho user:", newUserSkin);

        // Dispatch action để cập nhật skinId vào Redux store
        dispatch(setSkin({ id: result.id, name: result.name }));

        // Điều hướng đến trang quizResult và truyền thông tin về loại da
        const skinData = await getSkinById(result.id);
        navigate("/quizResult", {
          state: {
            skinId: result.id,
            skinType: skinData.name,
          },
        });
      } else {
        toast.error("Không nhận diện được loại da!");
      }
    } catch (error) {
      console.error("Lỗi khi xác định loại da:", error);
      toast.error("Lỗi khi xác định loại da. Vui lòng thử lại!");
    }
  };

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
              <div key={index} ref={questionRefs.current[index]} className="bg-gray-50 p-6 rounded-xl">
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

          <div className="mt-8">
            {/* Chỉ hiển thị nút Hoàn thành */}
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-[#C8A45D] to-black text-white rounded-full font-semibold"
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];
  const [skinType, setSkinType] = useState("");
  const [skincareRoutine, setSkincareRoutine] = useState(null);

  // Điểm cho từng đáp án
  const scoreMap = { A: 5, B: 10, C: 15, D: 20, E: 12.5 };

  // Hàm tính tổng điểm
  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + (scoreMap[answer?.value] || 0), 0);
  };

  // Xác định loại da dựa trên mức điểm
  const determineSkinType = (score) => {
    let skin = { type: "", condition: "", pigmentation: "", aging: "" };

    if (score <= 40) {
      skin = { type: "Da khô", condition: "Nhạy cảm", pigmentation: "Không nhiễm sắc tố", aging: "Căng" };
    } else if (score <= 55) {
      skin = { type: "Da khô", condition: "Nhạy cảm", pigmentation: "Không nhiễm sắc tố", aging: "Nhăn" };
    } else if (score <= 70) {
      skin = { type: "Da khô", condition: "Nhạy cảm", pigmentation: "Nhiễm sắc tố", aging: "Căng" };
    } else if (score <= 85) {
      skin = { type: "Da khô", condition: "Nhạy cảm", pigmentation: "Nhiễm sắc tố", aging: "Nhăn" };
    } else if (score <= 100) {
      skin = { type: "Da khô", condition: "Khỏe", pigmentation: "Không nhiễm sắc tố", aging: "Căng" };
    } else if (score <= 115) {
      skin = { type: "Da khô", condition: "Khỏe", pigmentation: "Không nhiễm sắc tố", aging: "Nhăn" };
    } else if (score <= 130) {
      skin = { type: "Da khô", condition: "Khỏe", pigmentation: "Nhiễm sắc tố", aging: "Căng" };
    } else if (score <= 145) {
      skin = { type: "Da khô", condition: "Khỏe", pigmentation: "Nhiễm sắc tố", aging: "Nhăn" };
    } else if (score <= 160) {
      skin = { type: "Da dầu", condition: "Nhạy cảm", pigmentation: "Không nhiễm sắc tố", aging: "Căng" };
    } else if (score <= 175) {
      skin = { type: "Da dầu", condition: "Nhạy cảm", pigmentation: "Không nhiễm sắc tố", aging: "Nhăn" };
    } else if (score <= 190) {
      skin = { type: "Da dầu", condition: "Nhạy cảm", pigmentation: "Nhiễm sắc tố", aging: "Căng" };
    } else if (score <= 205) {
      skin = { type: "Da dầu", condition: "Nhạy cảm", pigmentation: "Nhiễm sắc tố", aging: "Nhăn" };
    } else if (score <= 220) {
      skin = { type: "Da dầu", condition: "Khỏe", pigmentation: "Không nhiễm sắc tố", aging: "Căng" };
    } else if (score <= 235) {
      skin = { type: "Da dầu", condition: "Khỏe", pigmentation: "Không nhiễm sắc tố", aging: "Nhăn" };
    } else if (score <= 250) {
      skin = { type: "Da dầu", condition: "Khỏe", pigmentation: "Nhiễm sắc tố", aging: "Căng" };
    } else {
      skin = { type: "Da dầu", condition: "Khỏe", pigmentation: "Nhiễm sắc tố", aging: "Nhăn" };
    }

    return `${skin.type} - ${skin.condition} - ${skin.pigmentation} - ${skin.aging}`;
  };
  const skincareRoutines = {
    "Da khô - Nhạy cảm - Không nhiễm sắc tố - Căng": {
      routine: ["Dầu tẩy trang nhẹ", "Gel rửa mặt dưỡng ẩm", "Toner cấp nước", "Serum cấp ẩm", "Kem dưỡng khóa ẩm"],
      products: [
        "Kose Softymo Speedy Cleansing Oil",
        "Cetaphil Gentle Skin Cleanser",
        "Fresh Rose Deep Hydration Toner",
        "Estee Lauder Advanced Night Repair",
        "Belif The True Cream Aqua Bomb",
      ],
    },
    "Da khô - Nhạy cảm - Nhiễm sắc tố - Nhăn": {
      routine: [
        "Dầu tẩy trang dưỡng ẩm",
        "Sữa rửa mặt dưỡng ẩm",
        "Toner làm dịu da",
        "Serum dưỡng trắng",
        "Kem dưỡng tái tạo",
      ],
      products: [
        "Garnier Micellar Cleansing Water",
        "First Aid Beauty Pure Skin Face Cleanser",
        "Klairs Supple Preparation Toner",
        "Hyaluronic Acid 2% + B5",
        "Dr. Jart+ Ceramidin Cream",
      ],
    },
    "Da khô - Khỏe - Không nhiễm sắc tố - Căng": {
      routine: [
        "Dầu tẩy trang dưỡng da",
        "Sữa rửa mặt dịu nhẹ",
        "Toner cấp nước",
        "Serum cấp ẩm",
        "Kem dưỡng khóa nước",
      ],
      products: [
        "Simple Micellar Water",
        "Vanicream Gentle Facial Cleanser",
        "Avene Gentle Toning Lotion",
        "SkinCeuticals C E Ferulic",
        "Eucerin Advanced Repair Cream",
      ],
    },
    "Da khô - Khỏe - Nhiễm sắc tố - Nhăn": {
      routine: [
        "Dầu tẩy trang làm sạch sâu",
        "Sữa rửa mặt tạo bọt",
        "Toner dưỡng da",
        "Serum chống lão hóa",
        "Kem dưỡng tái tạo",
      ],
      products: [
        "Bioderma Sebium H2O",
        "CeraVe Foaming Facial Cleanser",
        "Some By Mi AHA-BHA-PHA 30 Days Miracle Toner",
        "SkinCeuticals C E Ferulic",
        "La Roche-Posay Toleriane Double Repair",
      ],
    },
    "Da dầu - Nhạy cảm - Nhiễm sắc tố - Căng": {
      routine: [
        "Nước tẩy trang cho da dầu",
        "Gel rửa mặt kiềm dầu",
        "Toner se khít lỗ chân lông",
        "Serum vitamin C",
        "Kem dưỡng cấp nước",
      ],
      products: [
        "Garnier Micellar Cleansing Water",
        "COSRX Low pH Good Morning Gel Cleanser",
        "Thayers Witch Hazel Toner",
        "Vichy Mineral 89",
        "Neutrogena Hydro Boost Water Gel",
      ],
    },
    "Da dầu - Nhạy cảm - Không nhiễm sắc tố - Nhăn": {
      routine: [
        "Dầu tẩy trang nhẹ dịu",
        "Sữa rửa mặt dịu nhẹ",
        "Toner cân bằng",
        "Serum phục hồi",
        "Kem dưỡng ẩm dịu nhẹ",
      ],
      products: [
        "Simple Micellar Water",
        "Eucerin DermoPurifyer Cleansing Gel",
        "Kiehl's Calendula Herbal Extract Toner",
        "Drunk Elephant C-Firma Day Serum",
        "Clinique Dramatically Different Moisturizing Gel",
      ],
    },
    "Da dầu - Khỏe - Nhiễm sắc tố - Căng": {
      routine: [
        "Tẩy trang kiềm dầu",
        "Gel rửa mặt cho da dầu",
        "Toner kiểm soát dầu",
        "Serum làm sáng da",
        "Kem dưỡng cân bằng",
      ],
      products: [
        "DHC Deep Cleansing Oil",
        "Drunk Elephant Beste No.9 Jelly Cleanser",
        "Thayers Witch Hazel Alcohol-Free Toner",
        "The Ordinary Niacinamide 10% + Zinc 1%",
        "Tatcha The Water Cream",
      ],
    },
    "Da dầu - Khỏe - Không nhiễm sắc tố - Nhăn": {
      routine: [
        "Tẩy trang dịu nhẹ",
        "Sữa rửa mặt không bọt",
        "Toner dưỡng ẩm",
        "Serum phục hồi da",
        "Kem dưỡng chuyên sâu",
      ],
      products: [
        "Banila Co Clean It Zero",
        "Hada Labo Gokujyun Foaming Cleanser",
        "Klairs Supple Preparation Facial Toner",
        "Mizon Snail Repair Intensive Ampoule",
        "CeraVe Moisturizing Cream",
      ],
    },
    "Da dầu - Nhạy cảm - Không nhiễm sắc tố - Căng": {
      routine: [
        "Nước tẩy trang không cồn",
        "Gel rửa mặt không gây khô",
        "Toner dưỡng ẩm",
        "Serum cấp nước",
        "Kem dưỡng khóa ẩm",
      ],
      products: [
        "Banila Co Clean It Zero",
        "Cetaphil Gentle Skin Cleanser",
        "Laneige Essential Power Skin Refiner",
        "Estée Lauder Advanced Night Repair",
        "Belif The True Cream Aqua Bomb",
      ],
    },
    "Da dầu - Nhạy cảm - Nhiễm sắc tố - Nhăn": {
      routine: [
        "Dầu tẩy trang dịu nhẹ",
        "Sữa rửa mặt không xà phòng",
        "Toner dưỡng ẩm",
        "Serum chống lão hóa",
        "Kem dưỡng ẩm phục hồi",
      ],
      products: [
        "Bioderma Sensibio H2O",
        "La Roche-Posay Toleriane Purifying Foaming Cleanser",
        "Paula's Choice Skin Perfecting 2% BHA",
        "The Ordinary Niacinamide 10% + Zinc 1%",
        "CeraVe Facial Moisturizing Lotion PM",
      ],
    },
    "Da dầu - Khỏe - Không nhiễm sắc tố - Căng": {
      routine: [
        "Nước tẩy trang cho da thường",
        "Gel rửa mặt dịu nhẹ",
        "Toner cấp nước",
        "Serum cấp ẩm",
        "Kem dưỡng khóa nước",
      ],
      products: [
        "Simple Micellar Cleansing Water",
        "Krave Beauty Matcha Hemp Hydrating Cleanser",
        "Etude House Soon Jung pH 5.5 Relief Toner",
        "Neogen Real Ferment Micro Serum",
        "Laneige Water Sleeping Mask",
      ],
    },
    "Da dầu - Khỏe - Nhiễm sắc tố - Nhăn": {
      routine: [
        "Dầu tẩy trang sâu",
        "Sữa rửa mặt tạo bọt",
        "Toner làm sáng da",
        "Serum retinol",
        "Kem dưỡng chống lão hóa",
      ],
      products: [
        "Banila Co Clean It Zero",
        "Vanicream Gentle Facial Cleanser",
        "Klairs Supple Preparation Unscented Toner",
        "Estee Lauder Advanced Night Repair",
        "CeraVe Moisturizing Cream",
      ],
    },
    "Da khô - Nhạy cảm - Nhiễm sắc tố - Căng": {
      routine: [
        "Nước tẩy trang dịu nhẹ",
        "Sữa rửa mặt cấp nước",
        "Toner dưỡng da",
        "Serum sáng da",
        "Kem dưỡng chống lão hóa",
      ],
      products: [
        "Banila Co Clean It Zero",
        "Cosrx Low pH Good Morning Gel Cleanser",
        "Pyunkang Yul Essence Toner",
        "Missha Time Revolution Night Repair",
        "CeraVe Moisturizing Cream",
      ],
    },
    "Da khô - Nhạy cảm - Không nhiễm sắc tố - Nhăn": {
      routine: [
        "Tẩy trang nhẹ dịu",
        "Sữa rửa mặt dưỡng ẩm",
        "Toner cân bằng",
        "Serum phục hồi",
        "Kem dưỡng chuyên sâu",
      ],
      products: [
        "Burt’s Bees Cleansing Oil",
        "Vanicream Gentle Facial Cleanser",
        "Avene Gentle Toning Lotion",
        "Drunk Elephant B-Hydra Intensive Hydration Serum",
        "Weleda Skin Food",
      ],
    },
    "Da khô - Khỏe - Nhiễm sắc tố - Căng": {
      routine: [
        "Nước tẩy trang nhẹ nhàng",
        "Sữa rửa mặt dịu nhẹ",
        "Toner cân bằng",
        "Serum sáng da",
        "Kem dưỡng nâng tông",
      ],
      products: [
        "Clinique Take The Day Off",
        "Bioderma Sensibio Gel Moussant",
        "Thayers Witch Hazel Toner",
        "The Ordinary Hyaluronic Acid 2% + B5",
        "Neutrogena Hydro Boost Gel Cream",
      ],
    },
    "Da khô - Khỏe - Không nhiễm sắc tố - Nhăn": {
      routine: ["Tẩy trang cấp ẩm", "Gel rửa mặt nhẹ", "Toner dưỡng ẩm", "Serum phục hồi", "Kem dưỡng chuyên sâu"],
      products: [
        "Banila Co Clean It Zero",
        "CeraVe Hydrating Facial Cleanser",
        "Klairs Supple Preparation Toner",
        "The Ordinary Hyaluronic Acid 2% + B5",
        "First Aid Beauty Ultra Repair Cream",
      ],
    },
  };

  useEffect(() => {
    const totalScore = calculateScore();
    // setSkinType(determineSkinType(totalScore));
    // setSkincareRoutine(skincareRoutines[determineSkinType] || null);
    const determinedSkinType = determineSkinType(totalScore);
    setSkinType(determinedSkinType);
    setSkincareRoutine(skincareRoutines[determinedSkinType] || null);
  }, [answers]);

  return (
    <div className="max-w-full w-screen h-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl">
        <h1 className="text-3xl font-bold text-center text-green-600">Kết Quả</h1>
        <p className="text-gray-600 text-center mt-4">Cảm ơn bạn đã hoàn thành bài kiểm tra!</p>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold">Loại da của bạn là:</h2>
          <p className="text-gray-700 mt-2 text-2xl font-bold">{skinType}</p>
          {skincareRoutine && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Lộ trình chăm sóc da:</h2>
              <ul className="list-disc ml-6 mt-2">
                {skincareRoutine.routine.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              <h2 className="text-xl font-semibold mt-4">Sản phẩm gợi ý:</h2>
              <ul className="list-disc ml-6 mt-2">
                {skincareRoutine.products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <a
          href="/quiz"
          className="mt-5 px-6 py-3 text-white rounded-full 
              block mx-auto text-center font-semibold 
              bg-gradient-to-r from-pink-400 to-purple-400
              shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Làm bài lại
        </a>
      </div>
    </div>
  );
};

export default QuizResult;

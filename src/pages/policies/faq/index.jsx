import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "..";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        className="w-full text-left p-5 text-lg font-semibold flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="text-xl font-bold">{isOpen ? "−" : "+"}</span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-white px-5"
      >
        <p className="py-4 text-gray-600">{answer}</p>
      </motion.div>
    </div>
  );
}

function FrequentlyAskedQuestionsPage() {
  const faqData = [
    {
      question: "Tôi có thể mua sản phẩm của công ty ở đâu?",
      answer: "Bạn có thể mua hàng trên website hoặc tại cửa hàng phân phối chính hãng gần nhất.",
    },
    {
      question: "Làm thế nào để xác định loại da của tôi?",
      answer: "Bạn có thể làm bài test trắc nghiệm trên website để xác định loại da phù hợp.",
    },
    {
      question: "Cách để thay đổi hoặc hủy đơn hàng?",
      answer: "Bạn có thể yêu cầu thay đổi hoặc hủy đơn hàng trong vòng 24h sau khi đặt hàng.",
    },
    {
      question: "Tôi có thể thanh toán bằng những phương thức nào?",
      answer: "Hệ thống hỗ trợ thanh toán qua thẻ tín dụng, ví điện tử và chuyển khoản ngân hàng.",
    },
  ];

  return (
    <div className="bg-[#f8f6f3] min-h-screen py-10 px-10">
      <div className="w-full flex">
        <Sidebar />
        <div className="w-full pl-20">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Câu Hỏi Thường Gặp</h1>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrequentlyAskedQuestionsPage;

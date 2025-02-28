import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  {
    id: 21,
    question: "Câu hỏi 21: Bạn có thấy trên da xuất hiện các vết nám, tàn nhang hoặc đốm nâu không ?",
    options: [
      { text: "Rất nhiều, xuất hiện rõ ràng", value: "A", points: 1 },
      { text: "Có một số vết nhưng không quá đậm", value: "B", points: 2 },
      { text: "Chỉ có vài đốm nhỏ, ít nhận thấy", value: "C", points: 3 },
      { text: "Không có vết nám, tàn nhang hoặc đốm nâu", value: "D", points: 4 },
      { text: "Thỉnh thoảng xuất hiện nhưng mờ dần theo thời gian", value: "E", points: 2.5 },
    ],
  },
  {
    id: 22,
    question: "Câu hỏi 22: Khi tiếp xúc với ánh nắng mặt trời mà không dùng kem chống nắng, da bạn phản ứng thế nào ?",
    options: [
      { text: "Dễ xuất hiện nám, sạm ngay sau khi đi nắng", value: "A", points: 5 },
      { text: "Bị sạm nhẹ nhưng không kéo dài lâu", value: "B", points: 10 },
      { text: "Da có thể hơi tối màu nhưng không thấy vết nám rõ rệt", value: "C", points: 15 },
      { text: "Không bị sạm hay thay đổi sắc tố đáng kể", value: "D", points: 20 },
      { text: "Chỉ bị sạm khi tiếp xúc nắng quá lâu nhưng phục hồi nhanh", value: "E", points: 12.5 },
    ],
  },
  {
    id: 23,
    question: "Câu hỏi 23: Bạn có tiền sử gia đình (bố, mẹ, anh, chị) bị nám, tàn nhang hoặc tăng sắc tố không ?",
    options: [
      { text: "Có nhiều thành viên trong gia đình bị", value: "A", points: 5 },
      { text: "Một số người trong gia đình có bị", value: "B", points: 10 },
      { text: "Chỉ có một người bị", value: "C", points: 15 },
      { text: "Không có ai bị", value: "D", points: 20 },
      { text: "Không chắc chắn nhưng có thể có yếu tố di truyền", value: "E", points: 12.5 },
    ],
  },
  {
    id: 24,
    question: "Câu hỏi 24: Bạn có thường xuyên sử dụng sản phẩm làm sáng da, trị nám, hoặc dưỡng trắng không ?",
    options: [
      { text: "Thường xuyên vì da có vấn đề sắc tố rõ rệt", value: "A", points: 5 },
      { text: "Đôi khi sử dụng để ngăn ngừa nám, sạm da", value: "B", points: 10 },
      { text: "Ít khi dùng, da không có vấn đề sắc tố lớn", value: "C", points: 15 },
      { text: "Không bao giờ dùng vì không cần thiết", value: "D", points: 20 },
      { text: "Chỉ dùng theo mùa hoặc khi cần làm đều màu da", value: "E", points: 12.5 },
    ],
  },
  {
    id: 25,
    question: "Câu hỏi 25: Da bạn có xuất hiện vết thâm sau khi bị mụn không ?",
    options: [
      { text: "Rất dễ bị thâm, vết thâm kéo dài lâu", value: "A", points: 5 },
      { text: "Có bị nhưng vết thâm mờ đi sau một thời gian dài", value: "B", points: 10 },
      { text: "Bị thâm nhẹ nhưng hồi phục khá nhanh", value: "C", points: 15 },
      { text: "Hầu như không bị thâm sau mụn", value: "D", points: 20 },
      { text: "Thỉnh thoảng bị nhưng có thể xử lý dễ dàng", value: "E", points: 12.5 },
    ],
  },
  {
    id: 26,
    question: "Câu hỏi 26:  Bạn có từng trải qua các liệu trình laser, peel da hoặc điều trị tăng sắc tố không ?",
    options: [
      { text: "Nhiều lần vì vấn đề sắc tố nghiêm trọng", value: "A", points: 5 },
      { text: "Đã thử một số phương pháp để cải thiện sắc tố", value: "B", points: 10 },
      { text: "Chỉ thử một vài lần nhưng không cần thiết lắm", value: "C", points: 15 },
      { text: "Chưa bao giờ thử vì không có vấn đề sắc tố", value: "D", points: 20 },
      { text: "Đã thử nhưng chỉ vì lý do chăm sóc da, không phải điều trị sắc tố", value: "E", points: 12.5 },
    ],
  },
  {
    id: 27,
    question: "Câu hỏi 27: Sau khi đi biển hoặc tiếp xúc với nắng nhiều, da bạn thay đổi thế nào ?",
    options: [
      { text: "Sạm đen rõ rệt và lâu hồi phục", value: "A", points: 5 },
      { text: "Có sạm nhưng hồi phục sau một thời gian dài", value: "B", points: 10 },
      { text: "Da có tối màu đi nhưng phục hồi nhanh", value: "C", points: 15 },
      { text: "Không có thay đổi sắc tố đáng kể", value: "D", points: 20 },
      { text: "Chỉ bị nhẹ và nhanh chóng đều màu trở lại", value: "E", points: 12.5 },
    ],
  },
  {
    id: 28,
    question: "Câu hỏi 28: Bạn có thấy da mình không đều màu ở một số vùng như trán, má, cằm không?",
    options: [
      { text: "Rất rõ rệt, có nhiều vùng sậm màu hơn", value: "A", points: 5 },
      { text: "Có một số vùng tối hơn nhưng không quá nghiêm trọng", value: "B", points: 10 },
      { text: "Thỉnh thoảng nhận thấy nhưng không ảnh hưởng nhiều", value: "C", points: 15 },
      { text: "Da đều màu, không có sự khác biệt lớn", value: "D", points: 20 },
      { text: "Có chút không đều nhưng không đáng kể", value: "E", points: 12.5 },
    ],
  },
  {
    id: 29,
    question: "Câu hỏi 29: Khi sử dụng mỹ phẩm có chứa vitamin C, AHA, hoặc niacinamide, da bạn phản ứng thế nào ?",
    options: [
      { text: "Dễ bị kích ứng hoặc sạm hơn nếu không dùng đúng cách", value: "A", points: 5 },
      { text: "Có hiệu quả nhưng cần thời gian dài", value: "B", points: 10 },
      { text: "Thấy hiệu quả rõ rệt, da sáng hơn", value: "C", points: 15 },
      { text: "Không thấy thay đổi sắc tố đáng kể ", value: "D", points: 20 },
      { text: "Da sáng lên nhưng chỉ ở mức nhẹ", value: "E", points: 12.5 },
    ],
  },
  {
    id: 30,
    question:
      "Câu hỏi 30: Bạn có từng bị các vết nám, sạm xuất hiện trong thai kỳ hoặc do thay đổi nội tiết tố không ?",
    options: [
      { text: "Rất nhiều, da bị ảnh hưởng rõ rệt", value: "A", points: 5 },
      { text: "Có một số vết nám nhưng không quá nhiều", value: "B", points: 10 },
      { text: "Chỉ bị một ít và đã mờ đi theo thời gian", value: "C", points: 15 },
      { text: "Không bị ảnh hưởng gì", value: "D", points: 4 },
      { text: "Bị một chút nhưng không kéo dài lâu", value: "E", points: 12.5 },
    ],
  },
  {
    id: 31,
    question: "Câu hỏi 31: Bạn có thấy các nếp nhăn xuất hiện rõ ràng trên trán hoặc quanh mắt không ?",
    options: [
      { text: "Rất rõ, ngay cả khi không biểu cảm", value: "A", points: 5 },
      { text: "Có một số nếp nhăn khi cử động gương mặt", value: "B", points: 10 },
      { text: "Chỉ có vài nếp nhỏ, khó nhận thấy", value: "C", points: 15 },
      { text: "Da mịn, không có nếp nhăn", value: "D", points: 20 },
      { text: "Chỉ xuất hiện nhẹ vào buổi sáng nhưng mờ dần trong ngày", value: "E", points: 12.5 },
    ],
  },
  {
    id: 32,
    question: "Câu hỏi 32: Da bạn có dấu hiệu chảy xệ, đặc biệt ở vùng má và đường viền hàm không ?",
    options: [
      { text: "Rõ rệt, da chùng nhão", value: "A", points: 5 },
      { text: "Có nhưng không quá nghiêm trọng", value: "B", points: 10 },
      { text: "Chỉ hơi mất độ đàn hồi một chút", value: "C", points: 15 },
      { text: "Da căng, săn chắc, không chảy xệ", value: "D", points: 20 },
      { text: "Thỉnh thoảng cảm thấy chùng nhẹ nhưng không đáng kể", value: "E", points: 12.5 },
    ],
  },
  {
    id: 33,
    question: "Câu hỏi 33: Bạn có thấy da mình dễ để lại vết hằn khi ngủ hoặc sau khi cười không ?",
    options: [
      { text: "Vết hằn rõ ràng và mất nhiều thời gian để mờ", value: "A", points: 5 },
      { text: "Có nhưng sẽ mờ sau một thời gian", value: "B", points: 10 },
      { text: "Chỉ xuất hiện rất nhẹ, khó nhận thấy", value: "C", points: 15 },
      { text: "Không bị vết hằn nào", value: "D", points: 20 },
      { text: "Đôi khi có nhưng biến mất nhanh chóng", value: "E", points: 12.5 },
    ],
  },
  {
    id: 34,
    question: "Câu hỏi 34: Khi chạm vào, da bạn có cảm giác lỏng lẻo hay vẫn đàn hồi tốt ?",
    options: [
      { text: "Rất lỏng lẻo, mất độ đàn hồi", value: "A", points: 5 },
      { text: "Hơi mềm nhưng vẫn có độ đàn hồi", value: "B", points: 10 },
      { text: "Vẫn có độ căng nhất định", value: "C", points: 15 },
      { text: "Căng và đàn hồi tốt", value: "D", points: 20 },
      { text: "Có lúc mềm hơn nhưng không quá lỏng lẻo", value: "E", points: 12.5 },
    ],
  },
  {
    id: 35,
    question: "Câu hỏi 35: Bạn có thường xuyên dưỡng ẩm hoặc dùng các sản phẩm chống lão hóa không ?",
    options: [
      { text: "Rất thường xuyên vì da dễ lão hóa", value: "A", points: 5 },
      { text: "Có sử dụng nhưng không liên tục", value: "B", points: 10 },
      { text: "Đôi khi sử dụng để duy trì độ căng", value: "C", points: 15 },
      { text: "Hiếm khi dùng vì da vẫn tốt", value: "D", points: 20 },
      { text: "Chỉ dùng khi cảm thấy cần thiết", value: "E", points: 12.5 },
    ],
  },
  {
    id: 36,
    question: "Câu hỏi 36: Bạn có thấy vùng cổ và tay của mình có nếp nhăn hoặc da mỏng hơn theo thời gian không ?",
    options: [
      { text: "Rất rõ, da mỏng và có nhiều nếp nhăn", value: "A", points: 5 },
      { text: "Có một số dấu hiệu lão hóa nhẹ", value: "B", points: 10 },
      { text: "Hơi có nếp nhăn nhưng chưa rõ rệt", value: "C", points: 15 },
      { text: "Không có dấu hiệu lão hóa đáng kể", value: "D", points: 20 },
      { text: "Thỉnh thoảng thấy da khô hơn nhưng không có nhiều nếp nhăn", value: "E", points: 12.5 },
    ],
  },
  {
    id: 37,
    question: "Câu hỏi 37: Sau khi rửa mặt, da bạn cảm thấy thế nào ?",
    options: [
      { text: "Căng khô, cảm giác không còn độ đàn hồi", value: "A", points: 5 },
      { text: "Hơi khô nhưng không quá khó chịu ", value: "B", points: 10 },
      { text: "Vẫn giữ được độ ẩm nhẹ ", value: "C", points: 15 },
      { text: "Căng mướt, đàn hồi tốt", value: "D", points: 20 },
      { text: "Chỉ căng nhẹ nhưng hồi phục nhanh sau dưỡng ẩm", value: "E", points: 12.5 },
    ],
  },
  {
    id: 38,
    question: "Câu hỏi 38: Bạn có hút thuốc hoặc tiếp xúc với môi trường ô nhiễm, bụi mịn thường xuyên không ?",
    options: [
      { text: "Thường xuyên, da có dấu hiệu lão hóa nhanh", value: "A", points: 5 },
      { text: "Đôi khi tiếp xúc nhưng có chăm sóc da", value: "B", points: 10 },
      { text: "Hạn chế tiếp xúc, có bảo vệ da tốt", value: "C", points: 15 },
      { text: "Gần như không tiếp xúc với yếu tố gây lão hóa này", value: "D", points: 20 },
      { text: "Có tiếp xúc nhưng không thấy ảnh hưởng rõ rệt ", value: "E", points: 12.5 },
    ],
  },
  {
    id: 39,
    question: "Câu hỏi 39: Bạn có thấy da mình mất đi độ căng sau tuổi 25-30 không ?",
    options: [
      { text: "Rõ rệt, da kém đàn hồi thấy rõ", value: "A", points: 5 },
      { text: "Có một chút nhưng không quá nhiều", value: "B", points: 10 },
      { text: "Chưa thấy ảnh hưởng đáng kể", value: "C", points: 15 },
      { text: "Da vẫn căng, không có dấu hiệu thay đổi lớn", value: "D", points: 20 },
      { text: "Có đôi chút nhưng có thể phục hồi nhờ dưỡng da", value: "E", points: 12.5 },
    ],
  },
  {
    id: 40,
    question: "Câu hỏi 40: Bạn có cảm giác da khô, thiếu sức sống vào mùa đông không ?",
    options: [
      { text: "Rất khô, bong tróc và nhăn nheo hơn", value: "A", points: 5 },
      { text: "Hơi khô nhưng không đến mức bong tróc", value: "B", points: 10 },
      { text: "Da khô nhẹ nhưng vẫn giữ được độ căng", value: "C", points: 15 },
      { text: "Không thấy da thay đổi, vẫn căng mướt", value: "D", points: 20 },
      { text: "Chỉ khô nhẹ nhưng hồi phục nhanh sau dưỡng ẩm", value: "E", points: 12.5 },
    ],
  },
  // Note: Add remaining 39 questions following the same structure
];

const QuizDetail = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(40).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < 39) {
      setCurrentQuestion((curr) => curr + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((curr) => curr - 1);
    }
  };

  const handleSubmit = () => {
    if (answers.every((answer) => answer !== null)) {
      setIsComplete(true);
      navigate("/quizResult", { state: { answers } });
      // Calculate results here
    } else {
      alert("Vui lòng trả lời tất cả câu hỏi trước khi nộp bài!");
    }
  };

  return (
    <div className="max-w-full w-screen h-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaHeart className="text-pink-400 text-2xl md:text-3xl animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Bài kiểm tra xác định loại da</h1>
        </div>

        {!isComplete ? (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      answers[currentQuestion]?.value === option.value
                        ? "bg-purple-100 border-2 border-purple-400"
                        : "bg-white hover:bg-gray-100 border-2 border-gray-200"
                    }`}
                  >
                    {option.value}. {option.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold disabled:opacity-50"
              >
                Câu trước đó
              </button>
              {currentQuestion === 39 ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
                >
                  Hoàn thành
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold"
                >
                  Câu tiếp theo
                </button>
              )}
            </div>

            <div className="mt-4 text-center text-gray-500">Câu {currentQuestion + 1}/40</div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Bạn đã hoàn thành bài kiểm tra!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;

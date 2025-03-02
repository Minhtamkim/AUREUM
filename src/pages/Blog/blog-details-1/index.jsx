/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

const BlogPost1 = () => {
  const [showToc, setShowToc] = useState(true);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#EFEEE8]">
      <div>
        <img
          src="https://file.hstatic.net/1000231140/file/cover_50be8133196e4e3690519d69caf7ef8b_2048x2048.png"
          alt="Quầng thâm mắt"
        />
      </div>

      <div className="container mx-auto p-6">
        {/* Tiêu đề */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          QUẦNG THÂM MẮT VÀ CÁCH KHẮC PHỤC HIỆU QUẢ VỚI GIẢI PHÁP TIÊM/THERMAGE
        </h1>

        <p id="section1" className="text-2xl font-semibold leading-relaxed mb-2">
          Quầng thâm mắt là gì?
        </p>
        <h2>
          “là một vấn đề thẩm mỹ ảnh hưởng bởi nhiều yếu tố, bao gồm cả nội sinh, ngoại sinh, lối sống, cũng như cả yếu
          tố di truyền và lão hoá.”
        </h2>

        {/* Mục lục bài viết */}
        <div className="bg-[#e8f5ef] p-4 rounded-lg max-w-2xl mx-auto my-6">
          <div className="font-semibold cursor-pointer text-gray-700" onClick={() => setShowToc(!showToc)}>
            Nội dung bài viết [{showToc ? "Ẩn" : "Hiện"}]
          </div>
          {showToc && (
            <ul className="pl-2 text-gray-700">
              <li className="cursor-pointer hover:text-amber-500  " onClick={() => scrollToSection("section1")}>
                1. QUẦNG THÂM MẮT VÀ CƠ CHẾ BỆNH SINH
              </li>
              <ul className="list-inside pl-4   ">
                <li className="cursor-pointer hover:text-amber-500" onClick={() => scrollToSection("section1")}>
                  1.1. Quầng thâm mắt là gì?
                </li>
                <li className="cursor-pointer  hover:text-amber-500 " onClick={() => scrollToSection("section1.2")}>
                  1.2. Cơ chế bệnh sinh
                </li>
              </ul>
              <li className="cursor-pointer  hover:text-amber-500 " onClick={() => scrollToSection("section2")}>
                2. TIẾP NHẬN ĐIỀU TRỊ
              </li>
              <li className="cursor-pointer  hover:text-amber-500 " onClick={() => scrollToSection("section3")}>
                3. CHỌN FILLER, MESO HAY THERMAGE ĐỂ GIẢM THÂM VÀ TRẺ HÓA VÙNG MẮT?
              </li>
              <ul className="list-inside pl-4 ">
                <li className="cursor-pointer  hover:text-amber-500 " onClick={() => scrollToSection("section4")}>
                  3.1. Mục đích điều trị
                </li>
                <li className="cursor-pointer  hover:text-amber-500 " onClick={() => scrollToSection("section5")}>
                  3.2. Tiêm filler bằng Hyaluronic Acid có liên kết chéo (cross-linked HA)
                </li>
                <li className="cursor-pointer  hover:text-amber-500 " onClick={() => scrollToSection("section6")}>
                  3.3. Meso mặt HA và các chất khác (như PRP, Vitamin C…)
                </li>
                <li className="cursor-pointer  hover:text-amber-500 " onClick={() => scrollToSection("section7")}>
                  3.4. Thermage mắt
                </li>
              </ul>
            </ul>
          )}
        </div>
        <img
          src="https://file.hstatic.net/1000231140/file/quang_tham_mat_la_gi_88efdcda1ddf4864bb0468fb8ab72d31_master.png"
          alt="Quầng thầm mắt"
        />

        {/* Nội dung bài viết */}
        <h2 id="section1.2">
          <strong>Cơ chế bệnh sinh</strong>
        </h2>
        <ul className="pt-2 pl-2">
          <li>- Tăng sắc tố vùng da quanh mắt (tương tự như thâm, nám,…)</li>
          <li>
            - Hõm lệ sâu (Deep tear trough) hay gặp ở 1 số người hoặc từ lúc sinh ra hoặc do mất thể tích dần theo năm
            tháng
          </li>
          <li>- Chảy xệ/thoát vị mô mỡ quanh mắt (Infraorbital fat herniation)</li>
          <li>- Da mỏng làm hiện diện mạch máu quanh hốc mắt rõ hơn (hoặc ứ đọng máu tĩnh mạch nông)</li>
          <li>
            - Nếp nhăn và chảy xệ vùng da quanh mắt tạo mấy cái nếp gấp nhỏ vùng dưới mắt làm vùng da tối màu hơn.
          </li>
          <li>
            - Sự thay đổi về hình thái xương ở vùng ngoại biên xương vùng hốc mắt có xu hướng rộng ra kèm sự mất thể
            thích làm vết hõm dưới mắt rộng rõ hơn, hiệu ứng tối màu rõ hơn.
          </li>
        </ul>
        <img
          src="https://file.hstatic.net/1000231140/file/co_che_benh_sinh_quang_tham_mat_d7b3da1598e64b6c89e81a0f21e763f7_2048x2048.png"
          alt="cơ chế bệnh sinh"
        />

        <p id="section2" className="text-2xl font-semibold leading-relaxed mb-2">
          TIẾP NHẬN ĐIỀU TRỊ
        </p>
        <p>
          Dù có là phương pháp nào, dù mức độ nặng nhẹ của quầng thâm bạn thế nào thì mình vẫn tôn trọng câu chuyện bạn
          nên bôi thoa bôi dưỡng hằng ngày, nếu mà không chi cho 1 sản phẩm dưỡng mắt riêng cho vùng mắt thì hãy ít nhất
          dùng chính dưỡng ẩm của bạn và hoàn toàn đừng quên dưỡng mắt mỗi ngày nhé! Sản phẩm dưỡng mắt ít nhất cũng sẽ
          giúp cải thiện lưu thông máu, nếp nhăn nhỏ, hay đều màu hơn. À đừng quên chống nắng, che chắn vật lý cho mắt
          là chuyện dĩ nhiên nha. Vùng nào da càng nhạy cảm, mỏng manh, càng phải chăm sóc, bảo vệ nó nhiều hơn những
          vùng khác một chút.
        </p>
        <br />
        <p>
          Với những người trẻ hay một số người may mắn ^^, quầng thâm mắt đơn giản xuất hiện trong 1 đêm trắng của bạn
          thì cũng có thể cải thiện thông qua việc ngủ đủ giấc và thay đổi lối sống lành mạnh. Láng thì thật sự có ngủ
          đủ giấc mắt nó vẫn thâm ^^
        </p>
        <img
          src="https://file.hstatic.net/1000231140/file/tiep_can_dieu_tri_quang_tham_mat_9adf4613da534f8ab08d12b68c0371ae_2048x2048.png"
          alt="Tiếp nhận điều trị"
        />

        <p id="section3" className="text-2xl font-semibold leading-relaxed mb-2">
          CHỌN FILLER, MESO HAY THERMAGE ĐỂ GIẢM THÂM VÀ TRẺ HÓA VÙNG MẮT?
        </p>
        <img
          src="https://file.hstatic.net/1000231140/file/on_filler__meso_hay_thermage_de_giam_quang_tham_va_tre_hoa_vung_da_mat_a07e1802e20d41888b698732f29c0357_2048x2048.png"
          alt="filler,meso hay thermage"
        />
        <h2 id="section4">
          <strong>Mục đích điều trị</strong>
        </h2>
        <ul className="pt-2 pl-2">
          <li>- Làm đầy hõm lệ sâu.</li>
          <li>- Làm đầy nếp nhăn, vết châm chim và căng bóng làn da.</li>
          <li>- Bổ trợ cho vùng mô mỡ bị chảy xệ, trẻ hoá vùng mắt.</li>
        </ul>

        <h2 className="pt-2" id="section5">
          <strong>Tiêm filler bằng Hyaluronic Acid có liên kết chéo (cross-linked HA)</strong>
        </h2>
        <ul className="pt-2 pl-2">
          <li>
            - Là phương pháp được <strong>lựa chọn nhiều nhất</strong> (nhất là nếu bạn có hõm lệ sâu nhé, gần như là
            tối ưu với <strong>tình trạng hõm lệ sâu</strong>).
          </li>
          <li>
            - Filler HA có thể cải thiện các vấn đề liên quan đến con đường bệnh sinh của quầng thâm mắt nói trên khi mà
            làm đầy tức thì hõm lệ, thậm chí các filler xịn với HA có liên kết hiện nay còn được nghiên cứu khẳng định
            cải thiện chất lượng làn da, góp phần chung cho sức khoẻ vùng da mắt.
          </li>
        </ul>

        <h2 className="pt-2" id="section6">
          <strong>Meso mắt HA và các chất khác (như PRP, Vitamin C…)</strong>
        </h2>
        <p className="p-2">
          Cần đi nhiều buổi hơn, tuy nhiên nó không phải chất làm đầy nên nếu hiệu ứng đổ bóng do hõm lệ của bạn tạo ra
          quầng thâm nặng thì bạn sẽ thấy không cải thiện mấy.
        </p>
        <p className="p-2">
          Dĩ nhiên meso vẫn làm da khoẻ, sáng một phần, hơn hết chắc chắn là giảm nếp nhăn và phòng ngừa chuyện tương
          lai, duy trì sáng khoẻ. Nhưng đừng đòi hỏi cao quá ở phương pháp này nhé mà hãy xem là một phương pháp duy trì
          thì hợp lý. Meso thật ra an toàn hơn Filler HA nhiều nên bạn nhớ lưu ý có rất nhiều nơi trên thị trường nói là
          tiêm meso, thật ra đâu đó họ có rãi filler để làm đầy lên cho bạn thấy hiệu ứng căng và sáng liền khi hõm lệ
          đầy nhẹ lên á.
        </p>
        <img
          src="https://file.hstatic.net/1000231140/file/lieu_phap_meso_93885e3250954e1b96e44464763972f1_2048x2048.png"
          alt="meso"
        />

        <h2 className="pt-2" id="section7">
          <strong>Thermage mắt</strong>
        </h2>
        <p className="p-2">
          <strong>"Đắt nhưng xắt ra miếng" </strong>- Liệu trình duy nhất mà mình sẽ lựa chọn cho người lớn tuổi. Hoàn
          toàn không xâm lấn, không đâm cây kim nào vào là thấy ổn áp hơn nhiều rồi đó.
        </p>
        <p className="p-2">
          Nếu mà tình trạng da mắt nhăn nhiều, vết chân chim, sụp mí mắt, mí mắt 2 mí mà lâu lâu cứ còn 1 mí lót thì rất
          đáng thử Thermage nha. Gần như mình không có lựa chọn khác đâu. Thermage với sóng RF đơn cực là liệu trình duy
          nhất an toàn và hiệu quả nhất cho mắt hiện giờ có khả năng làm săn chắc và làm dày da bằng cách kích thích
          tăng sinh collagen mới và tái cấu trúc collagen bị lão hoá nên cũng đỡ 1 phần cho hõm lệ lắm luôn.
        </p>
        <img
          src="https://file.hstatic.net/1000231140/file/lieu_phap_thermage_7c3b4486b9e4471892867bf91620e474_2048x2048.png"
          alt="thermage mắt"
        />

        <div className="flex justify-between items-center mt-6 border-t border-black pt-4"></div>
      </div>
    </div>
  );
};

export default BlogPost1;

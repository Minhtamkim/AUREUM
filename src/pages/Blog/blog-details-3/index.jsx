/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

const BlogPost3 = () => {
  const [showToc, setShowToc] = useState(true);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#EFEEE8]">
      <div>
        <img
          src="https://file.hstatic.net/1000231140/file/cover-tay_te_bao_chet_3355c94ee57c4dc483a487abcbdfb909_master.png"
          alt="tẩy tế bào chết hóa học"
        />
      </div>

      <div className="container mx-auto p-6">
        {/* Tiêu đề */}
        <h1 className="text-xl md:text-3xl  text-center mb-8">
          TẤT TẦN TẬT VỀ TẨY TẾ BÀO CHẾT HOÁ HỌC
        </h1>
        <div className="flex justify-between items-center mt-6 border-t border-white pt-4"></div>
        <img
          src="https://file.hstatic.net/1000231140/file/tai_sao_chung_ta_lai_phai_tay_te_bao_chet___be234a0bcc6f475585083ed14c6954ad_master.png"
          alt="tại sao chúng ta phải tẩy tế bào chết?"
        />

        {/* Mục lục bài viết */}
        <div className="bg-[#e8f5ef] p-4 rounded-lg max-w-2xl mx-auto my-6">
          <div
            className="font-semibold cursor-pointer text-gray-700"
            onClick={() => setShowToc(!showToc)}
          >
            Nội dung bài viết [{showToc ? "Ẩn" : "Hiện"}]
          </div>
          {showToc && (
            <ul className="pl-2 text-gray-700">
              <li
                className="cursor-pointer"
                onClick={() => scrollToSection("section1")}
              >
                1. TẠI SAO CHÚNG TA PHẢI TẨY TẾ BÀO CHẾT?
              </li>
              <ul className="list-inside ">
                <li
                  className="cursor-pointer"
                  onClick={() => scrollToSection("section2")}
                >
                  2. PHÂN LOẠI CÁC HOẠT CHẤT TẨY TẾ BÀO CHẾT
                </li>
                <li
                  className="cursor-pointer pl-4"
                  onClick={() => scrollToSection("section3")}
                >
                  2.1 Phân biệt AHA và BHA
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => scrollToSection("section4")}
                >
                  3. TẨY TẾ BÀO CHẾT NÀO CHO DA BẠN?
                </li>
              </ul>
            </ul>
          )}
        </div>

        {/* Nội dung bài viết */}

        <p id="section1" className="text-3xl font-bold mt-6 mb-2">
          TẠI SAO CHÚNG TA PHẢI TẨY TẾ BÀO CHẾT?
        </p>
        <ul className="pt-2 font-light">
          <li>
            Da tự nhiên có cơ chế đào thải da chết liên tục, nhưng theo thời
            gian chủ yếu là do tuổi tác và tác động của môi trường nên quá trình
            này sẽ chậm lại và có thể dừng hoàn toàn. Từ đó dẫn đến da bị lão
            hóa, lỗ chân lông bị giãn nở, da khô bong tróc, xuất hiện các nếp
            nhăn và màu da không đồng đều.
          </li>
          <li>
            <strong>
              Chính vì thế, tẩy da chết là một điều cần thiết cho tất cả các
              loại da, thậm chí là da nhạy cảm.
            </strong>
          </li>
          <li>
            Tẩy da chết là việc loại bỏ các tế bào da đã chết, keratin hóa trên
            bề mặt giúp da khỏe mạnh. Thường xuyên tẩy da chết có thể làm giảm
            sự xuất hiện của mụn, nếp nhăn, giải phóng lỗ chân lông bị bí tắc,
            giảm sự tăng sắc tố, quầng thâm ở mắt và giảm lượng dầu thừa. Đây là
            một phần quan trọng của chu trình chăm sóc da khoa học và chuyên
            nghiệp.
          </li>
        </ul>
        <img
          src="https://file.hstatic.net/1000231140/file/chu_trinh_thay_da_05c7dd40838643bb9bc35a4e6c66b5b6_2048x2048.png"
          alt="chu trình thay da"
          className="mt-4"
        />
        <img
          src="https://file.hstatic.net/1000231140/file/chu_trinh_thay_da_theo_do_tuoi_b2ace32fab674572822306528dc8740f_2048x2048.png"
          alt="chu trình thay da theo tuổi"
          className="mt-4"
        />

        <p
          id="section2"
          className="text-3xl font-bold leading-relaxed mb-2 mt-2"
        >
          PHÂN LOẠI CÁC HOẠT CHẤT TẨY TẾ BÀO CHẾT
        </p>
        <img
          src="https://file.hstatic.net/1000231140/file/phan_loai_cac_chat_tay_te_bao_chet_hoa_hoc__ac0740c036d749c2b19bc549a9c45439_2048x2048.png"
          alt="Phân loại các chất tẩy tế bào chét hóa học"
        />
        <img
          src="https://file.hstatic.net/1000231140/file/bang_-_phan_loai_cac_chat_tay_te_bao_chet_hoa_hoc__34302994cd174f8f9410505d80ee5083_2048x2048.png"
          alt="Phân loại các chất tẩy tế bào chét hóa học"
        />

        <p
          id="section3"
          className="text-2xl font-semibold leading-relaxed mb-2"
        >
          Phân biệt AHA và BHA
        </p>
        <ul className="pt-2 pl-4 ">
          <li>
            - <strong>AHA</strong> là nhóm acid hydroxy hòa tan trong nước nên
            hoạt động ở lớp tế bào sừng, có tác dụng tốt trong việc làm mờ thâm,
            nám, làm sáng da. Được sử dụng và biết đến nhiều nhất là acid
            glycolic do nó có kích thước phân tử nhỏ, có thể xâm nhập vào da dễ
            dàng, sâu nên khả năng sinh khả dụng lớn, ảnh hưởng sâu vào trong da
            hơn các loại AHA khác. Acid glycolic, acid lactic, acid citric… đều
            là các AHA có thể dùng trong tẩy tế bào chết, tác động đến da làm
            tăng sinh collagen, tăng sinh tế bào, loại bỏ những tế bào chết, già
            cõi khô ráp, xỉn màu,da tổn thương do ánh nắng mặt trời, da có kết
            cấu ko đồng đều.
          </li>
          <li>
            - AHA không độc với cơ quan sinh sản hay với sự sinh trưởng, an toàn
            khi có thai.
          </li>
          <li>
            - <strong>BHA</strong> là nhóm acid hydroxy hòa tan trong dầu do đó
            có thể giải quyết các vấn đề về lỗ chân lông, da nhờn dễ bị mụn
            trứng cá. Hoạt động bằng cách làm sạch sâu các lỗ chân lông, loại bỏ
            lượng dầu thừa, bụi bẩn cùng lượng da chết do đó giúp giảm hình
            thành mụn. Ngoài ra do có nguồn gốc từ acetyl salicylic acid nên có
            khả năng kháng viêm.
          </li>
          <li>
            Tuy nhiên cũng lưu ý thêm là vì lo ngại khả năng ngộ độc của BHA mà
            nồng độ BHA bị giới hạn ở 2-4% thêm nữa một số công thức "không
            cồn", nhiều dưỡng dịu nhẹ lại khiến BHA hoạt động kém, dễ gây viêm
            nhất là đối với da mụn.
          </li>
        </ul>

        <img
          src="https://file.hstatic.net/1000231140/file/aha_vs_bha_e3ab1579f5384a39ba018aa5539ecca6_2048x2048.png"
          alt="Cơ chế hoạt động của AHA và BHA"
          className="mt-4"
        />

        <p
          id="section4"
          className="text-2xl font-semibold leading-relaxed mb-2"
        >
          TẨY TẾ BÀO CHẾT NÀO CHO DA BẠN?
        </p>
        <h2>𝐍𝐞𝐨𝐬𝐭𝐚𝐭𝐚 𝐎𝐢𝐥𝐲 𝐒𝐤𝐢𝐧 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧 𝐀𝐇𝐀 𝟖</h2>

        <ul className="pt-2 pl-4 font-light">
          <li>
            Một đề cử xứng đáng cho top những AHA được yêu thích tại Láng. Cho
            những bạn chưa biết thì Neostrata chính là cha đẻ của AHA ( brand
            đầu tiên nghiên cứu và ứng dụng thành công AHA vào skincare) á, đó
            là lý do dễ hiểu làm Láng tin tưởng em này nhiều hơn 1 chút^^. Đây
            là 1 AHA nền cồn - nước, cụ thể hơn là cồn alcohol denat làm tăng
            “sức mạnh” của AHA trong công thức, có thể cho hiệu quả tương đương
            với các công thức AHA 12 - 14% khác.
          </li>
        </ul>
        <img
          src="https://file.hstatic.net/1000231140/file/bha_-_giai_quyet_nhieu_van_de_ve_lo_chan_long_va_ba_nhon__78d45247a37f419da3ee148e879b469b_master.png"
          alt="Giải quyết nhiều vấn đề về lỗ chân lông và bã nhờn"
          className="mt-4"
        />
        <h2>𝐎𝐛𝐚𝐠𝐢 𝐂𝐥𝐞𝐧𝐳𝐢𝐝𝐞𝐫𝐦 𝐌𝐃 𝐏𝐨𝐫𝐞 𝐓𝐡𝐞𝐫𝐚𝐩𝐲</h2>

        <ul className="pt-2 pl-4 font-light">
          <li>
            BHA trên nền cồn giúp BHA vào sâu trong da, làm sạch hơn rất nhiều,
            lớp sừng mềm đi thấy rõ. Sự thật là Pore Therapy hoạt động cực kỳ
            nhanh, hiệu quả, mụn hết nhanh hơn rất nhiều nhất là với các làn da
            đang bị mụn nhiều, và vật vã với mụn lâu năm.
          </li>
          <li>
            Dẫu vậy, hiện tượng over-exfoliation rất dễ xảy ra với Pore Therapy
            vì quá mạnh. Da căng ra ngay tức thì, rất căng và bóng lên nhưng tạo
            thành các rãnh nhỏ nhất là vùng trên trán và 2 bên gò má. Một tips
            nhỏ là các bạn nên dùng ít sản phẩm lại và liều dùng sẽ tăng từ từ
            lên theo thời gian. Giãn tần suất hay lượng sử dụng mỗi lần cũng sẽ
            giúp giảm thiểu kích ứng đáng kể.
          </li>
        </ul>
        <img
          src="https://file.hstatic.net/1000231140/file/lha__pha_-_diu_nhe_hon_cho_lan_da_nhay_cam__98e9e56a8dbb47b7906f9168476c72b8_master.png"
          alt="Dịu nhẹ hơn cho làn da nhạy cảm"
        />

        <h2>𝐒𝐤𝐢𝐧𝐜𝐞𝐮𝐭𝐢𝐜𝐚𝐥𝐬 𝐁𝐥𝐞𝐦𝐢𝐬𝐡 + 𝐀𝐠𝐞 𝐃𝐞𝐟𝐞𝐧𝐬𝐞</h2>

        <ul className="pt-2 pl-4 font-light">
          <li>
            Kết hợp 2% Axit Dioic chiết xuất từ các loại rau giúp giảm bã nhờn
            dư thừa, 0,3% LHA (caproloyl axit salicylic) giúp se nhỏ lỗ chân
            lông giúp làn da trở nên mịn màng hơn và 3,5% Glycolic Acid + 0,5%
            Citric Acid giúp ngăn ngừa và xóa mờ các rãnh và nếp nhăn, cân chỉnh
            tông da đều màu hơn. Thành phần có chứa tổ hợp AHA + BHA + LHA luôn
            nên rất hiệu quả trong việc điều trị mụn, từ mụn cám mụn đầu đen đến
            mụn mủ sưng viêm và kể cả mụn ẩn.
          </li>
          <li>
            Bạn này tuy có khả năng trị mụn rất mạnh nhưng lại khá lành tính và
            ít gây kích ứng da kể cả làn da nhạy cảm và đặc điểm vượt trội ở
            serum Blemish đó là ngoài trị mụn thì còn giúp trị thâm, ngừa thâm
            và chống lão hóa, cải thiện các rãnh nhăn, làm da sáng đồng đều màu
            hơn, căng mướt, lỗ chân lông se nhỏ lại thấy rõ mà các sp khác trên
            thị trường không thể tích hợp được.
          </li>
        </ul>
        <div className="text-end m-2 font-bold">SẢN PHẨM LIÊN QUAN</div>
        <div className="flex justify-between items-center border-t border-black pt-4"></div>
      </div>
    </div>
  );
};

export default BlogPost3;

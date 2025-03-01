import { useState } from "react";

const BlogPost0 = () => {
  const [showToc, setShowToc] = useState(true);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#EFEEE8]">
      <div>
        <img
          src="https://file.hstatic.net/1000231140/file/cover_1e5b21e8b4cf4679a85781a4e4c95804_2048x2048.png"
          alt="Chống lão hóa"
        />
      </div>

      <div className="container mx-auto p-6">
        {/* Tiêu đề */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          CỐT LÕI CỦA VIỆC CHỐNG LÃO HÓA NẰM Ở ĐÂU?
        </h1>

        {/* Mục lục bài viết */}
        <div className="bg-[#e8f5ef] p-4 rounded-lg max-w-2xl mx-auto my-6">
          <div
            className="font-semibold cursor-pointer text-gray-700"
            onClick={() => setShowToc(!showToc)}
          >
            Nội dung bài viết [{showToc ? "Ẩn" : "Hiện"}]
          </div>
          {showToc && (
            <ul className="mt-2 text-gray-700">
              <li
                className="cursor-pointer"
                onClick={() => scrollToSection("section1")}
              >
                1. Ma trận ngoại bào nằm ở đâu?
              </li>
              <li
                className="cursor-pointer"
                onClick={() => scrollToSection("section2")}
              >
                2. Các thành phần chính của ma trận ngoại bào
              </li>
              <li
                className="cursor-pointer"
                onClick={() => scrollToSection("section3")}
              >
                3. Lão hóa các thành phần của ma trận ngoại bào
              </li>
            </ul>
          )}
        </div>
        <p className="leading-relaxed">
          Nói mọi người nghe, thật sự chăm da từ sớm không hề hối hận tí nào đâu
          để 1 ngày như Láng mọi người nhìn U40 mà không có nếp nhăn hay trộm
          vía nhìn như 27 28 tuổi hay vẫn được kiu bằng bé là một điều hết sức
          vui ^^
        </p>
        <p className="leading-relaxed">
          Một thập kỷ qua, chăm sóc da từ tại nhà đến phòng khám gần như bùng nổ
          ở Việt Nam và bạn có nhận ra một điều rằng, rất nhiều sản phẩm chăm
          sóc da hoặc các liệu pháp tại các spa/clinic phòng khám đều tập trung
          vào sự trẻ hóa cho làn da. Chúng vẫn hiện diện ở đâu đó theo kiểu:
        </p>
        <ul className="p-2">
          <li>
            <strong>
              - Bạn ơi, hãy uống Collagen để bổ sung Collagen cho da đi
            </strong>
          </li>
          <li>
            <strong>
              - Bạn ơi, bôi thoa các hoạt chất như Retinol, Peptide, Hyaluronic
              acid... để tăng khả năng chống lão hóa
            </strong>
          </li>
          <li>
            <strong>
              - Hay xa hơn và có điều kiện kinh tế thì thử các giải pháp công
              nghệ cao từ máy móc hiện đại, tiêm HA hay Collagen, căng chỉ...
            </strong>
          </li>
        </ul>
        <p className="leading-relaxed">
          Một trong các công cuộc níu kéo thanh xuân này nằm cốt lõi ở việc phục
          hồi và tăng cường củng cố chức năng của{" "}
          <strong>MA TRẬN NGOẠI BÀO (ECM hay MTNB)</strong> mà trong bài viết
          này Láng muốn mọi người hiểu rõ hơn về nó cũng như quá trình lão hoá
          của cấu trúc này và tại sao một trong các chuyện chống lão hoá chống
          già sẽ nằm chính ở phần ma trận ngoại bào.
        </p>
        <p className="leading-relaxed">
          <strong>Ma trận ngoại bào (MTNB)</strong> là tổ hợp các thành phần bên
          ngoài tế bào. Ngoài việc cung cấp một bệ nâng đỡ về mặt cấu trúc cũng
          như sự hỗ trợ neo đậu của các tế bào chẳng hạn như tạo ra môi trường
          đệm nhằm giữ nước và cân bằng nội môi, MTNB còn thực hiện các chức
          năng truyền tín hiệu quan trọng giúp điều chỉnh sự di chuyển, tăng
          sinh, biệt hóa, trao đổi chất và sự sống sót của các tế bào tiếp xúc.
          Còn về chi tiết trong ma trận ngoại bào đặc biệt ở da chúng ta thì mời
          bạn cùng Láng đọc tiếp phần dưới đây nhen!
        </p>

        {/* Nội dung bài viết */}
        <div>
          <h2 id="section1" className="text-xl font-bold mt-6 mb-2">
            Ma trận ngoại bào nằm ở đâu?
          </h2>
          <p>
            Phân loại theo vùng chúng ta sẽ có Ma trận ngoại bào nằm ở
            <br />
            <em>
              [1] không gian kẽ giữa các tế bào (Interstitial matrix) và
              <br />
              [2] vùng màng đáy (Basement membrane)
            </em>
          </p>
          <img
            src="https://file.hstatic.net/1000231140/file/banner_1_1755baf9605449a49dbc333ac9ae92ad_2048x2048.png"
            alt="Ma trận ngoại bào "
          />

          <h1 id="section2" className="text-xl font-bold">
            Các thành phần chính của ma trận ngoại bào
          </h1>
          <h2 id="section2" className=" font-bold mt-6 mb-2">
            Collagen
          </h2>
          <p>
            Collagen là loại protein dạng sợi có nhiều nhất trong MTNB và chiếm
            tới 30% tổng khối lượng protein của động vật đa bào, và có khoảng 7
            loại Collagen tồn tại trong toàn cơ thể con người. Và có 2 dạng
            Collagen mà giới khoa học thấy được: Collagen dạng sợi (là Collagen
            loại I và III) sẽ tạo thành khung xương cốt lõi ở phần kẽ của các tế
            bào phần trung bì, trong khi collagen dạng mạng lưới sẽ tồn tại ở
            màng đáy.
          </p>
          <br />
          <p>
            Khi đề cập về mặt da liễu, Collagen loại I và III thường xuyên được
            nhắc đến, vì chúng cấu tạo nên các bệ đỡ cho những bộ phận như dây
            chằng, gân, da… Hơn nữa, chúng còn đóng vai trò trong quá trình lành
            thương ở da, tạo độ đàn hồi, co giãn và giữ các mô liên kết với
            nhau. Đặc biệt, Collagen loại I thường chiếm số lượng ưu thế hơn so
            với các Collagen loại khác, chẳng hạn như ở da: Collagen loại I
            chiếm ~85% và Collagen loại III chiếm ~14%, hay ở dây chẳng thì loại
            I chiếm ~90% và loại II chiếm ~10%.
          </p>
          <br />
          <p>
            Vậy tại sao Collagen loại III lại chiếm hàm lượng ít hơn so với
            Collagen loại I ? Collagen loại III cũng không kém phần quan trọng
            để cấu tạo nên làn da, nhưng chúng chỉ tồn tại rất nhiều trong các
            mô của bào thai. Khi ở dạng bào thai, Collagen loại III ban đầu
            chiếm hơn một nửa tổng lượng collagen, và điều này cũng cho chúng ta
            thấy được 1 điều rằng làn da em bé sẽ luôn mịn màng và đàn hồi nhất
            định. Tuy nhiên, sự tổng hợp Collagen loại I vượt quá khả năng sản
            xuất Collagen loại III sau khi ra khỏi bụng mẹ, do đó ở da người
            trưởng thành, tỷ lệ collagen loại I/III là khoảng 5-6:1.
          </p>
          <br />
          <p>
            Hiển nhiên, khi tuổi chúng ta càng lớn, sự sản xuất cũng như lượng
            Collagen đang có sẽ giảm dần, điều này đa phần là do yếu tố ngoại
            sinh, đặc biệt là tia UVA (bởi đây là loại tia có khả năng đâm sâu
            vào tầng trung bì - nơi các chất nền ngoại bào đang âm thầm giúp đỡ
            da bạn săn chắc).
          </p>
          <h2 id="section2" className=" font-bold mt-6 mb-2">
            Các Glycoproteins và proteins ngoại bào
          </h2>
          <p className="leading-relaxed">
            Nổi bật trong nhóm thành phần này sẽ có <strong>Laminin</strong> và{" "}
            <strong>Fibronectin</strong>
          </p>
          <ul className="p-2">
            <li>
              <strong>- Fibronectin</strong> là một protein sợi quan trọng trong
              ma trận ngoại bào, giúp quá trình đông máu diễn ra thuận lợi và hỗ
              trợ phục hồi vết thương. Ngoài ra, nó còn giúp Collagen và Elastin
              kết dính, lắng đọng dễ dàng, góp phần tái tạo làn da.
            </li>
            <li>
              <strong>- Laminin</strong> là một thành phần cực kỳ quan trọng mà
              nhiều mối quan tâm dần đổ dồn về khi nó nằm chính ở vùng màng đáy
              giúp ổn định độ bám dính của thượng bì và làm trung gian cho sự
              giao tiếp giữa thượng bì và trung bì, đồng thời có thể tương tác
              với các sợi cơ neo và collagen 7.
            </li>
          </ul>
          <img
            src="https://file.hstatic.net/1000231140/file/banner_2_2aea9db51381424f8b2106c8f68613c2_2048x2048.png"
            alt="Các Glycoproteins và proteins ngoại bào"
          />

          <h2 id="section3" className="text-xl font-bold mt-6">
            Lão hóa các thành phần của ma trận ngoại bào
          </h2>
          <p className="pt-2">
            Đọc ở phần trên, có lẽ chúng ta cảm thấy hơi “ngộp thở” vì MTNB có
            cấu trúc ở cấp độ vi mô mà chúng ta không thể thấy bằng mắt thường.
            Vậy ở thế giới vi mô đó sẽ diễn ra những gì khi mà khoa học đã chứng
            minh sự sụp đổ của MTNB chính là 1 trong các nguyên nhân lớn dẫn đến
            lão hóa. Vậy mắt trần da thịt của chúng ta làm sao để biết có sự
            thoái hóa đó và dẫn đến việc cho ra những phát minh tiên tiến hơn
            trong ngành mỹ phẩm hiện nay ?
            <br />
            <br />
            Cái chết hiểu đơn giản nhất sẽ là
            <br />
            <strong>1/ mọi thứ già đi và tự chết dần</strong>
            <br />
            <strong> 2/ khả năng tăng sinh tái tạo không còn</strong>
            <br />
            <br />
            Theo lẽ đó, các thuyết lão hóa mà khoa học đặt ra có thể kể đến như
            thuyết “gốc tự do về lão hóa”. Các gốc tự do hoạt động (oxy hoạt
            động) dù là nội sinh hay ngoại sinh sẽ theo thời gian phá hủy và làm
            chết các tế bào, hay Láng hay gọi quá trình già đi chính là quá
            trình oxy hóa cho đến chết. Tương tự những thuyết khác hoặc là tế
            bào tự chết, mất khả năng hay già yếu đi tự nhiên như “Thuyết về sự
            kìm hãm quá trình tăng sinh tế bào” - HAYFLICK LIMIT theo đó mỗi tế
            bào chỉ có thể tăng sinh giới hạn trong khoảng 50 lần, hay Thuyết về
            sự chết theo chương trình - Programmed Cell Death hay còn gọi là lập
            trình cho sự chết của tế bào, theo đó các tế bào bị hư hỏng sẽ được
            đưa và chương trình chết mặc định. Vì vậy, với quá trình lão hóa
            diễn ra, không chỉ do các tác nhân oxy hóa tác động bên ngoài, bên
            trong, mà các tế bào chịu trách nhiệm chính sản sinh các thành phần
            của lớp MTNB đóng vai trò quan trọng cũng chết yếu dần hay mất khả
            năng như Nguyên bào sợi - tế bào có nhiều nhất ở lớp trung bì và
            chịu trách nhiệm tổng hợp và tái cấu trúc một MTNB phức tạp với
            collagen, Elastin và các glycosaminoglycans (GAGs).
            <img
              src="https://file.hstatic.net/1000231140/file/banner_3_ee5ec02faccb4779837fc6d3e7c7179c_2048x2048.png"
              alt=""
            />
          </p>
        </div>

        <div className="flex justify-between items-center mt-6 border-t border-black pt-4"></div>
      </div>
    </div>
  );
};

export default BlogPost0;

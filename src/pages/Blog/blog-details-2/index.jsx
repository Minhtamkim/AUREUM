/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

const BlogPost2 = () => {
  const [showToc, setShowToc] = useState(true);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#EFEEE8]">
      <div>
        <img
          src="https://file.hstatic.net/1000231140/file/cover_80237ed7af1f4a8d9cbbc5e517cff70f_master.png"
          alt="Điều trị thâm, sạm, nám"
        />
      </div>

      <div className="container mx-auto p-6">
        {/* Tiêu đề */}
        <h1 className="text-xl md:text-3xl  text-center mb-8">
          3 LIỆU PHÁP TỐI ƯU HIỆU QUẢ ĐIỀU TRỊ THÂM, SẠM, NÁM
        </h1>
        <div className="flex justify-between items-center mt-6 border-t border-white pt-4"></div>

        <p className="text-xl  leading-relaxed mb-2">
          <strong>ĐA PHƯƠNG THỨC</strong> đã là kim chỉ nam ngay từ ngày đầu
          Láng's Clinic hoạt động. Theo đó, để đem lại một hiệu quả điều trị tối
          ưu, tổng hòa, toàn diện nhất, Combined Therapy hay Integrated
          Treatment đã luôn được đội ngũ các Bác sĩ, Dược sĩ, Chuyên viên tại
          Láng chú trọng và ứng dụng trên rất nhiều ca điều trị thành công
        </p>

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
                1. BA LIỆU PHÁP TỐI ƯU HIỆU QUẢ ĐIỀU TRỊ THÂM, SẠM, NÁM
              </li>
              <ul className="list-inside pl-4">
                <li
                  className="cursor-pointer"
                  onClick={() => scrollToSection("section2")}
                >
                  1.1. BÔI THOA TẠI NHÀ
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => scrollToSection("section3")}
                >
                  1.2. PEEL DA HÓA HỌC
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => scrollToSection("section4")}
                >
                  1.3. LASER TONING
                </li>
              </ul>
            </ul>
          )}
        </div>

        {/* Nội dung bài viết */}

        <h2 id="section1" className="text-3xl font-bold mt-6 mb-2">
          BA LIỆU PHÁP TỐI ƯU HIỆU QUẢ ĐIỀU TRỊ THÂM, SẠM, NÁM
        </h2>
        <ul className="pt-2 pl-4 font-light">
          <li>
            - Bôi thoa tại nhà là điều trị bắt buộc, chuẩn bị kiểm soát điều trị
            và duy trì hiệu quả
          </li>
          <li>
            - Peel da hoá học: bong tróc các mảng sắc tố thượng bì thúc đẩy tăng
            sinh có kiểm soát của mô da, cải thiện toàn diện sức khoẻ làn da,
            trong đó có sắc tố
          </li>
          <li>- Laser và ánh sáng</li>
        </ul>
        <img
          src="https://file.hstatic.net/1000231140/file/boi_thoa_tai_nha_93955726992c43ba8c714a29586727c3_master.png"
          alt="cơ chế bệnh sinh"
          className="mt-4"
        />

        <p
          id="section2"
          className="text-2xl font-semibold leading-relaxed mb-2 mt-2"
        >
          BÔI THOA TẠI NHÀ
        </p>
        <ul className="pt-2 pl-4 font-light">
          <li>+ Là liệu pháp lựa chọn đầu tay trong mọi điều trị sắc tố</li>
          <li>
            + Bác sĩ thiết kế phác đồ điều trị bôi thoa tại nhà cho từng cá nhân
            và Dược sĩ hướng dẫn + theo dõi sử dụng trong suốt quá trình điều
            trị
          </li>
          <li>
            + Không chỉ giúp chuẩn bị nền da trước các thủ thuật khác mà còn
            tăng cường và duy trì hiệu quả sau các điều trị
          </li>
          <li>
            + Sản phẩm từ các thương hiệu lớn, với nhiều nghiên cứu lâm sàng
            chứng minh được tính an toàn, hiệu quả trong điều trị
          </li>
        </ul>

        <img
          src="https://file.hstatic.net/1000231140/file/peel_da_hoa_hoc_1465447789fa4df8968c0d945174ff2f_master.png"
          alt="Peel da hóa học"
          className="mt-4"
        />

        <p
          id="section3"
          className="text-2xl font-semibold leading-relaxed mb-2 mt-2"
        >
          PEEL DA HÓA HỌC
        </p>
        <ul className="pt-2 pl-4 font-light">
          <li>
            + Là lựa chọn thứ 2 trong các phác đồ điều trị tăng sắc tố đặc biệt
            là nám má
          </li>
          <li>
            + Tác động không chỉ đến con đường hình thành sắc tố mà còn tái tạo
            làn da tổng thể và đạt được sức khỏe làn da tốt nói chung
          </li>
          <li>+ An toàn, hiệu quả cao trên diện rộng</li>
          <li>
            + Lựa chọn dòng peel chuyên nghiệp đến từ các thương hiệu Dược mỹ
            phẩm hàng đầu trên thế giới
          </li>
          <li>
            + Peel da chỉ hiệu quả khi điều trị theo liệu trình từ 4 - 6 đợt kèm
            theo việc sử dụng các phương pháp bôi thoa đúng
          </li>
        </ul>
        <img
          src="https://file.hstatic.net/1000231140/file/laser-toning_c8975dd3ed5b491a81ca85694fe7b68d_master.png"
          alt="laser toning"
          className="mt-4"
        />

        <p
          id="section4"
          className="text-2xl font-semibold leading-relaxed mb-2 mt-2"
        >
          LASER TONING
        </p>
        <ul className="pt-2 pl-4 font-light">
          <li>
            + Sử dụng công nghệ laser siêu xung của máy laser Fotona StarWalker
            với thông số được tinh chỉnh chuẩn xác tác động theo lý thuyết
            Subcellular Selective Photolysis với mục tiêu tác động chính các túi
            sắc tố melanosome và melanin, bảo toàn sức khỏe lớp thượng bì đặc
            biệt là bảo toàn melanocytes và các tế bào xung quanh, giúp hạn chế
            tối đa tình trạng relapse (tái phát) của các laser truyền thống
          </li>
          <li>
            + Trung bình điều trị từ 5 - 10 lần, mỗi lần cách nhau 2 tuần - 1
            tháng
          </li>
          <li>
            + Đặc biệt chế độ của StarWalker còn song song giúp phục hồi màng
            đáy - một trong những nguyên nhân chính làm tăng sắc tố trung bì
          </li>
        </ul>

        <div className="flex justify-between items-center mt-6 border-t border-black pt-4"></div>
      </div>
    </div>
  );
};

export default BlogPost2;

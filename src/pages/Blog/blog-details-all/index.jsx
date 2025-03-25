/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const BlogPostAll = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const posts = [
    {
      id: 1,
      title: "CỐT LÕI CỦA VIỆC CHỐNG LÃO HÓA NẰM Ở ĐÂU?",
      date: "15.09.24",
      category: "Làm đẹp",
      description:
        "Một trong các công cuộc níu kéo thanh xuân này nằm cốt lõi ở việc phục hồi và tăng cường củng cố chức năng của MA TRẬN NGOẠI BÀO (ECM hay MTNB) mà trong bài viết này Láng muốn mọi...",
      image:
        "https://theme.hstatic.net/1000231140/1000917511/14/blog_slider_1_2048x2048.jpg?v=694",
      path: "/blogs/cot-loi-cua-viec-chong-lao-hoa-nam-o-dau",
    },
    {
      id: 2,
      title:
        "QUẦNG THÂM MẮT VÀ CÁCH KHẮC PHỤC HIỆU QUẢ VỚI GIẢI PHÁP TIÊM/THERMAGE",
      date: "15.03.24",
      category: "Làm đẹp",
      description:
        "Quầng thâm mắt là câu chuyện được quan tâm nhiều ngày nay. Bên cạnh thói quen sinh hoạt và chống nắng đầy đủ, viêc duy trì bôi thoa là cần thiết để cải thiện quầng thâm mắt. Tuy nhiên với...",
      image:
        "https://file.hstatic.net/1000231140/file/cover_50be8133196e4e3690519d69caf7ef8b_2048x2048.png",
      path: "/blogs/quang-tham-mat-va-cach-khac-phuc-hieu-qua",
    },
    {
      id: 3,
      title: "3 LIỆU PHÁP TỐI ƯU HIỆU QUẢ ĐIỀU TRỊ THÂM, SẠM, NÁM",
      date: "11.11.24",
      category: "Làm đẹp",
      description:
        "Khai phá sức mạnh của các công nghệ laser hiệu quả và peel da hoá học để giải quyết các vấn đề về da như tăng sắc tố, da xỉn màu, thâm, sạm, nám hay kể cả lỗ chân lông....",
      image:
        "https://file.hstatic.net/1000231140/file/cover_80237ed7af1f4a8d9cbbc5e517cff70f_master.png",
      path: "/blogs/3-lieu-phap-toi-uu-hieu-qua-dieu-tri-tham-sam-nam",
    },
    {
      id: 4,
      title: "TẤT TẦN TẬT VỀ TẨY TẾ BÀO CHẾT HOÁ HỌC",
      date: "27.12.24",
      category: "Làm đẹp",
      description:
        "Tại sao lại cần tẩy tế bào chết? Chắc hẳn hầu hết các bạn đọc của Láng đều không còn xa lạ gì với tầm quan trọng của việc tẩy da chết nhỉ, đặc biệt là các làn da dày...",
      image:
        "https://file.hstatic.net/1000231140/file/cover-tay_te_bao_chet_3355c94ee57c4dc483a487abcbdfb909_master.png",
      path: "/blogs/tat-tan-tat-ve-tay-te-bao-chet-hoa-hoc",
    },
    {
      id: 5,
      title:
        "Chương trình 'Ửng hồng Không ửng đỏ' - chung tay chăm sóc trẻ em vùng cao",
      date: "27.12.24",
      category: "Aureum",
      description:
        "Chương trình 'Ửng Hồng Không Ửng Đỏ' được Aureum và UNESCO-CEP triển khai nhằm hướng đến một mục tiêu thiết thực là xây dựng sân chơi an toàn, sạch sẽ cho trẻ em vùng cao, góp phần nâng cao điều kiện học tập và mang lại niềm vui cho trẻ em vùng cao.",
      image:
        "https://image.cocoonvietnam.com/uploads/Hinh_1_Social_Ung_Hong_29d3981238.jpg",
      path: "/blogs/chuong-trinh-ung-hong-khong-cu-do-chung-tay-cham-soc-tre-em-vung-cao",
    },
    {
      id: 6,
      title: "Chương trình Cùng Aureum Sống Xanh Mỗi Ngày năm 2024",
      date: "27.12.24",
      category: "Aureum",
      description:
        "Từ tháng 9/2024, Aureum mang lại 115 điểm thu hồi vỏ chai trực tiếp, được triển khai tại 25 tỉnh thành trên khắp Việt Nam để khách hàng dễ dàng tham gia vào việc thu hồi vỏ chai cũ.",
      image:
        "https://image.cocoonvietnam.com/uploads/CSR_Ra_mat_thu_doi_vo_chai_cu_2024_240909_Hinh_con_2_fe4cd256d2.jpg",
      path: "/blogs/chuong-trinh-cung-aureum-song-xanh-moi-ngay",
    },
    {
      id: 7,
      title:
        "Aureum x AAF: Chung tay cứu trợ chó mèo lang thang cùng Tổ chức Động vật Châu Á",
      date: "27.12.24",
      category: "Aureum",
      description:
        " Với mỗi sản phẩm giới hạn được được bán ra, Aureum sẽ trích 10.000đ để ủng hộ vào quỹ của AAF nhằm san sẻ những khó khăn về lương thực, y tế với các trạm cứu hộ chó mèo tại Việt Nam và triển khai chương trình tiêm vắc xin phòng bệnh dại cho chó mèo trong cộng đồng.",
      image:
        "https://image.cocoonvietnam.com/uploads/415085052_386885407032234_3443578595605445153_n_bc7e14f94f.jpg",
      path: "/blogs/chung-tay-cuu-tro-cho-meo-lang-thang",
    },
  ];
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };
  return (
    <div>
      <div className="bg-[#FAF0E8] text-black py-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-6">Bài viết nổi bật</h2>
        <section className="max-w-6xl mx-auto relative">
          <div
            className="relative cursor-pointer overflow-hidden group"
            onClick={() => navigate(posts[currentIndex].path)}
          >
            <img
              src={posts[currentIndex].image}
              alt={posts[currentIndex].title}
              className="w-full h-120 object-cover group-hover:opacity-80 transition"
            />
          </div>
          {/* Nút điều hướng */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white"
            onClick={prevSlide}
          >
            <GoArrowLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white"
            onClick={nextSlide}
          >
            <GoArrowRight size={24} />
          </button>
        </section>
      </div>

      <div className="bg-[#FAF0E8] text-black py-12 px-6 md:px-20">
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a
                key={post.id}
                onClick={() => navigate(post.path)}
                className="block group cursor-pointer"
              >
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-72 object-cover group-hover:opacity-80 transition"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">{post.date}</p>
                <h3 className="text-xl font-bold mt-2 group-hover:text-[#C4B7A6] transition">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{post.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPostAll;

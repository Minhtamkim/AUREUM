/* eslint-disable react/no-unescaped-entities */
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
  const navigate = useNavigate();
  const posts = [
    {
      id: 1,
      title:
        "QUẦNG THÂM MẮT VÀ CÁCH KHẮC PHỤC HIỆU QUẢ VỚI GIẢI PHÁP TIÊM/THERMAGE",
      date: "15.03.24",
      category: "Làm đẹp",
      description:
        "Quầng thâm mắt là câu chuyện được quan tâm nhiều ngày nay. Bên cạnh thói quen sinh hoạt và chống nắng đầy đủ, viêc duy trì bôi thoa là cần thiết để cải thiện quầng thâm mắt. Tuy nhiên với...",
      image:
        "https://file.hstatic.net/1000231140/article/quang_tham_mat_va_cach_khac_phuc_4e383291947546cdb94f69a4042a6f1f_large.png",
      path: "/blogs/quang-tham-mat-va-cach-khac-phuc-hieu-qua",
    },
    {
      id: 2,
      title: "3 LIỆU PHÁP TỐI ƯU HIỆU QUẢ ĐIỀU TRỊ THÂM, SẠM, NÁM",
      date: "11.11.24",
      category: "Làm đẹp",
      description:
        "Khai phá sức mạnh của các công nghệ laser hiệu quả và peel da hoá học để giải quyết các vấn đề về da như tăng sắc tố, da xỉn màu, thâm, sạm, nám hay kể cả lỗ chân lông....",
      image:
        "https://file.hstatic.net/1000231140/article/thumbnail_b487853f76334b799c24f49f16649d95_large.png",
      path: "/blogs/3-lieu-phap-toi-uu-hieu-qua-dieu-tri-tham-sam-nam",
    },
    {
      id: 3,
      title: "TẤT TẦN TẬT VỀ TẨY TẾ BÀO CHẾT HOÁ HỌC",
      date: "27.12.24",
      category: "Làm đẹp",
      description:
        "Tại sao lại cần tẩy tế bào chết? Chắc hẳn hầu hết các bạn đọc của Láng đều không còn xa lạ gì với tầm quan trọng của việc tẩy da chết nhỉ, đặc biệt là các làn da dày...",
      image:
        "https://file.hstatic.net/1000231140/article/thumbnail-tay_te_bao_chet_753483fbc47547368d2a601eb9e6341a_large.png",
      path: "/blogs/tat-tan-tat-ve-tay-te-bao-chet-hoa-hoc",
    },
    {
      id: 4,
      title:
        "Chương trình 'Ửng hồng Không ửng đỏ' - chung tay chăm sóc trẻ em vùng cao",
      date: "27.12.24",
      category: "Cocoon",
      description:
        "Chương trình 'Ửng Hồng Không Ửng Đỏ' được Cocoon và UNESCO-CEP triển khai nhằm hướng đến một mục tiêu thiết thực là xây dựng sân chơi an toàn, sạch sẽ cho trẻ em vùng cao, góp phần nâng cao điều kiện học tập và mang lại niềm vui cho trẻ em vùng cao.",
      image:
        "https://image.cocoonvietnam.com/uploads/Hinh_1_Social_Ung_Hong_29d3981238.jpg",
      path: "/blogs/chuong-trinh-ung-hong-khong-cu-do-chung-tay-cham-soc-tre-em-vung-cao",
    },
    {
      id: 5,
      title: "Chương trình Cùng Cocoon Sống Xanh Mỗi Ngày năm 2024",
      date: "27.12.24",
      category: "Cocoon",
      description:
        "Từ tháng 9/2024, Cocoon mang lại 115 điểm thu hồi vỏ chai trực tiếp, được triển khai tại 25 tỉnh thành trên khắp Việt Nam để khách hàng dễ dàng tham gia vào việc thu hồi vỏ chai cũ.",
      image:
        "https://image.cocoonvietnam.com/uploads/CSR_Ra_mat_thu_doi_vo_chai_cu_2024_240909_Hinh_con_2_fe4cd256d2.jpg",
    },
    {
      id: 6,
      title:
        "Cocoon x AAF: Chung tay cứu trợ chó mèo lang thang cùng Tổ chức Động vật Châu Á",
      date: "27.12.24",
      category: "Cocoon",
      description:
        " Với mỗi sản phẩm giới hạn được được bán ra, Cocoon sẽ trích 10.000đ để ủng hộ vào quỹ của AAF nhằm san sẻ những khó khăn về lương thực, y tế với các trạm cứu hộ chó mèo tại Việt Nam và triển khai chương trình tiêm vắc xin phòng bệnh dại cho chó mèo trong cộng đồng.",
      image:
        "https://image.cocoonvietnam.com/uploads/415085052_386885407032234_3443578595605445153_n_bc7e14f94f.jpg",
    },
  ];
  return (
    <div className="bg-[#FAF0E8] text-black py-12 px-6 md:px-20">
      <section className="  max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Nội dung văn bản */}
        <div>
          <p className="text-xl font-bold tracking-widest uppercase">
            Bài viết
          </p>
          <p className="text-4xl  font-bold leading-tight mt-4">
            Cốt lõi của việc "Chống Lão Hóa" nằm ở đâu?
          </p>
          <p className="text-gray-600 mt-4">
            Một trong các công cuộc níu kéo thanh xuân này nằm cốt lõi ở việc
            phục hồi và tăng cường củng cố chức năng của MA TRẬN NGOẠI BÀO (ECM
            hay MTNB) mà trong bài viết này Láng muốn mọi...
          </p>
          <button
            className="mt-6 px-6 py-3 border border-black flex items-center gap-2 hover:bg-[#C4B7A6] hover:text-black transition uppercase"
            onClick={() =>
              navigate("/blogs/cot-loi-cua-viec-chong-lao-hoa-nam-o-dau")
            }
          >
            Đọc Bài Viết
            <GoArrowRight />
          </button>
        </div>

        {/* Hình ảnh */}
        <div className="relative">
          <img
            src="https://file.hstatic.net/1000231140/article/thumbnail_bced3ac550684f14bc2d29972f8da588_large.png"
            alt="Chống lão hóa"
          />
          <div className="absolute bottom-4 right-4"></div>
        </div>
      </section>

      <section className="bg-cream py-12">
        <div>
          <div className="flex items-center justify-between py-5">
            <p className="text-3xl italic font-serif mb-6">Làm đẹp</p>
            <button className="px-6 py-3 border border-black flex items-center gap-2 hover:bg-[#C4B7A6] hover:text-black transition uppercase">
              Tất cả bài viết
              <GoArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts
              .filter((post) => [1, 2, 3].includes(post.id)) // Lọc ra những bài viết có id là 1, 2, 3
              .map((post) => (
                <a
                  key={post.id}
                  onClick={() => navigate(post.path)}
                  className="block group"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-60 object-cover group-hover:opacity-80 transition"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    {post.category} | {post.date}
                  </p>
                  <h3 className="text-lg font-semibold mt-2 group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                </a>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-12">
        <div>
          <div className="flex items-center justify-between py-5">
            <p className="text-3xl italic font-serif mb-6">Cocoon</p>
            <button className="px-6 py-3 border border-black flex items-center gap-2 hover:bg-[#C4B7A6] hover:text-black transition uppercase">
              Tất cả bài viết
              <GoArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts
              .filter((post) => [4, 5, 6].includes(post.id))
              .map((post) => (
                <a
                  key={post.id}
                  onClick={() => navigate(post.path)}
                  className="block group"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-60 object-cover group-hover:opacity-80 transition"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    {post.category} | {post.date}
                  </p>
                  <h3 className="text-lg font-semibold mt-2 group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                </a>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;

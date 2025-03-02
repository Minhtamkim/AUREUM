import { useNavigate } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const BlogPost06 = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      title: "Cùng AUREUM sống xanh mỗi ngày: Điểm Xanh Online",
      description: "Tiếp tục lan tỏa các 'thông điệp xanh' hướng đến Mẹ Trái Đất...",
      image: "https://image.cocoonvietnam.com/uploads/Website_Posts_1_44672a4847.jpg",
      path: "/blogs/chuong-trinh-cung-aureum-song-xanh-moi-ngay",
    },
    {
      id: 2,
      title: "AUREUM x AAF: Chung tay bảo vệ loài gấu cùng Tổ chức Động vật Châu Á",
      description: "Mỗi phiên bản giới hạn được bán ra Aureum sẽ đóng góp 10.000đ...",
      image: "https://image.cocoonvietnam.com/uploads/Website_Posts_2_01c6db287a.jpg",
      path: "/blogs/chung-tay-cuu-tro-cho-meo-lang-thang",
    },
    {
      id: 3,
      title: "Cocoon x Suboi: 'Queen' Chất – 'luôn có một nữ hoàng hiện diện trong bản thân bạn'",
      description: "Cocoon tin rằng, dù bạn là ai, bạn đến từ đâu...",
      image: "https://image.cocoonvietnam.com/uploads/HAU_05224_Vuong_Website_b76c8e6bda.png",
    },
  ];
  return (
    <div className="bg-[#FAF5EF] py-10 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Phần nội dung bên trái */}
        <div className="col-span-1">
          <p className="text-sm text-gray-500 font-semibold">
            <span className="">
              {" "}
              <strong>AUREUM</strong>
            </span>{" "}
            | 01.01.70 | 24 PHÚT
          </p>
          <h1 className="text-4xl font-semibold italic mt-2 leading-snug">
            Cocoon x AAF: Chung tay cứu trợ chó mèo lang thang cùng Tổ chức Động vật Châu Á
          </h1>
          <p className="text-gray-600 italic mt-3">
            By <span className="font-semibold text-gray-900">Hồng Hoa</span>
          </p>

          <div className="max-w-lg mx-auto mt-20">
            <h2 className="text-2xl font-extrabold	 text-gray-900 mb-4">Bài viết phổ biến</h2>

            <div className="space-y-6 ">
              {posts.map((post) => (
                <a key={post.id} onClick={() => navigate(post.path)} className="flex space-x-4 ">
                  <div>
                    <img src={post.image} alt={post.title} className="w-30 h-20 object-cover rounded-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 hover:underline">{post.title}</h3>
                    <p className="text-gray-600 text-sm">{post.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Phần nội dung bên phải */}
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <span className="text-gray-600 font-semibold">Chia sẻ</span>
            <a href="#" className="text-black hover:text-main">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-black hover:text-main">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Tiếp tục sự đồng lòng trong việc yêu thương và tôn trọng động vật cũng như cảm nhận rõ ràng thực trạng chó
            mèo lang thang hiện nay, vào ngày 27/12/2023, Mỹ Phẩm AUREUM đồng hành cùng Tổ Chức Động Vật Châu Á AAF
            trong lễ ký kết "CHUNG TAY CỨU TRỢ CHÓ MÈO LANG THANG". Chúng tôi cam kết hướng đến các mục tiêu quan trọng
            trong chiến dịch lần này:
          </p>
          <p className="mt-2 text-gray-700 leading-relaxed">
            • Trao tặng lương thực, các vật dụng cần thiết và hỗ trợ các phúc lợi về y tế cho các trạm cứu hộ chó mèo
            tại Việt Nam
          </p>
          <p className="mt-2 text-gray-700 leading-relaxed">
            • Triển khai chương trình tiêm chủng vắc xin phòng bệnh dại cho chó mèo trong cộng đồng
          </p>
          <p className="mt-2 text-gray-700 leading-relaxed">
            • Lan tỏa về lòng yêu thương và ý thức trách nhiệm khi nhận nuôi chó mèo
          </p>

          {/* Hình ảnh */}
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/415085052_386885407032234_3443578595605445153_n_bc7e14f94f.jpg"
              alt="cứu trợ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/414728609_386888907031884_8253492245699795474_n_20c8bc30a5.jpg"
              alt="cứu trợ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-6 pt-4">
            <div>
              <p className="text-gray-700">
                Trong khuôn khổ của chiến dịch lần này, AUREUM và AAF sẽ kết hợp cho ra mắt các PHIÊN BẢN GIỚI HẠN, với
                mỗi sản phẩm giới hạn được bán ra, chúng tôi sẽ trích 10.000đ ủng hộ vào quỹ của AAF để thực hiện dự án
                này.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">• LƯU Ý:</h3>
              <p className="text-gray-700">
                AUREUM đã đặc biệt thiết kế nên 10 “chiếc áo mới” với 10 màu sắc chủ đạo riêng cùng 10 hình ảnh đáng yêu
                của những em chó mèo khác nhau: Chó Corgi - Chó Cỏ - Chó Husky - Chó Pug - Chó Poodle - Mèo Mướp Vàng -
                Mèo Xiêm - Mèo Anh Lông Ngắn - Mèo Ba Tư - Mèo Ai Cập
              </p>
            </div>
          </div>
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/z5021305687275_931328c9693764413fc38e1b7b60b777_06b83c2262.jpg"
              alt="cứu trợ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/z5018464545782_e5ffd9e30ccfdcc19ee4d44f7fd8f482_6fee25dfa3.jpg"
              alt="cứu trợ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/z5020704903337_8ac543e4e49796e16be322342721ed97_5eb99aca9d.jpg"
              alt="cứu trợ"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div>
            <p className="text-gray-700">
              Thông qua chiến dịch “CHUNG TAY CỨU TRỢ CHÓ MÈO LANG THANG”, chúng tôi mong muốn lan toả ý thức cộng đồng,
              trách nhiệm với các em chó mèo, và được góp thêm một phần nhỏ bé trong việc cung cấp nguồn lực cho các
              trạm cứu hộ, giúp duy trì và nâng cao phúc lợi của chó mèo lang thang, đồng thời, lan tỏa sự khích lệ và
              sẻ chia từ cộng đồng đến với những cá nhân, tập thể đang điều hành trạm và thực hiện công tác cứu hộ chó
              mèo. AUREUM x AAF sẽ cần rất nhiều sự chung tay của các bạn, hãy cùng chúng tôi chia sẻ yêu thương với
              những “người bạn bốn chân” nhé!
            </p>
          </div>

          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/414819659_386888933698548_1960551959307819443_n_4cdcf97d5c.jpg"
              alt="cứu trợ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPost06;

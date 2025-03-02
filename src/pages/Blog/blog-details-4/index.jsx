import { useNavigate } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */

const BlogPost04 = () => {
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
            Chương trình <span className="">"Ứng hồng Không ứng đỏ"</span> - chung tay chăm sóc trẻ em vùng cao
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
            Aureum và Trung tâm UNESCO Hợp tác Giáo dục và Văn hóa Việt Nam (UNESCO-CEP) hân hạnh thông báo về sự hợp
            tác trong chương trình mang tên <strong>“Ứng Hồng Không Ứng Đỏ”</strong>. Hành trình này được khởi tạo để
            hướng đến các mục tiêu nhân văn – nơi yêu thương được sẻ chia, điều kiện sống và học tập của trẻ em vùng cao
            được cải thiện, và những giá trị bền vững được lan tỏa qua những hành động:
          </p>

          {/* Hình ảnh */}
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/468950937_596452249408881_3928254486283077638_n_5dd4ca4dd5.jpg"
              alt="Ứng hồng Không ứng đỏ"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-6 pt-4">
            <div>
              <h3 className="font-semibold text-lg">• Chăm sóc sức khỏe làn da</h3>
              <p className="text-gray-700">
                Gió buốt lạnh mà còn khiến làn da trẻ thơ phải chịu nhiều tổn thương. Trong khuôn khổ chương trình,
                Aureum sẽ gửi tặng 5000 sản phẩm dưỡng ẩm, như một lớp áo mềm mại, bảo vệ làn da các em khỏi cái lạnh
                khắc nghiệt, để đôi má nhỏ vẫn ửng hồng rạng rỡ trong những ngày đông giá rét.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">• Hỗ trợ nhu yếu phẩm</h3>
              <p className="text-gray-700">
                Chúng tôi thực hiện trao tặng áo ấm cho toàn bộ học sinh tại điểm trường Bản Nghè (Bắc Mê - Hà Giang)
                cùng các nhu yếu phẩm khác như: gạo, đồ chơi, sách vở... những điều bé nhỏ nhưng chứa đựng yêu thương,
                như lời nhắn gửi rằng các em không cô đơn trên hành trình lớn khôn.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">• Cải tạo cơ sở vật chất</h3>
              <p className="text-gray-700">
                Tại điểm trường xã Bản Nghè, huyện Bắc Mê, tỉnh Hà Giang, chương trình sẽ cải tạo và xây dựng môi trường
                giáo dục an toàn, lành mạnh. Đó không chỉ là nơi các em có thể vui đùa, mà còn là không gian để những
                ước mơ được nuôi dưỡng và bay cao.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">• Lan tỏa giá trị nhân văn</h3>
              <p className="text-gray-700">
                Hành trình này không chỉ dừng lại ở những món quà vật chất, mà còn mang theo niềm hy vọng và những góc
                nhìn tươi sáng hơn về cuộc sống của trẻ em vùng cao. Chúng tôi tin rằng, chăm sóc sức khỏe, chăm lo giáo
                dục, sẻ chia yêu thương chính là cách để góp phần vun đắp cho một thế hệ mầm non vững vàng, đầy khát
                vọng.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <img
              src="https://phunuvietnam.mediacdn.vn/179072216278405120/2021/12/31/yola-1-16409497614121089453110.jpg"
              alt="Ứng hồng Không ứng đỏ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6 mb-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/Hinh_3_Social_Ung_Hong_0fdf61b67a.jpg"
              alt="Ứng hồng Không ứng đỏ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div>
            <p className="text-gray-700">
              Điểm đặc biệt của chương trình là sự ra đời của phiên bản giới hạn Sáp Dưỡng Ẩm Đa Năng Sen Hậu Giang. Hy
              vọng đây sẽ là chiếc cầu nối giữa những trái tim ấm áp và những giấc mơ chưa trọn vẹn của trẻ em vùng cao.
              Trên bao bì ấy, những nét vẽ ngây thơ từ dự án Em’s của UNESCO-CEP khẽ kể câu chuyện về sự sáng tạo, về
              những tâm hồn nhỏ đang khao khát một thế giới rực rỡ hơn. Chương trình dự kiến sẽ đóng góp 300 triệu đồng
              để xây dựng sân chơi cho các em học sinh tại điểm trường xã Bản Nghè, huyện Bắc Mê, tỉnh Hà Giang. Đây là
              nỗ lực chung của chúng tôi nhằm cải thiện không gian vui học cho trẻ em vùng cao, mang lại cho các em cơ
              hội phát triển cả về thể chất lẫn tinh thần.
            </p>
          </div>
          <div className="mt-6 mb-6 text-center ">
            <img
              src="https://image.cocoonvietnam.com/uploads/Promotion_Mo_ban_Sap_Duong_Am_Da_Nang_Sen_Hau_Giang_241202_Main_Post_07_2e9b3ae6d2.jpg"
              alt="Ứng hồng Không ứng đỏ"
              className="w-full rounded-lg shadow-md"
            />
            <p className="text-xs text-gray-500 italic mt-2">
              Phiên bản giới hạn của sản phẩm Sáp Dưỡng Đa Năng Sen Hậu Giang trong chương trình{" "}
              <span className="font-semibold">"Ứng Hồng Không Ứng Đỏ"</span>
            </p>
          </div>
          <div className="text-gray-800 space-y-4">
            <p>
              Đây là sản phẩm sáp dưỡng đa công dụng (hay còn gọi là sáp nẻ) với độ dưỡng ẩm rất cao, được thiết kế
              chuyên biệt cho những vùng da rất khô và nhạy cảm, cấp ẩm chuyên sâu, làm dịu tình trạng mẩn đỏ, ngứa do
              khô da. Thành phần từ nguồn sợi chiết xuất Sen Hậu Giang tinh khiết kết hợp các hoạt chất dưỡng chuyên sâu
              gồm Madecassoside, Vitamin B5, B12, dầu dưỡng chất phân tử Passionline và Soline. Sáp Dưỡng Đa Năng Sen
              Hậu Giang là giải pháp cấp bách cho tình trạng khô ráp trên nhiều vùng da dễ mất bảo hàng gặp phải nhất:
              môi, khuỷu tay, đầu gối, gót chân… Phù hợp với mọi loại da, kể cả em bé từ 6 tháng tuổi và phụ nữ mang
              thai.
            </p>

            <h3 className="font-semibold">• Dịu nhẹ, an toàn và lành tính:</h3>
            <p>
              Sản phẩm với công thức nghiên cứu bởi chuyên gia da liễu, không chứa cồn, hương liệu, không dầu khoáng hay
              paraben, phù hợp với mọi loại da, đặc biệt là da nhạy cảm, phù hợp với trẻ em từ 6 tháng tuổi và phụ nữ
              mang thai.
            </p>

            <h3 className="font-semibold">• Dưỡng ẩm chuyên sâu và phục hồi da:</h3>
            <p>
              Với sự kết hợp của Madecassoside và Vitamin B5, sản phẩm hỗ trợ làm dịu nhanh các vết mẩn đỏ, da khô ráp
              hoặc nứt nẻ do thời tiết. Bên cạnh đó, dầu tự nhiên từ Soline giúp khóa ẩm và tăng hàng rào bảo vệ tự
              nhiên của da.
            </p>

            <h3 className="font-semibold">• Đa năng và tiện lợi:</h3>
            <p>
              Có thể dùng cho mọi vùng da trên cơ thể, từ mặt, môi, đầu gối, khuỷu tay, gót chân, bàn chân… đến các vết
              thương da bị khô, nứt nẻ hoặc tróc.
            </p>

            <h3 className="font-semibold">• Hướng dẫn sử dụng:</h3>
            <p>
              Dưỡng ẩm chuyên sâu, cấp bách khi thời tiết hanh khô, làm dịu da trong môi trường máy lạnh, phục hồi da
              sau khi tiếp xúc ánh nắng hoặc sau tổn thương da nhẹ.
            </p>

            <hr className="border-gray-300 my-4" />

            <p className="text-gray-700">
              Thoa lên mặt, môi, cơ thể hoặc các vùng da khô, thô ráp, nứt nẻ, dễ bị nhạy cảm, kích ứng và mẩn đỏ. Dùng
              được cho trẻ em từ 6 tháng tuổi.
            </p>
          </div>
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/z6088896503577_93f0b27cf89abedd9f5d8e89a48b5e5e_dc01f0f176.jpg"
              alt="Ứng hồng Không ứng đỏ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6">
            <p className="text-gray-700">
              Aureum x UNESCO-CEP và dự án Em's sẽ cần rất nhiều sự sẻ chia của các bạn để chương trình
              <i className="text-gray-500">"Ứng Hồng Không Ứng Đỏ"</i> lan tỏa rộng rãi đến với mọi người. Hãy chung tay
              cùng chúng tôi vì một tương lai tốt đẹp hơn cho trẻ em vùng cao nói riêng và trẻ em Việt Nam nói chung.
            </p>
          </div>
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/z6088896511583_2ed524525e611a90ef11690edf3db603_071fa46032.jpg"
              alt="Ứng hồng Không ứng đỏ"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPost04;

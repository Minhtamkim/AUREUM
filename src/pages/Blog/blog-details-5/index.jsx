import { useNavigate } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const BlogPost05 = () => {
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
      title: "AUREUM x Suboi: 'Queen' Chất – 'luôn có một nữ hoàng hiện diện trong bản thân bạn'",
      description: "Aureum tin rằng, dù bạn là ai, bạn đến từ đâu...",
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
            Chương trình <span className="">"Cùng AUREUM Sống Xanh Mỗi Ngày"</span> - năm 2024
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
            Chương trình Thu Hồi Vỏ Chai Cũ được AUREUM khởi xướng từ tháng 4/2021 đã thu hút được sự tham gia nhiệt
            tình từ khách hàng, đặc biệt qua hình thức online. Đây không chỉ là nỗ lực của AUREUM trong việc giảm thiểu
            rác thải nhựa mà còn là lời cam kết mạnh mẽ hướng đến một môi trường bền vững. Để tăng cường tính thuận tiện
            cho khách hàng và mở rộng quy mô chương trình, AUREUM đã quyết định đưa hoạt động này đến gần hơn với mọi
            người.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Với 115 điểm thu hồi (ĐIỂM XANH) được triển khai tại 25 tỉnh thành trên khắp Việt Nam, khách hàng giờ đây có
            thể dễ dàng tham gia vào việc thu hồi vỏ chai cũ tại các "ĐIỂM XANH", mang đến trải nghiệm trực tiếp và gần
            gũi hơn. Đây là bước tiến mới giúp lan tỏa tinh thần bảo vệ môi trường, đồng thời giúp AUREUM và khách hàng
            cùng chung tay tạo ra những thay đổi tích cực.
          </p>

          {/* Hình ảnh */}
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/CSR_Ra_mat_thu_doi_vo_chai_cu_2024_240909_Main_Post_7476f5e874.jpg"
              alt="ĐIỂM XANH"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-6 pt-4">
            <div>
              <h3 className="font-semibold text-lg">QUY ĐỊNH QUY ĐỔI:</h3>
              <p className="text-gray-700">
                5 VỎ CHAI, HŨ, TUÝP, TÚI REFILL (full size) từ AUREUM đổi lấy 1 TÚI VẢI THỰC HÀNH SỐNG XANH trị giá
                185.000đ
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">• LƯU Ý:</h3>
              <p className="text-gray-700">
                Chúng tôi thu hồi tất cả vỏ chai, hũ, tuýp, túi refill từ AUREUM, tuy nhiên QUÀ TẶNG TÚI VẢI KHÔNG ÁP
                DỤNG với vỏ các sản phẩm mini size và dạng thỏi, cụ thể: • Các loại Gel/sữa rửa mặt/ nước tẩy
                trang/toner dung tích 50ml • Các loại tinh chất dung tích 5ml • Sữa chống nắng bí đao 5ml • Son dưỡng
                dầu dừa Bến Tre 5g • Cà phê Đắk Lắk làm sạch da chết môi 5g
              </p>
            </div>
          </div>
          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/CSR_Ra_mat_thu_doi_vo_chai_cu_2024_240909_Hinh_con_1_17c85a62de.jpg"
              alt="ĐIỂM XANH"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div>
            <p className="text-gray-700">
              <h3 className="font-semibold text-lg">Tham gia ngay:</h3>• Bước 1: Chuẩn bị vỏ chai cũ của Cocoon đã được
              vệ sinh sạch sẽ • Bước 2: Mang tối thiểu 5 vỏ chai cũ đến điểm thu hồi gần bạn nhất • Bước 3: Làm theo
              hướng dẫn của nhân viên tại Điểm Xanh và nhận quà tặng Lưu ý: • Chương trình thu hồi tất cả vỏ chai Cocoon
              nhưng không áp dụng quy đổi quà tặng đối với các loại vỏ mini size, vỏ son/ vỏ tẩy da chết môi. • Vỏ
              chai/hũ cũ phải được vệ sinh sạch sẽ • Sản phẩm quà tặng không có giá trị quy đổi thành tiền mặt
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <h3 className="font-semibold text-lg">Lưu ý:</h3> • Chương trình thu hồi tất cả vỏ chai Cocoon nhưng không
              áp dụng quy đổi quà tặng đối với các loại vỏ mini size, vỏ son/ vỏ tẩy da chết môi. • Vỏ chai/hũ cũ phải
              được vệ sinh sạch sẽ • Sản phẩm quà tặng không có giá trị quy đổi thành tiền mặt
            </p>
          </div>

          <div className="mt-6">
            <img
              src="https://image.cocoonvietnam.com/uploads/CSR_Ra_mat_thu_doi_vo_chai_cu_2024_240909_Hinh_con_3_dcf868ecee.jpg"
              alt="ĐIỂM XANH"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6">
            <p className="text-gray-700">
              Hãy cùng AUREUM chung tay thu gom những vỏ chai nhựa cũ, để mỗi hành động nhỏ đều trở thành một bước tiến
              trong hành trình bảo vệ môi trường. Khi bạn tham gia chương trình, không chỉ là bạn đang đóng góp vào việc
              giảm thiểu rác thải nhựa, mà còn cùng AUREUM lan tỏa tinh thần sống xanh mỗi ngày. Hãy bắt đầu từ hôm nay,
              cùng nhau tạo nên những thay đổi tích cực cho Trái Đất.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPost05;

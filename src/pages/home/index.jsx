/* eslint-disable react/no-unescaped-entities */
// import Swiper JS
// import Swiper styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";

import api from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Dùng để điều hướng
  const [isLoaded, setIsLoaded] = useState(false);

  AOS.init();

  useEffect(() => {
    const preloadImages = async () => {
      const imgList = [
        "/images/Slide1.jpg",
        "/images/Slide2.jpg",
        "/images/Slide3.jpg",
        "/images/Slide4.jpg",
        "/images/Slide5.jpg",
      ];

      const promises = imgList.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      });

      await Promise.all(promises);
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("product");
      setProducts(response.data);
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Tự động lướt qua
    autoplaySpeed: 2000, // Thời gian hiển thị mỗi ảnh (3s)
    cssEase: "ease-in-out",
    centerMode: false,
    centerPadding: "50px",
    fade: true, // Làm mờ ảnh khi chuyển đổi
    pauseOnHover: false, // Không dừng khi hover
  };

  return (
    <>
      <div className="body_content bg-[#FAF0E8] py-5">
        <div className="flex items-center justify-center 	">
          {isLoaded ? (
            <Slider className="overflow-hidden max-w-[1200px]" {...settings}>
              <div>
                <img src="/images/Slide1.jpg" alt="Slide 1" />
              </div>
              <div>
                <img src="/images/Slide2.jpg" alt="Slide 2" />
              </div>
              <div>
                <img src="/images/Slide3.jpg" alt="Slide 3" />
              </div>
              <div>
                <img src="/images/Slide4.jpg" alt="Slide 4" />
              </div>
              <div>
                <img src="/images/Slide5.jpg" alt="Slide 5" />
              </div>
            </Slider>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="bg-[#FAF0E8] h-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <hr className="border-t border-gray-400" />
        </div>
      </div>
      <div className="max-w-full w-screen h-screen flex flex-col items-center justify-center bg-[#FAF0E8] text-center">
        <div className="middle_carousel flex justify-center">
          <motion.div
            className="flex gap-30 items-center text-center"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: [0, -5, 5, 0],
              y: [0, 3, -3, 0],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {/* Ảnh có hiệu ứng phóng to & fade in */}
            <motion.img
              src="https://image.cocoonvietnam.com/uploads/srm_3efa789217.png"
              alt="Sản phẩm"
              className="w-[300px] h-auto mb-6"
              variants={{
                hidden: { scale: 1.2, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 1, ease: "easeOut" },
                },
              }}
            />
            <motion.div
              className="flex flex-col justify-center text-center ml-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 ">Sản phẩm mới</h2>
              <h1 className="text-3xl font-bold text-gray-800 mb-20">Sữa rửa mặt Sen Hậu Giang</h1>
              <p className="text-lg text-gray-600 mt-2 max-w-md">
                Với công trình nghiên cứu kỹ lưỡng, kết hợp sự hiểu biết về cấu trúc sinh học của da và sự kiểm nghiệm
                khắt khe qua bài test HRIPT trên 61 lần da nhạy cảm, Cocoon tự hào giới thiệu đột phá mới.
              </p>
              <a
                href="/product-content"
                className="mt-20 px-6 py-3 bg-[#2d2d2b] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Xem Ngay
              </a>
              <ion-icon name="circle"></ion-icon>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="bg-[#d4ccc5] border-1 border-gray-300 w-full py-4 overflow-hidden">
        <motion.div
          className="tracking-widest whitespace-nowrap text-4xl font-bold text-[#1f1c17]"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          MỸ PHẨM 100% TỰ NHIÊN CHO NÉT ĐẸP THUẦN VIỆT
        </motion.div>
      </div>

      <div className="bg-[#FAF0E8] py-10 ">
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <div className="max-w-6xl mx-auto px-4">
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold text-black mb-2">KHÁM PHÁ</h2>
            <h3 className="text-2xl font-extrabold text-black">CÁC SẢN PHẨM NỔI BẬT</h3>

            {/* Grid chứa 4 sản phẩm */}

            {/* Sản phẩm 1 */}
            <div className="grid grid-cols-4 gap-6 mt-6">
              {products.slice(0, 4).map(
                (
                  product,
                  index //map 4 items dau tien
                ) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 text-center
                hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                    onClick={() => navigate(`/products/details/${product.id}`)} // Điều hướng khi bấm vào sản phẩm
                  >
                    <div className={`p-2 flex items-center justify-center brightness-100 }`}>
                      <img src={product.image} alt={product.title} className="h-70" />
                    </div>
                    <p className="font-semibold items-center justify-center mt-2 min-h-[52px]">{product.name}</p>
                    <p className="text-sm font-bold whitespace-pre-line mt-1">
                      {`${product.price.toLocaleString("vi-VN")}`}VND
                    </p>
                  </div>
                )
              )}
            </div>

            {/* dan san pham */}
          </div>
        </div>
      </div>
      <section className="bg-[#FAF0E8] py-10 pt-50">
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <div className="container mx-auto px-4">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-5xl font-semibold italic text-[#835229] pb-4">Bài viết mới nhất</h2>
              <button
                onClick={() => navigate("/blogs/tat-ca-bai-viet")}
                className="bg-[#835229]  rounded-md px-5 py-2  flex items-center  text-white transition
              hover:shadow-lg hover:scale-105  duration-300 ease-in-out cursor-pointer
              "
                style={{ borderColor: "#835229" }}
              >
                TẤT CẢ BÀI VIẾT <span className="ml-2">→</span>
              </button>
            </div>

            {/* Danh sách bài viết */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Bài viết 1 */}
              <Link to="/blogs/chuong-trinh-ung-hong-khong-cu-do-chung-tay-cham-soc-tre-em-vung-cao">
                <div
                  className="bg-white h-full rounded-lg overflow-hidden shadow-md
            hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                >
                  <img
                    src="https://image.cocoonvietnam.com/uploads/Hinh_1_Social_Ung_Hong_29d3981238.jpg"
                    alt="Bài viết 1"
                    className="w-full"
                  />
                  <div className="p-4">
                    <p className="text-gray-500 text-sm">Cocoon | 01.01.70</p>
                    <h3 className="text-lg font-semibold mt-2">
                      Chương trình "Ứng hồng Không ứng đỏ" - chung tay chăm sóc trẻ em vùng cao
                    </h3>
                    <p className="text-gray-700 mt-2">
                      Chương trình "Ứng Hồng Không Ứng Đỏ" được Cocoon và UNESCO-CEP triển khai nhằm hướng đến...
                    </p>
                  </div>
                </div>
              </Link>

              {/* Bài viết 2 */}
              <Link to="/blogs/chuong-trinh-cung-aureum-song-xanh-moi-ngay">
                <div
                  className="bg-white h-full rounded-lg overflow-hidden shadow-md
            hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                >
                  <img
                    src="https://image.cocoonvietnam.com/uploads/CSR_Ra_mat_thu_doi_vo_chai_cu_2024_240909_Hinh_con_2_fe4cd256d2.jpg"
                    alt="Bài viết 2"
                    className="w-full"
                  />
                  <div className="p-4">
                    <p className="text-gray-500 text-sm">Cocoon | 01.09.24</p>
                    <h3 className="text-lg font-semibold mt-2">
                      Chương trình "Cùng Cocoon Sống Xanh Mỗi Ngày" năm 2024
                    </h3>
                    <p className="text-gray-700 mt-2">
                      Từ tháng 9/2024, Cocoon mang lại 115 điểm thu hồi vỏ chai trực tiếp, giúp khách hàng dễ dàng tham
                      gia...
                    </p>
                  </div>
                </div>
              </Link>

              {/* Bài viết 3 */}
              <Link to="/blogs/chung-tay-cuu-tro-cho-meo-lang-thang">
                <div
                  className="bg-white h-full rounded-lg overflow-hidden shadow-md
            hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                >
                  <img
                    src="https://image.cocoonvietnam.com/uploads/z5289500671503_2bb0e27d20058692600c5890aa8bbff2_9fbba4729a.jpg"
                    alt="Bài viết 3"
                    className="h-120"
                  />

                  <div className="p-4">
                    <p className="text-gray-500 text-sm">Cocoon | 15.05.24</p>
                    <h3 className="text-lg font-semibold mt-2">
                      Cocoon x Guardian Vietnam: ra mắt 20 trạm refill tại TP.HCM
                    </h3>
                    <p className="text-gray-700 mt-2">
                      Trạm Refill giúp giảm tải số lượng vỏ chai nhựa cũ thải ra ngoài môi trường...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

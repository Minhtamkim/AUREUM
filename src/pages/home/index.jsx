/* eslint-disable react/no-unescaped-entities */
// import Swiper JS
// import Swiper styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

function Home() {
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
          <Slider className="overflow-hidden max-w-[1200px]  " {...settings}>
            <div>
              <img src="https://template.canva.com/EAGSe-jkm2o/1/0/1600w-MyX8gsmbwVA.jpg" alt="Slide 1" />
            </div>
            <div>
              <img src="https://template.canva.com/EAGSe-jkm2o/1/2/1600w-TPAlZ_aih2c.jpg" alt="Slide 2" />
            </div>
            <div>
              <img src="https://template.canva.com/EAGSe-jkm2o/1/5/1600w-cIpDDJpgc_U.jpg" alt="Slide 3" />
            </div>
            <div>
              <img src="https://template.canva.com/EAGSe-jkm2o/1/6/1600w-lHmU2V9LHCY.jpg" alt="Slide 3" />
            </div>
            <div>
              <img src="https://template.canva.com/EAGSe-jkm2o/1/4/1600w-qBUXtF5gU6A.jpg" alt="Slide 3" />
            </div>
            <div>
              <img src="https://template.canva.com/EAGSe-jkm2o/1/3/1600w-EvEyLCp3dzw.jpg" alt="Slide 3" />
            </div>
          </Slider>
        </div>
      </div>
      <div className="bg-[#FAF0E8] h-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <hr className="border-t border-gray-400" />
        </div>
      </div>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#FAF0E8] px-6 text-center">
        <div className="middle_carousel flex justify-center">
          <motion.div
            className="flex gap-30 items-center text-center"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: [0, -5, 5, 0], y: [0, 3, -3, 0] }}
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
                visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
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
                href="/register"
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
          className=" whitespace-nowrap text-4xl font-bold text-[#1f1c17]"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          MỸ PHẨM 100% THUẦN CHAY CHO NÉT ĐẸP THUẦN VIỆT
        </motion.div>
      </div>

      <div className="bg-[#FAF0E8] py-10 ">
        <div className="max-w-6xl mx-auto px-4">
          {/* Tiêu đề */}
          <h2 className="text-xl font-bold text-black mb-2">KHÁM PHÁ</h2>
          <h3 className="text-2xl font-extrabold text-black">CÁC SẢN PHẨM NỔI BẬT</h3>

          {/* Grid chứa 4 sản phẩm */}
          <div className="grid grid-cols-4 gap-6 mt-6">
            {/* Sản phẩm 1 */}
            <div
              className="bg-white rounded-2xl p-4 shadow-md  
                          hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/93a8/7c53/fa70380547b4f9d1b13389b85cc09fad?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=puIi9EefDTgZFtHUec4V-Cm3d5fGMFKbrt4LaAt-Rxdo9cKIj~DX0iyl-SxEQyGww0LDRwLZp0kLIinPbwQNsC7NsFrOwLQNdRRKZMTenDZ62xnaRE1w3UsoyDI707zcpsfIiLfTCye1igT3o0fqCusytQXYHpsygsACVH1fOwGsqoosfYh~qOpMDTVw39DrOeyWUSV0rjEET-yhLW690l38MH1Wrf1hwtn1JPRY3OFK0GfBRRR7GtZh1znP8B-JkH7JbZDUzejKtnOwgo2spSI0yaYHwoK5G7lBIYhmLnIowlgsQFKDMkGteU8lfj1Wz3BNsSAbxvQpvMSCGztngQ__"
                alt="Product 1"
                className="w-auto  h-62 object-contain"
              />
              <p className="text-center font-bold mt-2">Ngăn ngừa mụn</p>
              <p className="text-center text-sm text-gray-500">
                Tái phát trong <span className="font-semibold">3 tháng</span>
              </p>
            </div>

            {/* Sản phẩm 2 */}
            <div className="bg-white rounded-2xl p-4 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer ">
              <img
                src="https://s3-alpha-sig.figma.com/img/9b97/af5f/769f3a2d7cd3348a5ceb0ed6fc8b3d6f?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pyZfP2TvWJYrVfi2fiK81i9LgxH5XiO807PCVn~lkhtWa-oNiCoGIfbkQG6uNTijW4LJGWVkF89hUiTg1Wi93qw3-f83ueQNOi7YgI9LIqbAzRhuZjif0Xd6y6~CIxHLk3ZQY7RESXx~zUUjZ8vb8OuNI5xrNRsALQ5F3ylrdGghiuG6bf6-pT4gsZBHoiXIz9Mz5SYtALC72rAogShfVIhOqJdHYx7yTnwytak14UwOTYicowbELZof25fuyQzxfKQF~cZD1hdgkGdDzo4Kew~cy3lF9UgJC5NQCkBzJ~y0sAKT3iqdMl8BjMExvV09JF9LvUUO6JJu4rKvvijhDQ__"
                alt="Product 2"
                className=" w-auto h-62 object-contain"
              />
              <p className="text-center font-bold mt-2">Giúp làm sạch</p>
              <p className="text-center text-sm text-gray-500">
                Bụi bẩn, bã nhờn. Dành cho <span className="font-semibold">da dầu, da mụn</span>
              </p>
            </div>

            {/* Sản phẩm 3 */}
            <div className="bg-white rounded-2xl p-4 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
              <img
                src="https://s3-alpha-sig.figma.com/img/f05a/aff2/b093789af76acb85bd6129e20aabd4ca?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=q35yPZK0oLJ2ovXiho8remOz7aSvP5rafUAmQm94f5A2g5Go1Hgkcb20BXx4QGlz6CTzpO3ndw1d9uO13PTfUM3GPPO8v2aPZVVyIV4Gac2eOpLVWb8SnyRk0o~~20K44tFlw8SC7qHRT4ZzaxzUKfIgUn0Uw2x3IdTrsr8u6MUdXoKP3jEW1I43rolDi4NPjbVFVoa5TVeeh4C59kCPphpLyzsQP9K5JQb5IYS0fq4qSLXFzKBBOQRsMxmqPWcv9Wb6BG9kzl-~g~wykW95gSdoYrN-TnsVtUCD4eOiBMUJm-s3MgkKo2kRENZalUaOOcDubTDtUpBJOaLbWvvveA__"
                alt="Product 3"
                className="w-auto h-62 object-contain"
              />
              <p className="text-center font-bold mt-2">Kiểm dầu tới 12 giờ</p>
              <p className="text-center text-sm text-gray-500">
                Ngăn ngừa <span className="font-semibold">thâm nám</span>
              </p>
            </div>

            {/* Sản phẩm 4 */}
            <div className="bg-white rounded-2xl p-4 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer ">
              <img
                src="https://s3-alpha-sig.figma.com/img/c53a/06ad/769f5cdf5b8bbdd04c28ee48231d4c60?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YV8tPYW-b2FV2reSo8MnsSAIExXNTa00UqwjNbPJ5LhBuacV-EPm9niE0o0jjUeCBfYEwCzeRVgqwD8dfvTYhA19cdtvHVQG7RJie4QBKSkkIfq3vJB24hgjD-4OvaZJwzbFqiA91EOKWijb~bCNW7brVIzixLe8b82o4XnghsbfnytU2VQxh9ZlTFRcaL~Scp-uSogDrZmNI7bjg4q~kTJ5FwlvIQAUGNecUfZXognV7o~~SBoe2vupXl4c38~RWq~EcVkVKZBpq20d3sT04EPfU4W5e6B1m2szPvs0iHKBbZbu6-0a~hBvBF7byFzIUL26rwYs~4YO2eKDGn6FJA__"
                alt="Product 4"
                className="w-auto h-62 object-contain"
              />
              <p className="text-center font-bold mt-2">Nước tẩy trang</p>
              <p className="text-center text-sm text-gray-500">
                Dành cho <span className="font-bold">da dầu, da dễ bị mụn</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-[#FAF0E8] py-10 pt-50">
        <div className="container mx-auto px-4">
          {/* Tiêu đề */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-5xl font-semibold italic text-[#835229] pb-4">Bài viết mới nhất</h2>
            <button
              className="bg-[#835229]  rounded-md px-5 py-2  flex items-center  text-white transition
              hover:shadow-lg hover:scale-105  duration-300 ease-in-out cursor-pointer
              "
              style={{ borderColor: "#835229" }}
            >
              TẤT CẢ BÀI VIẾT <span className="ml-2">→</span>
            </button>
          </div>

          {/* Danh sách bài viết */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Bài viết 1 */}
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md
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

            {/* Bài viết 2 */}
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md
            hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="https://image.cocoonvietnam.com/uploads/CSR_Ra_mat_thu_doi_vo_chai_cu_2024_240909_Hinh_con_2_fe4cd256d2.jpg"
                alt="Bài viết 2"
                className="w-full"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm">Cocoon | 01.09.24</p>
                <h3 className="text-lg font-semibold mt-2">Chương trình "Cùng Cocoon Sống Xanh Mỗi Ngày" năm 2024</h3>
                <p className="text-gray-700 mt-2">
                  Từ tháng 9/2024, Cocoon mang lại 115 điểm thu hồi vỏ chai trực tiếp, giúp khách hàng dễ dàng tham
                  gia...
                </p>
              </div>
            </div>

            {/* Bài viết 3 */}
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md
            hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="https://image.cocoonvietnam.com/uploads/z5289500671503_2bb0e27d20058692600c5890aa8bbff2_9fbba4729a.jpg"
                alt="Bài viết 3"
                className=""
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
          </div>
        </div>
      </section>

      <div className="pt-30 bg-[#FAF0E8] py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-4 gap-6 text-center">
          {/* Item 1 */}
          <div className="flex flex-col items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/8507/bf65/c158c54d14fdbb95ac9580888855824d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Q-Xc9Az~mTKbmZXORxrjfNb2K0CTbopPlAbj2QRVRH8idt9LsbePTRFGe40BGqLHqBF4sA-ZHy5nZkMvSQPVnlD2M1ImeFHb5UG5d3GUmCTTUMXmG7c7m7FJWzUBD8XmMF8iVJoSN5gAlBq-7URjwOo2SPYIpR6OdsCWJeOD5uhKvfV4Fgn50N7idoXoycT8YgNMjQava9~V9ISGXaIh-34YYbUXOBD2Ci1QcKCugaP7wWXQgfpm8ZAORo9zNlamesYjCg1WZ11zLyyovw5LMDYrG~vA0iP6QWC~oYXnMekjxnuomRhK9IFpHgxrXqSKn1w2CkBK5pu9W~tCNzHpuA__"
              alt="Thanh toán khi nhận hàng"
              className="w-20 h-20 filter sepia brightness-50"
            />
            <p className="text-gray-700 mt-2 font-medium">Thanh toán khi nhận hàng</p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/7996/55be/dc533c996f4272d3d1821341de210fad?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=P-4dRYaxPFgl3rI9OOAW~U3OIkQOguETfVCI2x6qRHidipXe0-hEKYngC5lnAEdWAiLzf2HCPh7XIw4nQnvccV2X~32GYG9y~58K7K0CT~0aFHLYEeWtsbn1FXUwd~50bx2IC6yuZjhdZzwwM3LiK5MjqG-QW-k9Z3-MeYbcyuBw8ClaObuO6o3x-YkpXCEXndc~yr2fXTiLPmA6T6P7UDb0eIk8u3cuCHF8ScZTuWsvszWzyhri0MA5AjHBFsXnhTVlob8dwaDvEhvf1wB7-0BnesKdsbRZ4069Ra5xztpC4dqEPrt2sbx-QqNZJ9e3AILzXfUHhtAb1HjDlXxibQ__"
              alt="Giao nhanh miễn phí 2h"
              className="w-25 h-20 filter sepia brightness-50"
            />
            <p className="text-gray-700 mt-2 font-medium">Giao nhanh miễn phí 2h</p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/84fc/273f/29b36a9a015b2a100c8cde15176fd886?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s8RdX1t9aBN40fMASvpJmDnufOB89qtGDivesmV-WP9rz903jl~jMOqZX-6jMYkNTSIlRC9tMbFUk6HxRUJ0iOtZf3oRsfmqyAF6rk4dSP4vxmG-pEaoL1Sgc4-EL8zJ2ND3LXAEsHcUgkSqyEqoKZ2pfhWTBBqYrIQ9GTWJe~wsRS1N9IXnawpr0glBpUBIXanZsJ~ml6aMGJM5kDwq6UtrOc3G~crk4E16T2X6kqYEyjBgv3Z7kKDAximhGboP~MHO33gwjBZbp2p93CeFdHWH8C9ZNpW9EMS80JeNqyg1ZdsmcNwDrpzKa~JEP9z4JrqoEi1x4L0jKDcKT5Cfow__"
              alt="30 ngày đổi trả miễn phí"
              className="w-20 h-20 filter sepia brightness-50"
            />
            <p className="text-gray-700 mt-2 font-medium">30 ngày đổi trả miễn phí</p>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/4b39/3011/b8e77f233c2b8f5f6ed86fd387e7d092?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gfWmxUqMY2~mZHaYiaTShrE3Q7t3ikCTtPUWEINxAQ95PNMoWoQP1A6o7ilDKsoaPNbSvKJBNoEqEnDtS0Q9bnri39VJx7upZkgimHxeMOEw0~x~L86Z0TREJ6EBWN83oU8zdQjXHgocv4jYfo1pRHCv6sXE2pSWCKGaaoJIvgvsiyII4O6VI21TzIDqrIX9m1EmVL8Smm9fnNu~Mmt95DmgLXgcU~O5sE75zXA7tELCxw60zB8RdnIRXk6ZGqJfxoC42FTHA2vb8g0OgO2aoGa7wWqZE8DE1Xn4-BgudApsWLhYTA5Mq5oB6MsQuz~8iqLPR~zSXLXdm0LKJLMeAQ__"
              alt="Thương hiệu uy tín toàn cầu"
              className="w-20 h-20 filter sepia brightness-50"
            />
            <p className="text-gray-700 mt-2 font-medium">Thương hiệu uy tín toàn cầu</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

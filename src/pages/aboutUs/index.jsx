import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="font-sans">
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a"
            alt="Luxurious skincare products"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-neutral-900/40"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <img
              src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6"
              alt="Aureum Logo"
              className="w-32 h-32 mx-auto mb-8 rounded-full"
              loading="lazy"
            />
            <h1 className="text-5xl md:text-7xl font-light mb-6">
              AUREUM Skincare
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#F5E6D3]">
        <div className="max-w-8xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://product.hstatic.net/200000123775/product/huong_dan_su_dung_serum_vivant_skincare_derm-a-gel_fd55e71d345d454fb30d53546efd1fa9_1024x1024.jpg"
                alt="Natural ingredients"
                className="rounded-lg shadow-xl"
                loading="lazy"
              />
            </div>
            <div className="space-y-6 ">
              <p className="text-4xl font-sans leading-relaxed">
                <strong>Đội ngũ Bác sĩ Chuyên khoa Da Liễu</strong> cùng các
                Chuyên viên tư vấn dày dặn kinh nghiệm thực nhiều năm kinh
                nghiệm tư vấn, thiết lập phác đồ điều trị và chăm sóc da{" "}
                <strong>tại nhà</strong> và kết hợp liệu trình thẩm mỹ tại phòng
                khám.{" "}
              </p>
              <p className="text-4xl font-medium pt-10">
                <strong>Điều trị da với phác đồ điều trị kết hợp</strong> đa
                phương thức.
              </p>
              <p className="text-4xl">
                <MdOutlineKeyboardDoubleArrowDown />
              </p>
              <p className="text-4xl font-medium ">
                Tối ưu hóa hiệu quả điều trị đồng thời giảm thiểu các tác dụng
                không muốn của từng phương pháp đơn trị liệu
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#F5E6D3]">
        <div className="max-w-8xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 ">
              <p className="text-5xl font-sans leading-relaxed">
                <strong>Lý do</strong> bạn nên tin chọn sản phẩm để điều trị da
                tại Aureum
              </p>
              <p className="text-4xl font-medium pt-10 leading-relaxed">
                <strong>
                  Phân phối chính hãng Dược mỹ phẩm từ các thương hiệu uy tín,
                </strong>{" "}
                có bằng chứng khoa học và chứng minh hiệu quả lâm sàng khi sử
                dụng trên da đa phương thức.
              </p>
              <p className="text-4xl">
                <MdOutlineKeyboardDoubleArrowDown />
              </p>
              <p className="text-4xl font-medium leading-relaxed">
                Tư vấn, thiết lập phác đồ điều trị da cá nhân hóa đảm bảo an
                toàn, hợp lý và hiệu quả khi sử dụng
              </p>
            </div>
            <div>
              <img
                src="http://peopleasia.ph/wp-content/uploads/2019/05/Kiehls_Photo_06_Family.jpg"
                alt="Natural ingredients"
                className="rounded-lg shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#F5E6D3]">
        <div>
          <img
            src="https://file.hstatic.net/1000231140/file/aboutus-5_5a41d16fa9ae400da1c2e92e9b93b6ee.jpg"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

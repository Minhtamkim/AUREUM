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

      <section className="py-16 px-6 bg-[#F5E6D3]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://product.hstatic.net/200000123775/product/huong_dan_su_dung_serum_vivant_skincare_derm-a-gel_fd55e71d345d454fb30d53546efd1fa9_1024x1024.jpg"
                alt="Skincare Treatment"
                className="rounded-lg shadow-md w-full max-w-md mx-auto"
                loading="lazy"
              />
            </div>
            <div className="space-y-6 leading-relaxed text-[#2C2C2C]">
              <p className="text-[24px]">
                <strong className="text-4xl font-semibold italic mt-2 leading-snug">
                  Đội ngũ Bác sĩ Da Liễu
                </strong>{" "}
                cùng chuyên viên tư vấn với nhiều năm kinh nghiệm trong việc
                thiết lập phác đồ điều trị và chăm sóc da{" "}
                <strong className="font-medium">tại nhà</strong>, kết hợp với
                liệu trình chuyên sâu tại phòng khám.
              </p>
              <p className="text-[26px] font-semibold text-[#1A1A1A]">
                Điều trị da <br /> với phác đồ kết hợp đa phương thức.
              </p>
              <p className="text-[#AFAFAF]">
                <MdOutlineKeyboardDoubleArrowDown className="text-2xl" />
              </p>
              <p className="text-[22px] text-[#444]">
                Tối ưu hiệu quả điều trị, đồng thời giảm thiểu tác dụng không
                mong muốn của từng phương pháp đơn trị liệu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F5E6D3]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 leading-relaxed text-[#2C2C2C]">
              <p className="text-4xl font-semibold italic mt-2 leading-snug">
                <strong>Vì sao bạn nên lựa chọn AUREUM?</strong>
              </p>
              <p className="text-[24px] text-[#444]">
                Phân phối chính hãng dược mỹ phẩm từ các{" "}
                <strong>thương hiệu uy tín,</strong> với bằng chứng khoa học và
                nghiên cứu lâm sàng chứng minh hiệu quả trên da.
              </p>
              <p className="text-[#AFAFAF]">
                <MdOutlineKeyboardDoubleArrowDown className="text-2xl" />
              </p>
              <p className="text-[20px] text-[#444]">
                Đội ngũ chuyên gia tư vấn và thiết lập phác đồ{" "}
                <strong>cá nhân hóa</strong>, đảm bảo an toàn và tối ưu hiệu quả
                điều trị.
              </p>
            </div>
            <div>
              <img
                src="http://peopleasia.ph/wp-content/uploads/2019/05/Kiehls_Photo_06_Family.jpg"
                alt="Skincare Products"
                className="rounded-lg shadow-md w-full max-w-md mx-auto"
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

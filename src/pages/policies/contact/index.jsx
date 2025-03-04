import Sidebar from "..";

function ContactPage() {
  return (
    <div>
      <div className="bg-[#f8f6f3] min-h-screen py-10 px-10">
        <div className="  w-full flex ">
          <Sidebar />

          <div className="w-full pl-20  gap-x-4 ">
            <nav className="text-lg text-gray-600 mb-4">
              <span className="text-gray-500">
                {" "}
                <a href="/" className="text-xl">
                  Trang chủ
                </a>{" "}
                &gt;{" "}
              </span>
              <span className="font-semibold">Liên Hệ</span>
            </nav>

            <h2 className="text-2xl font-bold mb-3">Liên hệ chúng tôi</h2>
            <hr className="my-4 border-black -300" />

            <div className=" flex justify-between">
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong> Email:</strong> support@aureum.com
              </p>
              <p className="text-gray-700 leading-relaxed mb-3 pr-100">
                <strong> Hotline:</strong> 02835359973
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

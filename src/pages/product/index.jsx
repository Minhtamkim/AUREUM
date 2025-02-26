import { useEffect, useState } from "react";
// import api from "../../config/axios";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get("product"); // Lấy toàn bộ danh sách sản phẩm
  //       console.log("Dữ liệu API:", response.data); // Kiểm tra dữ liệu trả về
  //       // Lọc sản phẩm có code là "PD001"
  //       const selectedProduct = response.data.find((p) => p.code === "PD001");
  //       setProduct(selectedProduct); // Cập nhật state với sản phẩm tìm được
  //     } catch (error) {
  //       console.error("Lỗi khi gọi API:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // if (!product) return <p className="text-center">Đang tải...</p>;
  // return (
  //   <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#fdf8f3] rounded-lg shadow-lg">
  //     {/* Hình ảnh sản phẩm */}
  //     <div className="flex flex-col items-center">
  //       <img src={product.image} alt={product.name} className="rounded-lg shadow-md w-full object-cover" />
  //     </div>
  //     {/* Thông tin sản phẩm */}
  //     <div className="p-4">
  //       <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
  //       <p className="text-lg text-gray-500">{product.brand}</p>
  //       <p className="text-2xl font-semibold text-red-500 mt-2">{product.price}.000 đ</p>
  //       <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
  //       {/* Icons mô tả */}
  //       <div className="flex flex-wrap gap-3 mt-5 text-sm text-gray-700">
  //         <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">✅ Không chứa cồn</span>
  //         <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">✅ Không sulfate</span>
  //         <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">✅ Không dầu khoáng</span>
  //       </div>
  //       {/* Nút thêm vào giỏ */}
  //       <button className="mt-6 w-full bg-black text-white py-3 text-lg rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2">
  //         🛒 Thêm vào giỏ – {product.price}.000 đ
  //       </button>
  //     </div>
  //   </div>
  // );

  useEffect(() => {
    const imageUrls = [
      "https://image.cocoonvietnam.com/uploads/srm_3efa789217.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-t2QUuxB_dB8HFExLX9oz9VT5kE1x9IuWVXuSmldIQA2h_-u20ii4Q5H-F6Lit4EPd-M&usqp=CAU",
      "https://image.cocoonvietnam.com/uploads/Website_Avatar_Nuoc_duong_toc_tinh_dau_buoi_310ml_fac4084ecb.jpg",
      "https://image.cocoonvietnam.com/uploads/CP_Ca_phe_moi_1a1b8ddbf1.jpg",
      "https://image.cocoonvietnam.com/uploads/z4372805343245_27ea562aa5cabe55737d80cef8acfcb5_e4d50792fc.jpg",
      "https://product.hstatic.net/1000231140/product/mild_cream_cleanser_1_310d708003da45738947960b1a00081c_large.png",
      "https://product.hstatic.net/1000231140/product/bodysmooth.tr.pdp.mob.ca_7b80b228a9644bdab59988f796851e40_1024x1024.png",
      "https://product.hstatic.net/1000231140/product/aknicare_fast_creamgel-1_914dcd408124401c80e8659c1e3e25ff_1024x1024.jpg",
      "https://image.cocoonvietnam.com/uploads/z4389424986730_1e574bdd58278206885aaafd9cf54665_f04a0b7f9b.jpg",
      "https://image.cocoonvietnam.com/uploads/Ecom_Hair_S_Nuoc_duong_toc_sa_chi_140ml_816dc03907.png",
    ];
    // Mock dữ liệu (có thể thay bằng API)
    const mockProducts = Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      name: `Sản phẩm ${i + 1}`,
      image: imageUrls[Math.floor(Math.random() * imageUrls.length)],
      price: Math.floor(Math.random() * 1000) * 1000, // Random giá tiền
    }));

    setProduct(mockProducts);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-12 mt-6 px-10">
      {product.map((product, index) => (
        <div
          key={index}
          className="bg-white shadow-none p-4 text-center 
        hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        >
          <div className="flex items-center justify-center h-56">
            <img src={product.image} alt={product.name} className="h-full object-contain" />
          </div>
          <p className="text-lg font-semibold mt-4 uppercase">GLYTONE</p>
          <p className="text-md text-gray-700 mt-1">{product.name}</p>
          <p className="text-lg font-bold mt-2">{product.price.toLocaleString()}đ</p>
        </div>
      ))}
    </div>
  );
}

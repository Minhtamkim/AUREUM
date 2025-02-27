import { useEffect, useState } from "react";
import api from "../../config/axios";
// import api from "../../config/axios";

export default function ProductDetail() {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("product");
      setProducts(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-12 mt-6 px-10 my-6">
      {product.map((product, index) => (
        <div
          key={index}
          className="bg-white shadow-md shadow-gray-300 p-4 text-center flex flex-col items-center justify-between 
          hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        >
          <div className="flex items-center justify-center h-56 w-full">
            <img src={product.image} alt={product.name} className="h-full object-contain" />
          </div>
          <p className="text-lg font-semibold mt-4 uppercase">GLYTONE</p>
          <p className="text-md text-gray-700 mt-1 h-12 flex items-center justify-center">{product.name}</p>
          <p className="text-lg font-bold mt-2">{product.price.toLocaleString()}đ</p>
        </div>
      ))}
    </div>
  );
}

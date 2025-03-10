import { useState, useEffect } from "react";
import { Card, Select, Button } from "antd";
import api from "../../config/axios";

const { Option } = Select;

export default function ProductComparison() {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [products, setProducts] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [quantity] = useState(1);

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("product");
      setProducts(response.data);
    };
    fetchData();
  }, []);

  const handleSelect = (id, setProduct) => {
    const selectedProduct = products.find((p) => p.id === id);
    setProduct(selectedProduct);
  };

  const handleCompare = () => {
    setIsComparing(true);
  };

  const getPriceColor = (price) => {
    if (!product1 || !product2) return "text-black";
    return price === Math.min(product1.price, product2.price) ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">So Sánh Sản Phẩm</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Menu chọn sản phẩm 1 */}
        <div>
          <Select
            showSearch
            placeholder="Chọn sản phẩm 1"
            className="w-full"
            optionFilterProp="label"
            filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
            onChange={(value) => handleSelect(value, setProduct1)}
          >
            {products.map((product) => (
              <Option key={product.id} value={product.id} label={product.name}>
                <div className="flex items-center gap-2">
                  <img src={product.image} alt={product.name} className="w-6 h-6 object-cover rounded" />
                  <span>{product.name}</span>
                </div>
              </Option>
            ))}
          </Select>
        </div>
        {/* Menu chọn sản phẩm 2 */}
        <div>
          <Select
            showSearch
            placeholder="Chọn sản phẩm 2"
            className="w-full"
            optionFilterProp="label"
            filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
            onChange={(value) => handleSelect(value, setProduct2)}
          >
            {products.map((product) => (
              <Option key={product.id} value={product.id} label={product.name}>
                <div className="flex items-center gap-2">
                  <img src={product.image} alt={product.name} className="w-6 h-6 object-cover rounded" />
                  <span>{product.name}</span>
                </div>
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="text-center mt-6">
        <Button type="primary" onClick={handleCompare} disabled={!product1 || !product2}>
          So Sánh
        </Button>
      </div>

      {isComparing && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Thông tin sản phẩm 1 */}
          <Card>
            {product1 ? (
              <div>
                <img src={product1.image} alt={product1.name} className="w-full h-56 object-contain mb-2" />
                <h2 className="text-lg font-semibold">{product1.name}</h2>
                <p className={getPriceColor(product1.price)}>
                  Giá: {(product1.price * (quantity || 1)).toLocaleString("vi-VN")}.000 VND
                </p>
                <p>Loại da phù hợp: {product1.skinType}</p>
              </div>
            ) : (
              <p className="text-gray-500">Chưa có sản phẩm</p>
            )}
          </Card>

          {/* Thông tin sản phẩm 2 */}
          <Card>
            {product2 ? (
              <div>
                <img src={product2.image} alt={product2.name} className="w-full h-56 object-contain mb-2" />
                <h2 className="text-lg font-semibold">{product2.name}</h2>
                <p className={getPriceColor(product2.price)}>
                  Giá: {(product2.price * (quantity || 1)).toLocaleString("vi-VN")}.000 VND
                </p>
                <p>Loại da phù hợp: {product2.skinType}</p>
              </div>
            ) : (
              <p className="text-gray-500">Chưa có sản phẩm</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

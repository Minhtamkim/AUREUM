/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";

const ProductsPage = () => {
  const { id } = useParams(); // ID có thể là category_id hoặc ingredient_id
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [currentType, setCurrentType] = useState(""); // 'category' hoặc 'ingredient'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentPage = 8;
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(products.length / currentPage);
  const currentProduct = products.slice(
    (page - 1) * currentPage,
    page * currentPage
  );

  useEffect(() => {
    const fetchData = async (type, typeId) => {
      setLoading(true);
      try {
        const [categoryRes, ingredientRes, productRes] = await Promise.all([
          api.get("category"),
          api.get("ingredient"),
          api.get("product"),
        ]);
        console.log(ingredientRes.data);
        setIngredients(ingredientRes.data);
        setCategories(categoryRes.data);
        let filteredProducts = productRes.data;
        console.log(type);
        console.log(typeId);
        if (type === "category") {
          const selectedCategory = categoryRes.data.find(
            (cat) => cat.id === Number(typeId)
          );
          if (!selectedCategory) {
            setError("Danh mục không tồn tại!");
            return;
          }
          filteredProducts = productRes.data.filter(
            (product) => product.category_id === selectedCategory.id
          );
        } else if (type === "ingredient") {
          const selectedIngredient = ingredientRes.data.find(
            (ing) => ing.id === Number(typeId)
          );
          if (!selectedIngredient) {
            setError("Thành phần không tồn tại!");
            return;
          }
          console.log(productRes.data);
          filteredProducts = productRes.data.filter((product) => {
            console.log(product);
            return product.ingredient.some((ing) => {
              console.log(ing);
              console.log(ing.id === selectedIngredient.id);
              return ing.id === selectedIngredient.id;
            });
          });
          console.log(selectedIngredient.name);
          console.log(filteredProducts);
        } else {
          setError("Không tìm thấy sản phẩm phù hợp.");
          return;
        }
        console.log(filteredProducts);
        setProducts(filteredProducts);
      } catch (err) {
        console.error("Lỗi API:", err);
        setError("Không thể tải sản phẩm. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    // Xác định loại dữ liệu cần hiển thị
    const pathType = window.location.pathname.includes("category")
      ? "category"
      : "ingredient";
    setCurrentType(pathType);

    fetchData(pathType, id);
  }, [id]);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;
  if (!products.length) return <p>Không có sản phẩm nào trong danh mục này.</p>;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex items-center">
        <h1 className="font-semibold mt-6 mb-8">
          <Link to={"/products"}>Sản Phẩm &gt;</Link>{" "}
          {currentType === "category"
            ? categories.find((cat) => cat.id === Number(id))?.name
            : ingredients.find((ing) => ing.id === Number(id))?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProduct.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4 text-center 
                hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/products/details/${product.id}`)} // Điều hướng khi bấm vào sản phẩm
          >
            <div className="p-2">
              <img src={product.image} alt={product.title} className="h-70" />
            </div>
            <p className="font-semibold mt-2 min-h-[52px]">{product.name}</p>
            <p className="text-sm font-bold mt-1">
              {product.price.toLocaleString("vi-VN")} VND
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          &larr; Trước
        </button>
        <span>
          {page} / {totalPage}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
          disabled={page === totalPage}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Sau &rarr;
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;

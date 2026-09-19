import { useState, useEffect } from "react";
import api from "../api/axios";

// const defaultCounters = [
//   { id: 1, value: 0 },
//   { id: 2, value: 0 },
//   { id: 3, value: 0 },
//   { id: 4, value: 0 },
// ];
const Home = () => {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState<string>("");

  const loadProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data.products);
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  const addToCart = async (productId: any) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please Login to continue");
        return;
      }
      const response = await api.post("/cart/addToCart", { userId, productId });
      setMsg(response.data.message);
      setTimeout(() => {
        setMsg("");
      }, 1000);

      window.dispatchEvent(new Event("cartUpdated")); // <-- add this

      // setCartCount(response.data.cart.items.length);

      // setCartCount(
      //   response.data.cart.items.reduce(
      //     (total: number, item: any) => total + item.quantity,
      //     0,
      //   ),
      // );
    } catch (error: any) {
      console.log(
        error.response?.data?.message || "Error adding Product in Cart",
      );
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <div className="m-6">
        {msg && (
          <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-center text-sm text-blue-700">
            {msg}
          </div>
        )}
      </div>
      {products.length === 0 && <p>No Products found</p>}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 m-7">
        {products.map((product: any) => (
          <div
            className="bg-gray-100 w-max h-80 rounded-xl border flex flex-col items-center"
            key={product._id}
          >
            <img
              src={product.image}
              alt={product.title}
              className="p-3 h-1/2 w-auto object-contain"
            />

            <div className="m-4 font-semibold">
              <p>
                <span className="font-bold">{product.title}</span>
              </p>

              <p>
                <span className="font-bold">Rs. {product.price}</span>
              </p>
            </div>

            <div className="text-center m-2 w-full">
              <button
                onClick={() => addToCart(product._id)}
                className="inline-block w-60 py-3 bg-gray-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

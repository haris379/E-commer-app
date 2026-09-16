import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [msg, setMsg] = useState<string>("");

  const loadProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data.products);
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  const loadCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setCartCount(0);
        return;
      }
      const response = await api.get(`/cart/${userId}`);
      setCartCount(response.data.cart.items.length);
      // setCartCount(
      //   response.data.cart.items.reduce(
      //     (total: number, item: any) => total + item.quantity,
      //     0,
      //   ),
      // );
    } catch (error: any) {}
  };
  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);
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
      setCartCount(response.data.cart.items.length);

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

  return (
    <>
      <nav className="bg-gray-100 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
          <Link to="/" className="text-lg sm:text-xl font-bold text-gray-800">
            Home Page{" "}
          </Link>
          <Link to="/cart" className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-volt text-black text-[0.65rem] font-mono font-semibold min-w-[1.1rem] h-[1.1rem] flex items-center justify-center rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        <div className="m-6">
          {msg && (
            <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-center text-sm text-blue-700">
              {msg}
            </div>
          )}
        </div>
      </nav>

      {products.length === 0 && <p>No Products found</p>}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-7">
        {products.map((product: any) => (
          <div
            className="bg-gray-100 w-auto h-105 rounded-xl border flex flex-col items-center"
            key={product._id}
          >
            <h2 className="text-center m-2 font-bold">User Profile</h2>

            <img
              src={product.image}
              alt={product.title}
              className="p-3 h-1/2 w-auto"
            />

            <div className="m-4 font-semibold">
              <p>
                <span className="font-bold">{product.title}</span>
              </p>

              <p>
                <span className="font-bold">{product.price}</span>
              </p>
            </div>

            <div className="text-center m-2 w-full">
              <button
                onClick={() => addToCart(product._id)}
                className="inline-block w-60 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
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

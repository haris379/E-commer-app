import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data.products);
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <nav className="bg-gray-100 shadow-sm">
        <div className="w-full px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
          <Link to="/" className="text-lg sm:text-xl font-bold text-gray-800">
            Home Page{" "}
          </Link>
          <Link to="/">
            🛒
            {
              <span className="absolute -top-2 -right-2.5 bg-volt text-white text-[0.65rem] font-mono font-semibold min-w-[1.1rem] h-[1.1rem] flex items-center justify-center rounded-full px-1">
                {}
              </span>
            }
          </Link>
        </div>
      </nav>
      {products.length === 0 && <p>No users found</p>}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-3">
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
              <button className="inline-block w-60 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer">
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

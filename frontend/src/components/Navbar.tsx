import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.ts";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCart();

    const handleAuthChange = () => {
      const id = localStorage.getItem("userId");
      const name = localStorage.getItem("userName");

      setUserId(id);
      setUserName(name);

      if (id) {
        loadCart();
      } else {
        setCartCount(0);
      }
    };

    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

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
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setCartCount(0);
    onLogout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-100 shadow-sm sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
        <Link to="/" className="text-lg sm:text-xl font-bold text-gray-800">
          E-commerce App
        </Link>

        {userId && (
          <h2 className="text-sm sm:text-base font-medium text-gray-700 text-center">
            Welcome, {userName}
          </h2>
        )}

        <div className="flex gap-2 w-full sm:w-auto justify-center items-center">
          <Link to="/cart" className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-volt text-black text-[0.65rem] font-mono font-semibold min-w-[1.1rem] h-[1.1rem] flex items-center justify-center rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/" className="btn-primary text-sm py-2 px-4 text-center">
            Home
          </Link>
          <Link
            to="/admin/products/"
            className="btn-primary text-sm py-2 px-4 text-center"
          >
            Admin Dashboard
          </Link>
          <Link
            to="/counter-app"
            className="btn-primary text-sm py-2 px-4 text-center"
          >
            Counter App
          </Link>
          <Link
            to="/login"
            className="btn-primary text-sm py-2 px-4 text-center"
          >
            Login
          </Link>

          {userId ? (
            <button
              onClick={logout}
              className="btn-primary text-sm py-2 px-4 w-full sm:w-auto hover:cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="btn-primary text-sm py-2 px-4 text-center"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

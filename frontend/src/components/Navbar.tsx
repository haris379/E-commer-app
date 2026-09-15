import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    onLogout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-100 shadow-sm">
      <div className="w-full px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
        <Link to="/" className="text-lg sm:text-xl font-bold text-gray-800">
          Counter App
        </Link>

        {userId && (
          <h2 className="text-sm sm:text-base font-medium text-gray-700 text-center">
            Welcome, {userName}
          </h2>
        )}

        {userId ? (
          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <Link
              to="/home/"
              className="btn-primary text-sm py-2 px-4 text-center"
            >
              Home
            </Link>
            <Link
              to="/admin/products/"
              className="btn-primary text-sm py-2 px-4 text-center"
            >
              Admin Dashboard
            </Link>
            <button
              onClick={logout}
              className="btn-primary text-sm py-2 px-4 w-full sm:w-auto hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <Link
              to="/home/"
              className="btn-primary text-sm py-2 px-4 text-center"
            >
              Home
            </Link>
            <Link
              to="/admin/products/"
              className="btn-primary text-sm py-2 px-4 text-center"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/signup"
              className="btn-primary text-sm py-2 px-4 text-center"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

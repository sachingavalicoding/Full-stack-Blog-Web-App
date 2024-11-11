import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token to logout
    window.location.reload(); // Reload the page
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="text-neonGreen text-4xl font-bold hover:text-neonBlue transition duration-300"
          >
            MyApp
          </Link>
        </div>
        <div>
          {token ? (
            <>
              <Link
                to="/"
                className="text-neonBlue mx-4 text-lg hover:text-neonPurple transition duration-300"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-neonPink px-4 py-2 rounded-md hover:bg-neonYellow transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-neonYellow mx-4 text-lg hover:text-neonPurple transition duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-neonGreen text-lg hover:text-neonPink transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

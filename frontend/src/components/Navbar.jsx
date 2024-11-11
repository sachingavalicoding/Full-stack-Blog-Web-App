// Navbar.js
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // React Icon for profile

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div className="text-2xl font-bold">
        <Link to="/">MyBlog</Link>
      </div>
      <div className="space-x-4">
        <Link to="/blogs">All Blogs</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/blog-add">add blog</Link>
        <Link to="/profile">
          <FaUserCircle className="text-3xl" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

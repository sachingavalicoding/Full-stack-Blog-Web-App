import { useState, useEffect } from "react";
import { FaUser} from "react-icons/fa"; // React Icons

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from backend
    fetch("http://localhost:5000/api/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-xl font-semibold hover:text-gray-400">
              My Blog
            </a>
            <div className="hidden md:flex space-x-4">
              <a href="/" className="hover:text-gray-400">
                Home
              </a>
              <a href="/blogs" className="hover:text-gray-400">
                Blogs
              </a>
              <a href="/add-blog" className="hover:text-gray-400">
                Add Blog
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/profile" className="text-xl">
              <FaUser className="text-white" />
            </a>
          </div>
        </div>
      </nav>

      {/* Blog Section */}
      <section className="max-w-6xl mx-auto py-16">
        <h2 className="text-3xl font-semibold mb-8">Recent Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">{blog.title}</h3>
              <p className="text-sm">{blog.content.slice(0, 100)}...</p>
              <a
                href={`/blog/${blog._id}`}
                className="text-indigo-400 mt-4 inline-block"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

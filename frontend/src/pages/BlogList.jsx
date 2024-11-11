import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch all blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        console.log(response.data);
        setBlogs(response.data);
      } catch (error) {
        console.log("GET BLOGS ERROR", error);
        setError("Error fetching blogs");
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs
    .filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (blog) => selectedCategory === "All" || blog.category === selectedCategory
    );

  const categories = ["All", "Java ", "MERN Stack", "Electronics", "AI & ML "]; // Example categories

  return (
    <div className="container mx-auto p-4 py-20">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Categories Section */}
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-base font-medium px-5 py-2.5 mx-2 mb-3 rounded-full border-2 ${
              selectedCategory === category
                ? "bg-blue-700 text-white border-blue-600"
                : "bg-white text-gray-900 border-gray-300 hover:border-gray-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blogs..."
          className="border-2 border-blue-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full sm:w-1/2 md:w-1/3 mb-4"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-gray-900 p-4 rounded-lg border-[1px] border-gradient-to-br from-purple-600 to-blue-500 shadow-lg"
          >
            <img
              src={`http://localhost:3000/${blog.image}`}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-white">
              {blog.title}
            </h3>
            <p className="text-gray-300 mt-2">{blog.description}</p>
            <Link
              to={`/blog/${blog._id}`}
              className="text-blue-500 hover:text-blue-700 hover:underline mt-4 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

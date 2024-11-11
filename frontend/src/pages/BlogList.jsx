import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        console.log(response.data);
        setBlogs(response.data);
      } catch (error) {
        console.log(" GET BLOGS ERROR", error);
        setError("Error fetching blogs");
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search blogs..."
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="card bg-gray-100 p-4">
            <img
              src={`http://localhost:3000/${blog.image}`}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
            <Link
              to={`/blog/${blog._id}`}
              className="text-blue-500 hover:underline mt-2 block"
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

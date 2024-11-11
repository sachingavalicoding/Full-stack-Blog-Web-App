import { useEffect, useState } from 'react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400 mt-16">Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-16">{error}</p>;
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-10 text-indigo-400 text-center">All Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold mb-3 text-indigo-300">{blog.title}</h3>
              <p className="text-sm text-gray-400">{blog.content.slice(0, 100)}...</p>
              <a
                href={`/blog/${blog._id}`}
                className="text-indigo-500 mt-4 inline-block font-medium hover:underline transition-colors duration-200"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;

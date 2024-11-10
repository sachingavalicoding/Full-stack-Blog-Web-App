import  { useEffect, useState } from 'react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from backend
    fetch('http://localhost:5000/api/blogs')
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{blog.title}</h3>
              <p className="text-sm">{blog.content.slice(0, 100)}...</p>
              <a href={`/blog/${blog._id}`} className="text-indigo-400 mt-4 inline-block">Read more</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;

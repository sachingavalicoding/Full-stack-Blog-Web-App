import  { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <p><em>{blog.author}</em></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default BlogList;

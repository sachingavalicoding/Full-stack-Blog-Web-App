// BlogDetail.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">{blog.title}</h2>
      <div className="mt-4">
        <img
          src={blog.image || "default-image.jpg"}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />
      </div>
      <p className="mt-4">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;

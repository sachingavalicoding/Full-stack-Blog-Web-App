import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        setError("You must be logged in to create a blog!");
        setLoading(false);
        return;
      }

      const newBlog = { title, content, image };

      await axios.post("http://localhost:5000/api/blogs", newBlog, {
        headers: {
          Authorization: `Bearer ${token}`, // Make sure the token is included properly
        },
      });

      setLoading(false); // Hide loading indicator
      navigate("/"); // Redirect to homepage or blog list after success
    } catch (error) {
      setError("Error creating blog, please try again!");
      console.error(error);
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Add a New Blog
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-600 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-600 font-medium mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-600 font-medium mb-2"
            >
              Image URL (Optional)
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Adding Blog..." : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

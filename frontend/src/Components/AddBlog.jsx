import { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AddBlog = () => {
  const { token } = useAuth(); // Get the token
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !content || !author) {
      setError('All fields are required!');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content, author },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass JWT in the headers
          },
        }
      );
      setMessage('Blog added successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
      setError('');
    } catch (error) {
      setMessage('');
      setError('Error adding blog!');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        {/* Content Input */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
        />

        {/* Author Input */}
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Add Blog
        </button>
      </form>

      {/* Messages */}
      {message && <p className="mt-4 text-sm text-center text-green-500">{message}</p>}
      {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>}
    </div>
  );
};

export default AddBlog;

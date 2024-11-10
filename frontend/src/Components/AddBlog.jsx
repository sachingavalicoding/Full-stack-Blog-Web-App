import  { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
       const response = await axios.post('http://localhost:5000/api/blogs', {
        title,
        content,
        author,
      });
      console.log(response);
      setMessage('Blog added successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
        console.log(" ADD BLOG ERROR ", error)
      setMessage('Error adding blog!');
    }
  };

  return (
    <div>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Author</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBlog;

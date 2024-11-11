/* eslint-disable react-refresh/only-export-components */
import  { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context
const BlogFilterContext = createContext();

// Custom hook to use the BlogFilterContext
export const useBlogFilter = () => useContext(BlogFilterContext);

// Provider component
// eslint-disable-next-line react/prop-types
export const BlogFilterProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const applySearchFilter = (query) => setSearchQuery(query);
  const toggleSortOrder = () => setSortOrder(sortOrder === "recent" ? "oldest" : "recent");

  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  return (
    <BlogFilterContext.Provider
      value={{
        blogs: filteredBlogs,
        applySearchFilter,
        toggleSortOrder,
      }}
    >
      {children}
    </BlogFilterContext.Provider>
  );
};


import { useBlogFilter } from "./BlogFilterContext";

const BlogControls = () => {
  const { applySearchFilter, toggleSortOrder } = useBlogFilter();

  return (
    <div>
      <input
        type="text"
        placeholder="Search Blogs"
        onChange={(e) => applySearchFilter(e.target.value)}
      />
      <button onClick={toggleSortOrder}>
        Toggle Sort Order
      </button>
    </div>
  );
};

export default BlogControls;


import AddBlog from './Components/AddBlog';
import BlogList from './Components/BlogList';

const App = () => {
  return (
    <div>
      <h1 className='text-red-500'>Blog App</h1>
      <AddBlog />
      <BlogList />
    </div>
  );
};

export default App;

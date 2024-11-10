import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage.jsx";
import BlogList from "./Components/BlogList.jsx";
import AddBlog from "./Components/AddBlog.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/add-blog" element={<AddBlog />} />
      </Routes>
    </Router>
  );
};

export default App;

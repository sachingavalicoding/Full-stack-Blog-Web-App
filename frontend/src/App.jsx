import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail"; // Blog Detail Page
import SignIn from "./auth/Signin";
import SignUp from "./auth/Signup";
import "./index.css";
import AddBlog from "./pages/AddBlog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog-add" element={<AddBlog />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

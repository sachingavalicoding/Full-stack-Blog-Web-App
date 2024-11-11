import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import RegisterPage from "./Components/RegisterPage";
import AddBlog from "./Components/AddBlog";
import ProtectRoute from "./Components/ProtectRoute";
import BlogList from "./Components/BlogList";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route
          path="/add-blog"
          element={
            <ProtectRoute>
              <AddBlog />
            </ProtectRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;

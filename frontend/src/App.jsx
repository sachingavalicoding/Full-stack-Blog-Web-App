import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./auth/Signin";
import SignUp from "./auth/Signup";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute"; // Protected Route Component
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      {/* Include the Navbar in all routes */}
      <Navbar />
      <Routes>
        {/* Home Page route */}
        <Route path="/" element={<HomePage />} />

        {/* SignIn route */}
        <Route path="/signin" element={<SignIn />} />

        {/* SignUp route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Route for AddBlog */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

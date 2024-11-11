import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  if (!token) {
    // Redirect to login page if no token found
    navigate("/login");
    return null;
  }

  return children;
};

export default ProtectRoute;

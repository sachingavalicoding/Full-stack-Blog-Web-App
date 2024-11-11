import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
  const { login } =  useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const token = response.data.token;
      login(token);
      setMessage("Logged in successfully");
    } catch (error) {
      console.error(error);
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Login</h1>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="w-full p-2 bg-indigo-500 rounded hover:bg-indigo-600 transition duration-200"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
};

export default LoginPage;

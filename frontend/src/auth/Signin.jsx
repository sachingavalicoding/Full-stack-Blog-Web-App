import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-neonGreen mb-8 drop-shadow-lg">
        Sign In
      </h1>
      <form
        onSubmit={handleSignIn}
        className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-6 w-full max-w-md"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <button
          type="submit"
          className="w-full p-3 bg-neonGreen text-white rounded-md hover:bg-neonBlue transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        Do not have an account?{" "}
        <a href="/signup" className="text-neonGreen hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SignIn;

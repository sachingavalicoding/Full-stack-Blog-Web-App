import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin"); // Redirect to signin if not authenticated
    } else {
      setUser({ name: "John Doe" }); // Example user data
    }
  }, [navigate]);

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-xl space-y-6">
        <h1 className="text-5xl font-bold text-center text-neonGreen mb-4">
          Welcome to MyApp
        </h1>
        {user ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gray-700 p-5 rounded-md shadow-lg w-full max-w-md text-center">
              <h2 className="text-3xl text-neonBlue">Hello, {user.name}</h2>
              <p className="text-lg text-neonPink mt-2">
                Welcome back to your personalized dashboard.
              </p>
              <div className="mt-6">
                <button className="bg-neonYellow text-black px-6 py-2 rounded-lg text-xl hover:bg-neonPink transition duration-300">
                  View My Profile
                </button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-semibold text-neonPurple mb-4">
                Latest Blog Posts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example Blog Cards */}
                <div className="bg-gray-700 rounded-lg p-6 shadow-md hover:scale-105 transition transform duration-300">
                  <h4 className="text-xl font-bold text-neonGreen mb-2">
                    How to Build a MERN Stack App
                  </h4>
                  <p className="text-sm text-gray-300 mb-4">
                    A step-by-step guide to building a full-stack app using
                    MongoDB, Express, React, and Node.
                  </p>
                  <button className="text-neonBlue hover:underline">
                    Read More
                  </button>
                </div>
                <div className="bg-gray-700 rounded-lg p-6 shadow-md hover:scale-105 transition transform duration-300">
                  <h4 className="text-xl font-bold text-neonGreen mb-2">
                    Tailwind CSS: A Comprehensive Guide
                  </h4>
                  <p className="text-sm text-gray-300 mb-4">
                    Learn how to quickly style your applications with Tailwind
                    utility-first approach.
                  </p>
                  <button className="text-neonBlue hover:underline">
                    Read More
                  </button>
                </div>
                <div className="bg-gray-700 rounded-lg p-6 shadow-md hover:scale-105 transition transform duration-300">
                  <h4 className="text-xl font-bold text-neonGreen mb-2">
                    JavaScript Async Patterns Explained
                  </h4>
                  <p className="text-sm text-gray-300 mb-4">
                    A deep dive into async/await, promises, and callback
                    functions in JavaScript.
                  </p>
                  <button className="text-neonBlue hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-300">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

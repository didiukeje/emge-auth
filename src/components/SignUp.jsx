import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("users/add", {
        ...formData,
      });
      console.log("User created:", response);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.response?.data?.message || "Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/80 w-full flex items-center justify-center bg-cover bg-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-96 bg-opacity-90">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-white/5 text-white text-[16px] p-2 border-none outline-none rounded-lg"
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 text-white text-[16px] p-2 border-none outline-none rounded-lg"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Password
              <span className="text-xs text-gray-300 ml-2">(minimum 8 characters)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 text-white text-[16px] p-2 border-none outline-none rounded-lg"
              required
              minLength="8"
              autoComplete="new-password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
             Confirm Password
              <span className="text-xs text-gray-300 ml-2">(minimum 8 characters)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 text-white text-[16px] p-2 border-none outline-none rounded-lg"
              required
              minLength="8"
              autoComplete="new-password"
            />
          </div>
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-500 hover:text-blue-600 font-semibold underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
// src/components/SignIn.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        login(response.data.token); // Call the login function from AuthContext

        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        toast.success(`Welcome back!`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid credentials. Please use the test account below.");
      toast.error("Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.info("Google Sign In is not implemented in the demo");
  };

  return (
    <div className="min-h-screen bg-black/80 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md md:p-8 p-4 rounded-[10px] max-w-[30rem] min-h-[30rem] w-[90%]">
        <span className="text-[1.5rem] text-white block font-bold mb-[3.6rem] text-center">
          Sign In
        </span>
        <form onSubmit={handleSubmit} className="form-container-element">
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-white/5 text-white text-[16px] p-2 border-none outline-none rounded-lg"
              placeholder="Enter Username"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 text-white text-[16px] p-2 border-none outline-none rounded-lg"
              required
              placeholder="Enter Password"
              disabled={isLoading}
            />
          </div>

          {/* Test Account Info */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg">
            <h3 className="text-white text-sm font-medium mb-2">
              Test Account Credentials:
            </h3>
            <div className="text-gray-300 text-sm">
              <p>
                Username: <span className="text-blue-400">oliviaw</span>
              </p>
              <p>
                Password: <span className="text-blue-400">oliviawpass</span>
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-white/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="relative flex items-center justify-center my-6">
            <span className="relative px-2 text-sm text-gray-300">
              or Continue With
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="google-button-container mt-[2rem] w-full border-solid border-[1px] py-[.8rem] border-gray-100 rounded-[13px] flex items-center justify-center gap-3 hover:bg-white/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle color="white" size={18} />
            <span className="block text-white">Sign in with Google</span>
          </button>

          <p className="mt-4 text-center text-white">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:text-blue-600 font-semibold underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
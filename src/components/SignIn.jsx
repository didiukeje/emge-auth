import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("auth/login", {
        username: formData.username,
        password: formData.password,
      });
      console.log("User signed in:", response);
      toast.success("User Signed In");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black/80 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md md:p-8 p-4 rounded-[10px] max-w-[30rem] min-h-[30rem] w-[90%]">
        <span className="text-[1.5rem] text-white block font-bold mb-[3.6rem] text-center">
          Sign In
        </span>
        <form onSubmit={handleSubmit} className="form-container-element ">
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
            />
          </div>
          <div className="mb-[3rem]">
            <label className="block text-sm font-medium  text-white mb-2">
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-transparent border-solid border-[1px] border-gray-400 text-white p-2 rounded-lg"
          >
            Sign In
          </button>

          <button className="google-button-container mt-[2rem]  w-full border-solid border-[1px] py-[.8rem] border-gray-100 rounded-[13px] flex items-center justify-center gap-3">
            <FaGoogle color="white" size={18} />
            <span className="block text-white">Sign in with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

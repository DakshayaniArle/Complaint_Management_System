import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResolveNow from "./ResolveNow";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", usertype: "user" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.usertype) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const res = await axios.post(`${API_URL}/login`, form);

      // Store in localStorage
      localStorage.setItem("userData", JSON.stringify(res.data));

      // Redirect based on usertype
      const { usertype } = res.data;
      switch (usertype) {
        case "admin":
          navigate("/admin");
          break;
        case "agent":
          navigate("/agent");
          break;
        case "user":
          navigate("/user");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid credentials.");
      } else if (err.response?.status === 404) {
        setError("User does not exist.");
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <>
      <ResolveNow />
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#06B6D4]">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500 text-white p-2 rounded text-sm text-center">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[#06B6D4] mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
              />
            </div>

            {/* User Type */}
            <div>
              <label htmlFor="usertype" className="block text-[#06B6D4] mb-1">
                User Type
              </label>
              <select
                id="usertype"
                name="usertype"
                value={form.usertype}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[#06B6D4] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-sm text-[#06B6D4] hover:underline"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#06B6D4] text-[#1F2937] font-bold hover:bg-[#0891B2] transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-[#06B6D4]">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

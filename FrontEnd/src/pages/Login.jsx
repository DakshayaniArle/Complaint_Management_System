import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    // Replace with real auth logic
    alert(`Logged in as ${form.email}`);
  };

  return (
    <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#06B6D4]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
          <div>
            <label className="block text-[#06B6D4] mb-1" htmlFor="email">Email</label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-[#06B6D4] mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input
                className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm text-[#06B6D4] hover:underline"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#06B6D4] text-[#1F2937] font-bold hover:bg-[#0891B2] transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="underline text-[#06B6D4]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
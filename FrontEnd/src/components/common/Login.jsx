import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResolveNow from "./ResolveNow";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", usertype: "user" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      // Send login request to backend
     // const res = await fetch("http://localhost:5000/api/login", {
     //   method: "POST",
     //   headers: { "Content-Type": "application/json" },
       // body: JSON.stringify(form),
      //});
      //const data = await res.json();
      //if (!res.ok) {
       // setError(data.error || "Login failed");
       // return;
      //}
      alert(`Logged in as ${data.email || form.email} as ${form.usertype}`);
      navigate("/complaints");
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
     <>
        <ResolveNow/>
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
            <label className="block text-[#06B6D4] mb-1" htmlFor="usertype">User Type</label>
            <select
              id="usertype"
              name="usertype"
              value={form.usertype}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
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
    </>
  );
}
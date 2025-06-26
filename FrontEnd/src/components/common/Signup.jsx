import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResolveNow from "./ResolveNow";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    usertype: "user", 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirm ||
      !form.usertype
    ) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // try {
    //   const res = await fetch('http://localhost:5000/api/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       name: form.name,
    //       email: form.email,
    //       password: form.password,
    //       usertype: form.usertype,
    //     }),
    //   });
    //   const data = await res.json();
    //   if (!res.ok) {
    //     setError(data.error || "Registration failed");
    //     return;
    //   }
    //   alert("Registered successfully!");
    //   navigate("/login");
    // } catch (err) {
    //   setError("Server error. Please try again.");
    // }
    alert(
      `Registered as ${form.email} with usertype: ${form.usertype}`
    );
    navigate("/login");
  };

  return (
    <>
    <ResolveNow/>
    
    
    <div className="flex items-center justify-center min-h-[70vh] mt-15">
      
      <div className="w-full max-w-md bg-[#1F2937] rounded-lg shadow-lg p-8 border-t-4 border-[#06B6D4]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#06B6D4]">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500 text-white p-2 rounded">{error}</div>
          )}
          <div>
            <label
              className="block text-[#06B6D4] mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
          <div>
            <label
              className="block text-[#06B6D4] mb-1"
              htmlFor="email"
            >
              Email
            </label>
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
            <label
              className="block text-[#06B6D4] mb-1"
              htmlFor="usertype"
            >
              User Type
            </label>
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
            <label
              className="block text-[#06B6D4] mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm text-[#06B6D4] hover:underline"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label
              className="block text-[#06B6D4] mb-1"
              htmlFor="confirm"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
              type={showPassword ? "text" : "password"}
              id="confirm"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#06B6D4] text-[#1F2937] font-bold hover:bg-[#0891B2] transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="underline text-[#06B6D4]">
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
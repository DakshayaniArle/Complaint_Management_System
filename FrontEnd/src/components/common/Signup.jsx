import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ResolveNow from "./ResolveNow";

export default function Signup() {
  const [title, setTitle] = useState("user");
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

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    const updatedUser = { ...form, usertype: title };

    try {
      const res = await axios.post("http://localhost:5000/SignUp", updatedUser);
      alert(`Registered as ${updatedUser.usertype} with email: ${updatedUser.email}`);
      setForm({
        name: "",
        email: "",
        password: "",
        confirm: "",
        usertype: "user",
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <ResolveNow />
      <div className="flex items-center justify-center min-h-[80vh] bg-[#111827] px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-[#1F2937] rounded-xl shadow-xl p-6 sm:p-8 border-t-4 border-[#06B6D4]">
          <h2 className="text-3xl font-bold text-center text-[#06B6D4] mb-6">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}

            <InputField id="name" label="Name" value={form.name} onChange={handleChange} />
            <InputField id="email" label="Email" type="email" value={form.email} onChange={handleChange} />

            <div>
              <label htmlFor="usertype" className="block text-[#06B6D4] mb-1">User Type</label>
              <select
                id="usertype"
                name="usertype"
                value={form.usertype}
                onChange={(e)=>{
                  handleChange(e);
                  setTitle(e.target.value);
                }}
                className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            <PasswordField
              id="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
            />
            <PasswordField
              id="confirm"
              label="Confirm Password"
              value={form.confirm}
              onChange={handleChange}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
            />

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#06B6D4] text-[#1F2937] font-bold hover:bg-[#0891B2] transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="underline text-[#06B6D4]">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

// Reusable input field
function InputField({ id, label, value, onChange, type = "text" }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[#06B6D4] mb-1">{label}</label>
      <input
        className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        autoComplete={id}
      />
    </div>
  );
}

// Reusable password field with toggle
function PasswordField({ id, label, value, onChange, show, toggleShow }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[#06B6D4] mb-1">{label}</label>
      <div className="relative">
        <input
          className="w-full px-4 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
          type={show ? "text" : "password"}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="absolute right-2 top-2 text-sm text-[#06B6D4] hover:underline"
          onClick={toggleShow}
          tabIndex={-1}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResolveNow from "./components/ResolveNow";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Complaints from "./pages/Complaints";
import SubmitComplaint from "./pages/SubmitComplaint";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResolveNow />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="submit" element={<SubmitComplaint />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}
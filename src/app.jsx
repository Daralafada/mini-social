import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from './components/Navbar/navbar';
import Register from "./components/Register/index";
import Home from "./components/Home/index";
import Profile from "./components/Profile/index";
import Login from "./components/Login/index";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
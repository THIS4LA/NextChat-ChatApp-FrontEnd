"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/authSlice";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto p-6 border rounded">
        <h1 className="text-3xl mb-1 flex justify-center">Register</h1>
        <p className="mb-8 text-center text-gray-400">Let&apos;s Get You Started !</p>
        <p className="mb-8 text-center text-gray-400">
          {error && <span className="text-red-500">{error.message}</span>}
          {user && <span className="text-green-500">Register Successful!</span>}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            disabled={loading}
            required
            className="border p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
            className="border p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            required
            className="border p-2"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={form.avatar}
            onChange={handleChange}
            disabled={loading}
            required
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-green-300 p-2 hover:bg-green-400 text-black"
            disabled={loading}
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-400">Already have an account? <span className="text-green-400 ml-1 cursor-pointer hover:text-green-600"><Link href="/login">Sign here</Link></span></p>
        </form>
      </div>
    </div>
  );
};

export default Register;

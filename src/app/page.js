"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../store/authSlice.js";

export default function Home() {
  const dispatch = useDispatch();
  const { user, loading, error, token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginForm));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Register</h1>
      <h1>{process.env.NEXT_PUBLIC_JWT_SECRET}</h1>
      {loading && <p className="text-black">Loading...</p>}
      {error && <p className="text-red-500">{error.message}</p>}
      {user && <p className="text-green-500">Registered Successfully!</p>}
      {token && <p className="text-green-500">Logged in Successfully!{token}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-green-300 p-2 hover:bg-green-400">
          Submit
        </button>
      </form>
      <h1>Login Form</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={handleLoginChange}
          required
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="*******"
          value={loginForm.password}
          onChange={handleLoginChange}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-green-300 p-2 hover:bg-green-400">
          Login
        </button>
      </form>
    </div>
  );
}

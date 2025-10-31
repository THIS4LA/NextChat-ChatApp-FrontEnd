"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "../../../store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (user && token) {
      router.push("/messages");
    }
  }, [user, token, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto p-6 border rounded">
        <h1 className="text-3xl mb-1 flex justify-center">Welcome Back !</h1>
        <p className="mb-8 text-center text-gray-400">
          Please enter your details to signin
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button
            type="submit"
            disabled={loading}
            className="bg-green-300 p-2 hover:bg-green-400 text-black"
          >
            {loading ? <ScaleLoader color="#000000" height={14} /> : "Login"}
          </button>
          <p className="text-sm text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <span
              className="text-green-400 ml-1 cursor-pointer hover:text-green-600"
              disabled={loading}
            >
              <Link href="/register">Register here</Link>
            </span>
          </p>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              {error.message ||
                "Login Failed. Please check entered credentials & try again."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

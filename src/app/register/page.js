"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthError } from "../../../store/authSlice";
import Image from "next/image";
import Link from "next/link";
import { IoCloudUpload } from "react-icons/io5";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const Register = () => {
  const [url, setUrl] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, registerLoading, registerError, registerSuccess } = useSelector(
    (state) => state.auth
  );
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  async function handleImgChange(e) {
    const file = e.target.files[0];
    setImgUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setUrl(data.secure_url);
      setForm((prev) => ({ ...prev, avatar: data.secure_url }));
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setImgUploading(false);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (registerSuccess) {
      router.push("/login");
    }
  }, [registerSuccess, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto p-6 border rounded">
        <h1 className="text-3xl mb-1 flex justify-center">Register</h1>
        <p className="mb-8 text-center text-gray-400">
          Let&apos;s Get You Started !
        </p>
        <p className="mb-8 text-center text-gray-400">
          {registerError && (
            <span className="text-red-500">{registerError.message}</span>
          )}
          {user && <span className="text-green-500">Register Successful!</span>}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            disabled={registerLoading}
            required
            className="border p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={registerLoading}
            required
            className="border p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={registerLoading}
            required
            className="border p-2"
          />
          <div className="w-full h-40 border border-dashed rounded overflow-hidden relative">
            {imgUploading ? (
              <div className="flex justify-center items-center h-full w-full">
                <ScaleLoader color="#7BF1A8" height={18} />
              </div>
            ) : form.avatar ? (
              <>
                <Image
                  unoptimized
                  src={url}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setUrl("");
                    setForm((prev) => ({ ...prev, avatar: "" }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:cursor-pointer"
                >
                  ✕
                </button>
              </>
            ) : (
              <label
                htmlFor="fileUpload"
                className="w-full h-full flex justify-center items-center cursor-pointer"
              >
                <div className="flex flex-col items-center text-gray-500 hover:text-green-300">
                  <IoCloudUpload className="text-3xl mb-1" />
                  <span className="text-sm font-medium">Upload an image</span>
                </div>
                <input
                  id="fileUpload"
                  type="file"
                  name="img"
                  onChange={handleImgChange}
                  className="hidden"
                  required
                />
              </label>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-300 p-2 hover:bg-green-400 text-black"
            disabled={registerLoading || imgUploading}
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <span className="text-green-400 ml-1 cursor-pointer hover:text-green-600">
              <Link href="/login">Sign here</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

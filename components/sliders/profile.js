"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { IoCloudUpload } from "react-icons/io5";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useRouter } from "next/navigation";
import { updateUser } from "../../store/userSlice";
import { getSocket } from "../../lib/socket";

export default function Profile({ open, onClose }) {
  const [imgUploading, setImgUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { updateLoading, updateError, updateSuccess } = useSelector(
    (state) => state.user
  );
  const router = useRouter();
  const socket = getSocket();

  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logout());

      if (user?._id) {
        socket.emit("userLogout", user._id);
        socket.disconnect();
      }
      router.push("/");
    }
  };

  const [form, setForm] = useState({
    userName: user.userName || "N/A",
    email: user.email || "N/A",
    avatar: user.avatar || "",
  });

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
      setForm((prev) => ({ ...prev, avatar: data.secure_url }));
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setImgUploading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const saveChanges = window.confirm(
      "Are you sure you want to Save Changes?"
    );
    if (!saveChanges) {
      setEditMode(false);
      return;
    }
    await dispatch(updateUser(form));
    setEditMode(false);
  };

  const handleClose = () => {
    if (editMode) {
      const confirmDiscard = window.confirm(
        "You have unsaved changes. Discard them?"
      );
      if (!confirmDiscard) return;

      // Reset form and edit mode
      setForm({
        userName: user.userName || "N/A",
        email: user.email || "N/A",
      });
      setEditMode(false);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.aside
            className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/3 bg-gradient-to-r from-[#1D1D1D]/90 to-[#000000]/95 z-50 p-12 flex flex-col space-y-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between">
              <h1>My Profile</h1>
              <button
                onClick={handleClose}
                className="self-end text-gray-50 hover:opacity-75 hover:cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-28 flex flex-col items-center gap-10">
              <div className="relative rounded-full overflow-hidden w-full h-auto aspect-square min-w-48 max-w-64 lg:mx-20 group border border-gray-700">
                {imgUploading ? (
                  <div className="flex justify-center items-center h-full w-full bg-black/40">
                    <ScaleLoader color="#00B879" height={18} />
                  </div>
                ) : (
                  <>
                    <Image
                      unoptimized
                      src={form.avatar || user.avatar || "/default-avatar.png"}
                      alt="avatar"
                      fill
                      className="object-cover transition-all duration-300"
                    />

                    {editMode && (
                      <>
                        <label
                          htmlFor="fileUpload"
                          className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 cursor-pointer flex flex-col items-center justify-center transition-all"
                        >
                          <IoCloudUpload className="text-4xl mb-1" />
                          <span className="text-sm">Change Image</span>
                          <input
                            id="fileUpload"
                            type="file"
                            name="avatar"
                            onChange={handleImgChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="flex flex-col gap-6 w-full max-w-80 items-center">
                <div className="w-full flex flex-col gap-3">
                  <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={form.userName}
                    onChange={handleChange}
                    required
                    disabled={!editMode || updateLoading}
                    className="border p-2 w-full rounded-sm"
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!editMode || updateLoading}
                    required
                    className="border p-2 w-full rounded-sm"
                  />
                </div>
                <div className="w-full flex flex-col gap-3">
                  {editMode ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleSave()}
                        disabled={updateLoading || imgUploading}
                        className="bg-[#00B879] rounded-sm p-2 hover:opacity-75 text-black w-full text-center justify-center items-center"
                      >
                        {updateLoading ? (
                          <ScaleLoader color="#FFFFFF" height={14} />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setForm({
                            userName: user.userName || "N/A",
                            email: user.email || "N/A",
                          });
                          setEditMode(false);
                        }}
                        disabled={updateLoading || imgUploading}
                        className="bg-[#C03D37] rounded-sm p-2 hover:opacity-75 text-black w-full text-center"
                      >
                        Discard Changes
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setEditMode(true)}
                        className="bg-gray-400 rounded-sm p-2 hover:opacity-75 text-black w-full text-center"
                      >
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="bg-[#C03D37] rounded-sm p-2 hover:opacity-75 text-black w-full text-center"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                {updateError && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {updateError || "Update failed. Please try again."}
                  </p>
                )}
                {updateSuccess && (
                  <p className="text-green-500 text-sm text-center mt-2">
                    Profile updated successfully!
                  </p>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, clearSelectedUser } from "../../store/userSlice";

export default function ProfileInspectorView({ open, onClose, userId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && userId) {
      dispatch(getUserById(userId));
    }
  }, [userId, open, dispatch]);

  const { selectedUser, userLoading, userError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!open) {
      dispatch(clearSelectedUser());
    }
  }, [open, dispatch]);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/3 bg-gradient-to-r from-[#1D1D1D]/90 to-[#000000]/95 z-50 p-12 flex flex-col space-y-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between">
              {userLoading ? (
                <p className="text-gray-50">Loading...</p>
              ) : selectedUser ? (
                <h1>{selectedUser.userName}s Profile</h1>
              ) : (
                <h1 className="text-gray-50">Profile</h1>
              )}
              <button
                onClick={onClose}
                className="self-end text-gray-50 hover:opacity-75 hover:cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {userLoading ? (
              <p>Loading...</p>
            ) : userError ? (
              <p>Error: {userError}</p>
            ) : selectedUser ? (
              <div className="mt-28 flex flex-col items-center gap-10">
                <div className="relative rounded-full overflow-hidden w-full h-auto aspect-square min-w-48 max-w-64 lg:mx-20 group border border-gray-700">
                  <Image
                    unoptimized
                    src={selectedUser.avatar || "/default-avatar.png"}
                    alt="avatar"
                    fill
                    className="object-cover transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-6 w-full max-w-80 items-center">
                  <div className="w-full flex flex-col gap-3">
                    <input
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={selectedUser.userName || ""}
                      disabled
                      className="border p-2 w-full rounded-sm"
                    />
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      value={selectedUser.email || ""}
                      disabled
                      className="border p-2 w-full rounded-sm"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p>No user data available.</p>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

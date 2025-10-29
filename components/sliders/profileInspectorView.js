"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, clearSelectedUser } from "../../store/userSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfileInspectorView({ open, onClose, userId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && userId) {
      dispatch(getUserById(userId));
    }
  }, [userId, open, dispatch]);

  const { selectedUser, selectedUserLoading, selectedUserError } = useSelector(
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
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/3 bg-gradient-to-r from-[#1D1D1D]/90 to-[#000000]/95 z-50 p-12 flex flex-col space-y-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-gray-50 text-xl font-semibold">
                {selectedUserLoading ? (
                  <Skeleton width={150} />
                ) : selectedUser ? (
                  `${selectedUser.userName}'s Profile`
                ) : (
                  "Profile"
                )}
              </h1>

              <button
                onClick={onClose}
                className="self-end text-gray-50 hover:opacity-75 hover:cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            {selectedUserError ? (
              <p className="text-red-500">Error: {userError}</p>
            ) : selectedUserLoading ? (
              <div className="mt-28 flex flex-col items-center gap-10">
                {/* Skeleton for Avatar */}
                <div className="relative w-full max-w-64 aspect-square rounded-full overflow-hidden">
                  <Skeleton circle width={"100%"} height={"100%"} />
                </div>

                {/* Skeleton for Text Fields */}
                <div className="flex flex-col gap-6 w-full max-w-80 items-center">
                  <div className="w-full flex flex-col gap-3">
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                  </div>
                </div>
              </div>
            ) : selectedUser ? (
              <div className="mt-28 flex flex-col items-center gap-10">
                {/* Avatar */}
                <div className="relative rounded-full overflow-hidden w-full h-auto aspect-square min-w-48 max-w-64 lg:mx-20 group border border-gray-700">
                  <Image
                    unoptimized
                    src={selectedUser.avatar || "/default-avatar.png"}
                    alt="avatar"
                    fill
                    className="object-cover transition-all duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-6 w-full max-w-80 items-center">
                  <div className="w-full flex flex-col gap-3">
                    <input
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={selectedUser.userName || ""}
                      disabled
                      className="border p-2 w-full rounded-sm bg-transparent text-gray-200"
                    />
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      value={selectedUser.email || ""}
                      disabled
                      className="border p-2 w-full rounded-sm bg-transparent text-gray-200"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No user data available.</p>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

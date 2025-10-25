"use client";
import Navbar from "../../../components/Navbar.js";
import Footer from "../../../components/Footer.js";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link.js";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";

import { fetchConversations } from "../../../store/conversationSlice.js";
import { getAvailableUsers } from "../../../store/userSlice.js";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RecentMessages() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  // redux states
  const { user } = useSelector((state) => state.auth);
  const { list, loading, error } = useSelector((state) => state.conversation);
  const { users, userLoading, userError } = useSelector((state) => state.user);


  // load conversations on mount
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // handle search query
  useEffect(() => {
    if (query.length > 0) {
      dispatch(getAvailableUsers(query));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, dispatch]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setQuery(user.userName);
    setShowDropdown(false);
    router.push(`/messages/${user._id}`);
  };

  return (
    <div className="min-h-screen w-full text-white p-2 relative">
      <Navbar />

      <div className="flex flex-col mt-4 px-2">
        {/* Search bar */}
        <div className="relative w-full">
          <input
            name="userName"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedUser(null);
            }}
            className="w-full border border-gray-500 bg-black text-white p-2 rounded-md focus:ring-2 focus:ring-blue-500"
            onFocus={() => query && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // delay so click works
          />

          {/* Dropdown */}
          {showDropdown && users?.length > 0 && (
            <div className="absolute w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800"
                  onClick={() => handleSelectUser(user)}
                >
                  <Image
                    alt={user.userName}
                    src={user.avatar || "/default-avatar.png"}
                    className="rounded-full"
                    width={32}
                    height={32}
                  />
                  <span>{user.userName}</span>
                </div>
              ))}

              {/* Footer */}
              <div className="px-3 py-2 text-sm text-gray-400 border-t border-gray-700">
                {selectedUser ? (
                  <>
                    <b>{selectedUser.userName}</b> selected
                  </>
                ) : (
                  "No user selected"
                )}
              </div>
            </div>
          )}
        </div>

        <hr className="my-4" />

        {/* conversation list */}
        <div className="flex flex-col gap-2">
          {list.map((item) => (
            <Link
              key={item.otherUserId}
              href={`/messages/${item.otherUserId}`}
              className="flex flex-row items-center w-full h-16 gap-4 px-4 py-3 border rounded-sm cursor-pointer hover:bg-gray-800"
            >
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src={item.avatar || "/default-avatar.png"}
                  alt="User avatar"
                  sizes="40px"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h1 className="text-[12px] text-[#00B879]">
                  {item.name || "user name"}
                </h1>
                <p className="text-[16px] text-[#B3B3B3] truncate">
                  {item.lastMessage?.text || "No messages yet"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

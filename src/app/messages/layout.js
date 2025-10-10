"use client";
import RecentMessages from "./page.js";
import Chat from "./[id]/page.js";
import ProtectedRoute from "../../../components/ProtectedRoute.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../socket/socket.js";
import { setOnlineUsers } from "../../../store/userSlice.js";

export default function MessagesLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("updateOnlineUsers", (onlineUserIds) => {
      dispatch(setOnlineUsers(onlineUserIds));
    });

    return () => {
      socket.off("updateOnlineUsers");
    };
  }, [dispatch]);
  
  return (
    <ProtectedRoute>
      <div className="w-full h-screen">
        <div className="hidden md:flex w-full h-full">
          <div className="w-1/3">
            <RecentMessages />
          </div>

          <div className="w-2/3">
            <Chat />
          </div>
        </div>

        <div className="md:hidden w-full h-full">
          <RecentMessages />
        </div>
      </div>
    </ProtectedRoute>
  );
}

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../../../store/userSlice";
import socket from "../../../socket/socket";

export default function SocketProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?._id) {
      socket.emit("userOnline", user._id);
    }

    socket.on("updateOnlineUsers", (onlineUserIds) => {
      dispatch(setOnlineUsers(onlineUserIds));
    });

    return () => {
      socket.off("updateOnlineUsers");
    };
  }, [dispatch, user]);

  return children;
}

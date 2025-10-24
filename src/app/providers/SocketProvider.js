"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../../../store/userSlice";
import { addSocketMessage } from "../../../store/messageSlice";
import { getSocket } from "../../../lib/socket.js";

export default function SocketProvider({ children }) {
  const socket = getSocket();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?._id) {
      socket.emit("userConnected", user._id);
    }

    socket.on("updateOnlineUsers", (onlineUserIds) => {
      dispatch(setOnlineUsers(onlineUserIds));
    });

    return () => {
      socket.off("updateOnlineUsers");
    };
  }, [dispatch, user]);

  //listen for new messages
  useEffect(() => {
    const handleNewMessage = (msg) => {
      dispatch(addSocketMessage(msg));
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch]);

  return children;
}

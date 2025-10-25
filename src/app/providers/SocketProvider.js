"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../../../store/userSlice";
import { addSocketMessage } from "../../../store/messageSlice";
import { getSocket } from "../../../lib/socket.js";
import { updateLastMessage } from "../../../store/conversationSlice";

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
      dispatch(
        updateLastMessage({
          conversationId: msg.conversationId,
          text: msg.text,
          createdAt: msg.createdAt,
          sender: msg.senderId,
        })
      );
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch]);

  return children;
}

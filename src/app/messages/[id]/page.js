"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { FiInfo } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";

import { getSocket } from "../../../../lib/socket.js";
import {
  fetchMessages,
  sendMessage,
  addSocketMessage,
} from "../../../../store/messageSlice";

import { useDispatch, useSelector } from "react-redux";
import DefaultChat from "./default";
import { SyncLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";

export default function Chat() {
  const { id } = useParams();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isOnline, setIsOnline] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const socket = getSocket();

  const { messages, conversation, loading, error } = useSelector(
    (state) => state.message
  );
  const { user } = useSelector((state) => state.auth);
  const onlineUsers = useSelector((state) => state.user.onlineUsers);

  //check if other user is online
  useEffect(() => {
    setIsOnline(onlineUsers.includes(id));
  }, [onlineUsers, id]);

  //fetch messages
  useEffect(() => {
    if (id) {
      dispatch(fetchMessages(id));
    }
  }, [id, dispatch]);

  //scroll to bottom on new message
  const chatContainerRef = useRef(null);

  const scrollToBottom = (isTyping) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    if (isTyping) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  //join socket room
  const joinedRoomRef = useRef(false);

  useEffect(() => {
    if (!conversation._id || joinedRoomRef.current) return;

    socket.emit("joinConversation", conversation._id);
    joinedRoomRef.current = true; // mark as joined
  }, [conversation._id]);

  //user typing
  const [isTyping, setIsTyping] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  let typingTimeout;

  function handleTyping(e) {
    setNewMessage(e.target.value);

    if (!isTyping && conversation._id) {
      setIsTyping(true);
      socket.emit("typing", {
        conversationId: conversation._id,
        user: user.userName,
      });
    }

    // Reset timer each keypress
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stopTyping", {
        conversationId: conversation._id,
        user: user.userName,
      });
    }, 5000); // user stops typing after 1.5s inactivity
  }
  //listen for typing events
  useEffect(() => {
    const handleUserTyping = (userTyping) => {
      setOtherTyping(true);
    };
    const handleUserStoppedTyping = (userTyping) => {
      setOtherTyping(false);
    };

    socket.on("userTyping", handleUserTyping);
    socket.on("userStoppedTyping", handleUserStoppedTyping);

    return () => {
      socket.off("userTyping", handleUserTyping);
      socket.off("userStoppedTyping", handleUserStoppedTyping);
    };
  }, []);

  //send message
  function handleSendMessage() {
    if (!newMessage.trim()) return;
    const sendForm = {
      _id: Date.now().toString(), // temporary id
      receiverId: id,
      text: newMessage,
      sender: user,
      conversationId: conversation._id,
      createdAt: new Date().toISOString(),
    };
    //display senders message immediately
    dispatch(
      addSocketMessage({
        ...sendForm,
        sender: "me",
        otherUser: user,
      })
    );
    //api call to store message
    dispatch(sendMessage(sendForm));
    //emit to socket server
    socket.emit("sendMessage", sendForm);
    setNewMessage("");
  }

  return (
    <>
      {id ? (
        <div className="flex flex-col h-screen w-full bg-[#1D1D1D] text-white p-2">
          <div className="bg-black w-full h-[58px] flex items-center justify-between rounded-sm px-[16px]">
            {/* in mobile devices */}
            <div className="block md:hidden">
              <Link href="/messages">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-2xl text-[#B3B3B3]">
                    <IoChevronBack />
                  </div>
                  <Image
                    src={conversation.otherUser?.avatar || "/unknown-user.jpg"}
                    alt="other user"
                    className="rounded-full w-[40px] h-[40px] object-cover"
                    width={40}
                    height={40}
                    priority
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[14px]">
                      {conversation.chatName}
                    </h1>

                    <div
                      className={`py-[2px] rounded-4xl items-center justify-center flex border ${
                        isOnline ? "border-[#00B879]" : "border-[#A2A4A2]"
                      }`}
                    >
                      <GoDotFill
                        className={
                          isOnline ? "text-[#00B879]" : "text-[#A2A4A2]"
                        }
                        size={12}
                      />
                      <p
                        className={`text-[8px] ml-1 ${
                          isOnline ? "text-[#00B879]" : "text-[#A2A4A2]"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* above mobile devices */}
            <div className="hidden md:flex items-center gap-4 justify-center">
              <Image
                src={conversation.otherUser?.avatar || "/unknown-user.jpg"}
                alt="other user"
                className="rounded-full w-[40px] h-[40px] object-cover"
                width={40}
                height={40}
                priority
              />
              <div className="flex flex-col">
                <h1 className="font-semibold text-[14px]">
                  {conversation.chatName}
                </h1>

                <div
                  className={`py-[2px] rounded-4xl items-center justify-center flex border ${
                    isOnline ? "border-[#00B879]" : "border-[#A2A4A2]"
                  }`}
                >
                  <GoDotFill
                    className={isOnline ? "text-[#00B879]" : "text-[#A2A4A2]"}
                    size={12}
                  />
                  <p
                    className={`text-[8px] ml-1 ${
                      isOnline ? "text-[#00B879]" : "text-[#A2A4A2]"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>
            <Link href="/">
              <div className="text-2xl text-[#B3B3B3] pr-[12px]">
                <FiInfo />
              </div>
            </Link>
          </div>

          <div
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-900 hide-scrollbar"
            ref={chatContainerRef}
          >
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex items-end gap-2 ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender !== "me" && (
                  <Image
                    src={msg.otherUser.avatar}
                    alt="User"
                    className="rounded-full w-8 h-8 object-cover"
                    width={40}
                    height={40}
                  />
                )}

                <div
                  className={`max-w-[70%] p-3 text-sm ${
                    msg.sender === "me"
                      ? "bg-emerald-500 text-black rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl"
                      : "bg-gray-400 text-black rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "me" && (
                  <Image
                    src={msg.otherUser.avatar}
                    alt="Me"
                    className="rounded-full w-8 h-8 object-cover"
                    width={40}
                    height={40}
                  />
                )}
              </div>
            ))}
            {otherTyping && (
              <div className="flex items-center space-x-2 text-gray-400 text-sm italic">
                <span className="animate-pulse flex items-center gap-2">
                  {conversation.chatName} is typing{" "}
                  <SyncLoader size={3} color="#9CA3AF" />
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 p-2 bg-black rounded-sm">
            <input
              type="text"
              className="flex-1 p-2 text-sm rounded-sm bg-black border border-gray-600 focus:outline-none"
              placeholder="Write Something ..."
              value={newMessage}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="w-14 h-full text-xl bg-emerald-500 rounded-sm hover:bg-emerald-600 items-center justify-center flex"
            >
              <IoSend />
            </button>
          </div>
        </div>
      ) : (
        <DefaultChat />
      )}
    </>
  );
}

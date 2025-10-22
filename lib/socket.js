import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
};

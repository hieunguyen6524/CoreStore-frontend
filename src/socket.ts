import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;

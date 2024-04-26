import { Server } from "socket.io";
import server from "./../index.js";

const IO = Server(server, {
  cors: {
    origin: "*",
  },
});
IO.on("connection", (socket) => {
  console.log("connected");
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("message", (data) => {
    
  });
})
export default IO
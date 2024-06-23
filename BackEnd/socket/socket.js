import { Server } from "socket.io";
import Message from "../model/messageModel.js";
import ChatRoom from "../model/chatRoomModel.js";

export default function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', async ({ userId, doctorId, userModel }) => {
      try {
        if (!userId || !doctorId) {
          throw new Error('Both userId and doctorId are required');
        }

        const participants = [userId, doctorId].sort();
        let chatRoom = await ChatRoom.findOne({ participants: { $all: participants } });

        if (!chatRoom) {
          chatRoom = new ChatRoom({ participants });
          await chatRoom.save();
        }

        const chatRoomId = chatRoom._id.toString();
        socket.join(chatRoomId);
        const pastMessages = await Message.find({ chatRoom: chatRoom._id });
        socket.emit('pastMessages', pastMessages);
        socket.emit('joinedRoom', { chatRoomId });
        console.log(`User ${socket.id} joined room: ${chatRoomId}`);
      } catch (error) {
        console.error(`Error joining room for ${socket.id}:`, error);
      }
    });

    socket.on('sendMessage', async ({ chatRoomId, senderId, senderType, receiverId, receiverType, content, type }) => {
      try {
        if (!chatRoomId) {
          throw new Error('chatRoomId is required');
        }
    
        const messageData = {
          chatRoom: chatRoomId,
          content: content,
          type: type, // Ensure this is included
          timestamp: new Date().toISOString(),
          sender: senderId,
          senderModel: senderType,
          receiver: receiverId,
          receiverModel: receiverType,
        };
    
        const message = new Message(messageData);
        await message.save();
    
        io.to(chatRoomId).emit('receiveMessage', {
          chatRoomId,
          senderId,
          senderType,
          receiverId,
          receiverType,
          content,
          type, // Ensure this is included
          timestamp: message.timestamp,
        });
      } catch (error) {
        console.error(`Error sending message from ${socket.id}:`, error);
      }
    });
    

    socket.on('leaveRoom', ({ roomId }) => {
      console.log(`User ${socket.id} leaving room: ${roomId}`);
      socket.leave(roomId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}


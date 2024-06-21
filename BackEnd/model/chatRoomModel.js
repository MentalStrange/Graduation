import mongoose from 'mongoose';

const chatRoomSchema = mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming a generic User model that can be either Patient or Doctor
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
export default ChatRoom;

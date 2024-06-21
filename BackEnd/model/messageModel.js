import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, refPath: 'senderModel', required: true },
  senderModel: { type: String, required: true, enum: ['Doctor', 'Patient'] },
  receiver: { type: mongoose.Schema.Types.ObjectId, refPath: 'receiverModel', required: true },
  receiverModel: { type: String, required: true, enum: ['Doctor', 'Patient'] },
  type: { type: String, required: true, enum: ['text', 'image'] },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, {
  discriminatorKey: 'senderType'
});

const Message = mongoose.model("Message", messageSchema);
export default Message;

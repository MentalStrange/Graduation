import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
},{
  timestamps:true
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat
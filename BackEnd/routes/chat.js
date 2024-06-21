import express from 'express';
import { getChatRooms, getMessages } from '../controllers/chatController.js';

const router = express.Router();

router.get('/rooms/:userId', getChatRooms);
router.get('/messages/:chatRoomId', getMessages);

export default router;

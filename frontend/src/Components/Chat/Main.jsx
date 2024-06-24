import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import WorkingArea from "./WorkingArea";
import { decodeToken } from "../../../Utils/JWT_Decode";
import { v4 as uuidv4 } from 'uuid';
import chatImage from "../../assets/Images/Chat.png";

const Main = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [socket, setSocket] = useState(null); // State to hold the socket instance
  const token = localStorage.getItem("userToken");
  const decodedToken = decodeToken(token);
  const userId = decodedToken.id;
  const userRole = decodedToken.role; // assuming role is either 'doctor' or 'patient'

  // Use a ref to track locally sent messages
  const localMessages = useRef(new Set());

  useEffect(() => {
    if (selectedContact) {
      const newSocket = io("http://localhost:5001/");
      setSocket(newSocket);

      const handleMessageReceive = (message) => {
        console.log("Received message:", message);

        // Check if the message was sent locally using the unique identifier
        if (localMessages.current.has(message.messageId)) {
          console.log("Message was sent locally, not appending again:", message);
          localMessages.current.delete(message.messageId);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { ...message, type: message.senderId === userId ? "self" : "other", contentType: message.type },
          ]);
        }
      };

      newSocket.on("receiveMessage", handleMessageReceive);

      newSocket.emit("joinRoom", { userId, doctorId: selectedContact.id, userModel: userRole });

      newSocket.on("pastMessages", (pastMessages) => {
        setMessages(pastMessages.map((message) => ({
          ...message,
          type: message.sender === userId ? "self" : "other",
          contentType: message.type,
        })));
      });

      newSocket.on("joinedRoom", ({ chatRoomId }) => {
        setChatRoomId(chatRoomId);
      });

      return () => {
        newSocket.off("receiveMessage", handleMessageReceive);
        newSocket.off("pastMessages");
        newSocket.off("joinedRoom");
        newSocket.emit("leaveRoom", { roomId: chatRoomId });
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [selectedContact, userId, userRole]);

  const handleSendMessage = (content, type = 'text') => {
    const messageId = uuidv4(); // Generate a unique identifier for the message
    const timestamp = new Date().toISOString();
    const receiverId = selectedContact.id;
    const receiverType = userRole === 'doctor' ? 'Patient' : 'Doctor';
    const senderType = userRole === 'doctor' ? 'Doctor' : 'Patient';
    const message = {
      chatRoomId,
      senderId: userId,
      senderType,
      receiverId,
      receiverType,
      content,
      type,
      timestamp,
      messageId, // Add the unique identifier to the message object
    };
    console.log("Sending message:", message);

    if (!chatRoomId) {
      console.error("Chat room ID is null. Cannot send message.");
      return;
    }

    // Track the locally sent message using the unique identifier
    localMessages.current.add(messageId);
    console.log("Local messages set after adding:", localMessages.current);

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...message, type: "self", contentType: type },
    ]);

    socket.emit("sendMessage", message);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        const response = await fetch('http://localhost:5001/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64String,
            fileName: file.name.split('.')[0]
          })
        });

        const data = await response.json();
        handleSendMessage(`http://localhost:5001${data.imageUrl}`, 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex height="89vh" overflow="hidden">
      <Box flex="0 0 300px" borderRight="1px solid #e2e8f0">
        <Sidebar onContactClick={(contact) => setSelectedContact(contact)} />
      </Box>
      <Flex flex="1" direction="column" overflow="hidden">
        {selectedContact ? (
          <WorkingArea
            contact={selectedContact}
            messages={messages}
            onSendMessage={handleSendMessage}
            onImageUpload={handleImageUpload} // Pass the image upload handler
          />
        ) : (
          <Box flex="1" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Image src={chatImage} alt="Chat" width="40%" />
            <Heading size={'lg'} mt={5} color={'purple.700'} fontFamily={'Poppins'}>Select a contact to start chatting</Heading>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Main;

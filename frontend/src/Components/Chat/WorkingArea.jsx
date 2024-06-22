/* eslint-disable react/prop-types */
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect, useRef, useCallback } from "react";
import MessageOther from "./MessageOther";
import MessageSelf from "./MessageSelf";
import { AttachmentIcon } from "@chakra-ui/icons";

const WorkingArea = ({ contact, messages = [], onSendMessage, onImageUpload }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  }, [newMessage, onSendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex direction="column" flex="1" maxHeight="100%" overflow="hidden">
      <Flex align="center" justify="space-between" p={2} borderBottom="1px solid #e2e8f0">
        <Flex align="center">
          <Avatar size="md" mr={3} src={contact.image}>
            <AvatarBadge boxSize="0.9em" bg="green.500" />
          </Avatar>
          <Text ml={1} fontWeight="bold" fontSize="lg" m={0}>
            {contact.name}
          </Text>
        </Flex>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MoreVertIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<MoreVertIcon />}>New Tab</MenuItem>
            <MenuItem icon={<MoreVertIcon />}>New Window</MenuItem>
            <MenuItem icon={<MoreVertIcon />}>Open Closed Tab</MenuItem>
            <MenuItem icon={<MoreVertIcon />}>Open File...</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box flex="1" p={4} overflowY="auto">
        <Stack spacing={3}>
          {messages.map((message, index) => (
            <Box key={index} alignSelf={message.type === 'self' ? 'flex-end' : 'flex-start'}>
              {message.type === 'self' ? (
                <MessageSelf content={message.content} timestamp={message.timestamp} type={message.contentType} onLoad={scrollToBottom} />
              ) : (
                <MessageOther content={message.content} avatarImage={contact.image} timestamp={message.timestamp} type={message.contentType} onLoad={scrollToBottom} />
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      <Flex p={4} borderTop="1px solid #e2e8f0" align="center">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          mr={2}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          style={{ display: "none" }}
          id="image-upload"
        />
        <Button as="label" htmlFor="image-upload" mr={2} bg={'transparent'} colorScheme="gray" color={'black'}>
          <AttachmentIcon />
        </Button>
        <Button onClick={handleSendMessage} colorScheme="teal">
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default WorkingArea;

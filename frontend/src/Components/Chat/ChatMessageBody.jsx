import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ChatMessageBody = ({ contact }) => {
  return (
    <Link to="#">
      <Flex _hover={{ bg: "gray.100" }} borderRadius="lg" pl={2} pt={2}>
        <Avatar src={contact.img} />
        <Box ml="3">
          <Text fontWeight="bold" mb={0}>
            {contact.name}
            <Badge ml="1" colorScheme="green">
              New
            </Badge>
          </Text>
          <Text fontSize="sm">{contact.title}</Text>
        </Box>
      </Flex>
    </Link>
  );
};
ChatMessageBody.propTypes = {
  contact: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatMessageBody;

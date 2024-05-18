import { Box, Heading, Input } from "@chakra-ui/react";
import NavbarSidebar from "./NavbarSidebar";
import SearchIcon from "@mui/icons-material/Search";
import ChatMessageList from "./ChatMessageList";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <Box className="sidebar-container">
        <Box m={1}>
          <NavbarSidebar />
        </Box>
        <Heading mt={6}>Messages</Heading>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={2}
        >
          <Link>
            <SearchIcon fontSize="medium" />
          </Link>
          <Input placeholder="Search" ml={2} />
        </Box>
        <Box>
          <ChatMessageList />
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;

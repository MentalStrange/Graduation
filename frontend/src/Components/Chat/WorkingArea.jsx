import { Box, Stack } from "@chakra-ui/react";
import NavbarWorkingArea from "./NavbarWorkingArea";
import FooterWorkingArea from "./FooterWorkingArea";
import MessageOther from "./MessageOther";
import MessageSelf from "./MessageSelf";

function WorkingArea() {
  return (
    <Stack className="working-area-container" spacing={4}>
      <Box className="navbar-working-area">
        <NavbarWorkingArea />
      </Box>
      <Box
        className="message-working-area"
        flex={1}
        p={4}
        overflowY="auto"
        maxHeight="80vh"
      >
        <Stack spacing={3}>
          <Box>
            <MessageOther />
          </Box>
          <Box>
            <MessageOther />
          </Box>
          <Box>
            <MessageOther />
          </Box>
          <Box alignSelf="flex-end">
            <MessageSelf />
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Box>
            <MessageOther />
          </Box>
          <Box alignSelf="flex-end">
            <MessageSelf />
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Box>
            <MessageOther />
          </Box>
          <Box alignSelf="flex-end">
            <MessageSelf />
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Box>
            <MessageOther />
          </Box>
          <Box alignSelf="flex-end">
            <MessageSelf />
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Box>
            <MessageOther />
          </Box>
          <Box alignSelf="flex-end">
            <MessageSelf />
          </Box>
        </Stack>
      </Box>
      <Box className="footer-working-area">
        <FooterWorkingArea />
      </Box>
    </Stack>
  );
}

export default WorkingArea;

import {
  Avatar,
  AvatarBadge,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
function NavbarWorkingArea() {
  return (
    <>
      <Flex direction="row" align="center" justify="space-between" mb={10}>
        <Flex direction="row" align="center" justify="space-between">
          <Stack direction="row">
            <Avatar>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </Stack>
          <Text m={0} ml={4} fontWeight="bold" fontSize={"lg"}>
            Mohamed Ramadan
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
            <MenuItem icon={<MoreVertIcon />} command="⌘T">
              New Tab
            </MenuItem>
            <MenuItem icon={<MoreVertIcon />} command="⌘N">
              New Window
            </MenuItem>
            <MenuItem icon={<MoreVertIcon />} command="⌘⇧N">
              Open Closed Tab
            </MenuItem>
            <MenuItem icon={<MoreVertIcon />} command="⌘O">
              Open File...
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}

export default NavbarWorkingArea;
